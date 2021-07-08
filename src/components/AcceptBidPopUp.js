import React, { useState } from "react";
import "../css/check.css";
import { useHistory, useParams, Link } from "react-router-dom";

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

let web3;
let accounts;
let chimera;
let SMAV2;

function AcceptBidPopUp(props) {
  let history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function ConfirmAcceptBid() {
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

      let wei = Web3.utils.toWei(props.BiddingPrice, "ether");

      let res2 = await SMAV2.methods
        .safeAcceptBid(config.Chimera, props.id, wei)
        .send({ from: accounts[0] });
      console.log(res2);
      let res = await axios.delete(
        `${config.host}/api/bids/delete/${props.id}`
      );
      console.log(res);
      let res3 = await axios.put(`${config.host}/file/${props.id}`, {
        owner: props.BiddingOwner._id,
      });
      console.log(res3);
      setLoading(false);
      setOpen(false);
      await Swal.fire({
        icon: "success",
        title: "Successfull",
        text: "Bid has been accepted!",
      });
      history.push("/collection");
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
  }

  return (
    <>
      <div className="text-left">
        <button
          onClick={handleClickOpen}
          className="btn text-center make-offer-btn btn-primary mt-5 hover: bg-gray-1000"
        >
          ACCEPT BID
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
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
              <div className="col-start-1 col-span-7 font-semibold text-left">
                Offer By
              </div>
              <div className="col-start-8 col-span-11 font-semibold text-right">
                {props.BiddingOwner.name}
              </div>
              <div className="col-start-1 col-span-6 font-semibold text-left">
                Offer
              </div>
              <div className="col-start-7 col-span-12 font-semibold text-right">
                {props.BiddingPrice}
                <span className="text-xs ml-2">BNB</span>
              </div>{" "}
            </div>
            {/*new*/}
            <div className=" grid gap-2  md:grid-cols-12 border-t-2 border-black mt-5 pt-3 lg:grid-cols-12 md:max-w-2xl lg:max-w-auto sm:mx-0 lg:gap-6 md:gap-6">
              <div className="col-start-1 col-span-6 font-semibold text-left">
                Total
              </div>
              <div className="col-start-7 col-span-12 font-semibold text-right">
                {props.BiddingPrice}
                <span className="text-xs ml-2">BNB</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                disabled={loading}
                onClick={ConfirmAcceptBid}
                className="btn btn-primary mt-5 px-5 py-2"
                style={{ fontWeight: "bold", fontSize: "18px", width: "300px" }}
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
export default AcceptBidPopUp;
