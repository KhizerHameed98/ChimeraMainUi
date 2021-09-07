import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Web3 from "web3";
import config from "../config";
import Loader from "../partials/Loader";
import Swal from "sweetalert2";
const SMAV2Contract = require("../contracts/ChimeraMarketAuctionV2.json");

let web3;
let accounts;
let SMAV2;

function DialoguePopUp(props) {
  const [open, setOpen] = React.useState(false);
  const [salePrice, setSalePrice] = useState("");
  const [validSalePrice, setValidSalePrice] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleChangePrice(e) {
    setValidSalePrice(false);
    setSalePrice(e.target.value);
  }
  async function onSetSalePrice(e) {
    setLoading(true);
    e.preventDefault();
    if (salePrice && salePrice > 0) {
      web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      accounts = await web3.eth.getAccounts();
      accounts = await web3.eth.getAccounts();
      SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);
      const weiValue = Web3.utils.toWei(salePrice, "ether");
      try {
        let res = await SMAV2.methods
          .setSalePrice(config.Chimera, props.id, weiValue)
          .send({ from: accounts[0] });
        setOpen(false);
        await Swal.fire({
          icon: "success",
          text: "Price has been set successfully!",
        });
        window.location.reload();
      } catch (error) {
        setOpen(false);

        setLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } else {
      setLoading(false);
      setValidSalePrice(true);
    }
  }
  return (
    <>
      <button
        className="btn btn-primary -mt-2 px-2 "
        onClick={handleClickOpen}
        style={{ fontSize: "12px" }}
      >
        Set Sale Price
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Set Price of your NFT here"}
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
                  onChange={handleChangePrice}
                  type="number"
                  placeholder="BNB"
                  value={salePrice}
                />

                {validSalePrice ? (
                  <>
                    <Form.Text
                      className="text-muted"
                      color="primary"
                      style={{ color: "red", marginTop: "5px" }}
                    >
                      <span style={{ color: "red" }}>
                        * The Price must be greater than 0
                      </span>
                    </Form.Text>
                  </>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit" onClick={onSetSalePrice}>
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
    </>
  );
}
export default DialoguePopUp;
