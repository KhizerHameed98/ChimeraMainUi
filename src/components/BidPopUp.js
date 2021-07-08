import React, { useState } from "react";
import "../css/check.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Web3 from "web3";
import axios from "axios";

import config from "../config";
import Loader from "../partials/Loader";
import Swal from "sweetalert2";
const chimeraContract = require("../contracts/Chimera.json");
const SMAV2Contract = require("../contracts/ChimeraMarketAuctionV2.json");
const MPContract = require("../contracts/MarketplaceSettings.json");
let web3;
let accounts;
let chimera;
let SMAV2;
let MP;

function BidPopUp(props) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minBid, setMinBid] = useState("");
  const [minBidBNB, setMinBidBNB] = useState("");
  const [validBid, setValidBid] = useState(false);
  const [bid, setBid] = useState("");

  const [totalPrice, setTotalPrice] = useState("");
  const [totalPriceBNB, setTotalPriceBNB] = useState("");

  const handleClickOpen = async () => {
    setLoading(true);
    try {
      web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      accounts = await web3.eth.getAccounts();
      chimera = await new web3.eth.Contract(
        chimeraContract.abi,
        config.Chimera
      );

      SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);
      MP = await new web3.eth.Contract(
        MPContract.abi,
        config.MarketPlaceSettings
      );
      let currentBid = await SMAV2.methods
        .currentBidDetailsOfToken(config.Chimera, props.id)
        .call();
      if (currentBid[0] === "0") {
        setMinBidBNB(props.nftPrice);
        let wei = Web3.utils.toWei(props.nftPrice, "ether");

        setMinBid(wei);
      } else {
        let minbidd = (parseInt(currentBid[0]) * 10) / 100;

        let CurBid = parseInt(currentBid[0]) + parseInt(minbidd);

        let bnb = Web3.utils.fromWei(JSON.stringify(CurBid), "ether");

        setMinBid(CurBid);
        setMinBidBNB(bnb);
      }
      setLoading(false);
      setOpen(true);
    } catch (error) {
      setLoading(false);

      console.log(error);
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setLoading(false);
    setOpen2(false);
    setOpen(true);
  };

  function handleChangeBid(e) {
    setValidBid(false);
    setBid(e.target.value);
  }
  async function SubmitBid(e) {
    e.preventDefault();
    if (bid < minBidBNB) {
      setValidBid(true);
    } else {
      setOpen(false);
      setOpen2(true);
      console.log(bid);
      let bidWei = Web3.utils.toWei(bid, "ether");
      let bidWeiwithMarketFee = await MP.methods
        .calculateMarketplaceFee(bidWei)
        .call();
      let total = parseInt(bidWei) + parseInt(bidWeiwithMarketFee);
      let totalBnb = Web3.utils.fromWei(JSON.stringify(total), "ether");
      setTotalPriceBNB(totalBnb);
      setTotalPrice(total);
    }
  }
  async function ConfirmBid(e) {
    setLoading(true);
    e.preventDefault();
    try {
      let bidWei = Web3.utils.toWei(bid, "ether");
      let res = await SMAV2.methods
        .bid(bidWei, config.Chimera, props.id)
        .send({ from: accounts[0], value: totalPrice });
      res = await axios.post(`${config.host}/api/bids/post`, {
        price: bidWei,
        address: accounts[0],
        tokenId: props.id,
      });
      setOpen2(false);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Successfull!!",
      });
    } catch (error) {
      setLoading(false);
      setOpen2(false);
      console.log(error);
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  return (
    <>
      <div className="text-center ">
        <button
          onClick={handleClickOpen}
          className="btn text-center make-offer-btn btn-primary mt-5 hover: bg-gray-1000"
        >
          BID
        </button>
        {loading ? <Loader /> : null}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"BID"}
          <Form.Text
            className="text-muted"
            color="primary"
            style={{ color: "red", marginTop: "5px" }}
          >
            <span style={{ color: "grey", fontSize: "12px" }}>
              * The Bid should be greater than or equal to {minBidBNB} BNB
            </span>
          </Form.Text>
        </DialogTitle>
        <DialogContent className="text-center mb-5">
          <div className="px-5">
            {/* <a
              href="/create-digitalart"
              className="md:mr-5 lg:mr-5  xl:mr-5 sm:mr-0"
            >
              {props.id}
            </a> */}
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control
                  onChange={handleChangeBid}
                  type="number"
                  placeholder="BNB"
                  value={bid}
                />

                {validBid ? (
                  <>
                    <Form.Text
                      className="text-muted"
                      color="primary"
                      style={{ color: "red", marginTop: "5px" }}
                    >
                      <span style={{ color: "red" }}>
                        The BID must be greater than or equal to {minBidBNB}
                      </span>
                    </Form.Text>
                  </>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit" onClick={SubmitBid}>
                Submit
              </Button>
            </Form>
          </div>
          {loading ? (
            <>
              <Loader />
            </>
          ) : null}
          {/* <Loader /> */}
        </DialogContent>
      </Dialog>
      <Dialog
        open={open2}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className=" max-w-6xl gridsm:grid-cols-12 gap-8 py-2  border-b-2 border-black">
            <h1 className="font-bold text-2xl ml-3 ">Checkout</h1>
          </div>
        </DialogTitle>
        <DialogContent className="text-center mb-5">
          <div className="px-5" style={{ display: "initial" }}>
            {/* <a
              href="/create-digitalart"
              className="md:mr-5 lg:mr-5  xl:mr-5 sm:mr-0"
            >
              {props.id}
            </a> */}
            <div className=" grid gap-2  md:grid-cols-12 lg:grid-cols-12 md:max-w-2xl lg:max-w-auto sm:mx-0 lg:gap-6 md:gap-6">
              <div className="col-start-1 col-span-6 font-semibold text-left">
                NFT Name
              </div>
              <div className="col-start-7 col-span-12 font-semibold text-right">
                {props.nftData.name}
              </div>
              <div className="col-start-1 col-span-6 font-semibold text-left">
                Price
              </div>
              <div className="col-start-7 col-span-12 font-semibold text-right">
                {props.nftPrice}
                <span className="text-xs ml-2">BNB</span>
              </div>{" "}
              <div className="col-start-1 col-span-6 font-semibold text-left">
                Your Bid
              </div>
              <div className="col-start-7 col-span-12 font-semibold text-right">
                {bid}
                <span className="text-xs ml-2">BNB</span>
              </div>{" "}
              <div className="col-start-1 col-span-7 font-semibold text-left">
                Market Place Fee
              </div>
              <div className="col-start-8 col-span-11 font-semibold text-right">
                {props.marketPlaceSettingsFee} %
              </div>
            </div>
            {/*new*/}
            <div className=" grid gap-2  md:grid-cols-12 border-t-2 border-black mt-5 pt-3 lg:grid-cols-12 md:max-w-2xl lg:max-w-auto sm:mx-0 lg:gap-6 md:gap-6">
              <div className="col-start-1 col-span-6 font-semibold text-left">
                Total
              </div>
              <div className="col-start-7 col-span-12 font-semibold text-right">
                {totalPriceBNB}
                <span className="text-xs ml-2">BNB</span>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="btn btn-danger mt-5 mr-4 "
                style={{ fontWeight: "bold" }}
                onClick={handleClose2}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary mt-5"
                style={{ fontWeight: "bold" }}
                onClick={ConfirmBid}
              >
                Confirm
              </button>
            </div>
          </div>
          {loading ? (
            <>
              <Loader />
            </>
          ) : null}
          {/* <Loader /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default BidPopUp;
