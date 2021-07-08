import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import validator from "validator";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../Loader";
import config from "../../config";

const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");
let web3;
let accounts;
let chimera;
let SMAV2;
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function MainSignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [notAccount, setNotAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [walletAccount, setWalletAccount] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDiv, setSignupDiv] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
      setEmail(e.target.value);
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
      setEmailError("Enter valid Email!");
    }
  };

  async function ConnectWallet() {
    if (!window.ethereum) {
      alert("no metamask");
    } else {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setLoading(true);
      accounts = await web3.eth.getAccounts();
      setWalletAccount(accounts[0]);
      chimera = await new web3.eth.Contract(
        chimeraContract.abi,
        config.Chimera
      );
      SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);
      let obj = {
        address: accounts[0],
      };
      axios
        .post(`${config.host}/api/auth`, obj)
        .then(async (res) => {
          console.log("res--->>", res);
          if (res.data.role === "collector") {
            try {
              let result = await SMAV2.methods
                .hasRole(config.role, accounts[0])
                .call();
              setLoading(false);

              if (result == true) {
                console.log(res);
                localStorage.setItem("avatar", res.data.avatar);
                localStorage.setItem("walletAddress", accounts[0]);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("id", res.data._id);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("name", res.data.name);
                history.push("/");
              } else if (result == false) {
                Swal.fire({
                  icon: "warning",
                  title: "Admin has not granted you a role yet !!",
                });
              }
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          } else if (res.data.role === "artist") {
            try {
              let result = await chimera.methods
                .isWhitelisted(accounts[0])
                .call();
              setLoading(false);

              if (result == true) {
                localStorage.setItem("avatar", res.data.avatar);

                localStorage.setItem("walletAddress", accounts[0]);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("id", res.data._id);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("name", res.data.name);
                history.push("/");
              } else if (result == false) {
                Swal.fire({
                  icon: "warning",
                  title: "You are not WhiteListed !!",
                });
              }
            } catch (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          }
        })
        .catch((err) => {
          console.log("err--->>", err.response.data.errors[0].msg);
          setNotAccount(true);
          setLoading(false);
        });
    }
  }

  function handleSignUp() {
    var obj = {
      name: username,
      email: email,
      address: walletAccount,
      role: accountType,
    };
    axios
      .post(`${config.host}/api/users`, obj)
      .then(async (res) => {
        console.log("res--->>", res);
        await Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Please wait to be whitlisted!",
          showConfirmButton: false,
          timer: 3500,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log("err--->>", err.response.data.msg);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
      });
  }
  function myFunction() {
    setSignupDiv(true);
    var x = document.getElementById("oops");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  function validateForm() {
    return email.length > 0 && username.length > 0 && checkEmail && accountType;
  }
  const AccountType = (e) => {
    console.log(e.target.value);
    setAccountType(e.target.value);
  };
  return (
    <>
      <div>
        <div className="max-w-6xl  text-center mb-32 mt-32 mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          {!notAccount ? (
            <div>
              <div className=" gridsm:grid-cols-12">
                <span className=" text-5xl font-medium" data-aos="zoom-y-out">
                  Welcome!
                </span>
              </div>
              <div className="max-w-xs mx-auto ">
                <span
                  className=" lg: text-5xl mb-8 leading-normal font-medium "
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Let's begin with your wallet.
                </span>
                <div
                  className="max-w-xs mt-4 mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <button
                    className="btn btn-primary text-center"
                    onClick={ConnectWallet}
                    style={{
                      fontSize: "12px",
                      padding: 22,
                      width: 300,
                      backgroundColor: "black",
                      borderColor: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    SELECT A WALLET
                  </button>
                </div>
                <div className="max-w-xs mt-4 mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <a
                    className="text-sm"
                    href="#"
                    style={{
                      textDecoration: "none",
                      borderBottom: "solid 0.5px",
                      color: "black",
                    }}
                  >
                    First time setting up a wallet?
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="oops" id="oops">
              <div className="max-w-xs mx-auto ">
                <div className="pb-8">
                  <span
                    className=" lg: text-2xl mb-8 leading-normal font-medium "
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    Oops! It looks like there's no account linked to that
                    address.
                  </span>
                </div>
                <div className="box-content  text-left bg-gray-200 h-42 w-42 p-2 py-3">
                  <p className="text-xxs font-semibold mt-2 ml-2">ADDRESS</p>
                  <p className="text-xxs font-semibold mt-2 ml-2">
                    {walletAccount}
                  </p>
                  <div
                    className="max-w-xs mt-4 mx-auto sm:max-w-none sm:flex sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay="300"
                  >
                    <button
                      className="btn btn-primary text-center"
                      style={{
                        fontSize: "12px",
                        padding: 20,
                        width: 300,
                        backgroundColor: "black",
                        borderColor: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      SWITCH ADDRESS
                    </button>
                  </div>{" "}
                </div>

                <div className="max-w-xs mt-4 mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <a
                    href="#"
                    className="text-xs"
                    style={{
                      textDecoration: "none",
                      borderBottom: "solid 0.5px",
                      color: "black",
                    }}
                    onClick={myFunction}
                  >
                    Would you like to sign up instead?
                  </a>
                </div>
              </div>
            </div>
          )}
          {/*SignUp DIV */}
          {signupDiv ? (
            <div>
              <div className="max-w-xs mx-auto ">
                <span
                  className=" lg: text-5xl font-Lobster mb-8 leading-normal  "
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Create a Chimera Account
                </span>
                <div className="box-content rounded-lg text-left bg-gray-200 h-42 w-42 p-2 ">
                  <p className="text-xxs font-semibold mt-2 ml-2">ADDRESS</p>
                  <p className="text-xxs font-semibold mt-2 ml-2">
                    {walletAccount}
                  </p>
                </div>
                <div className="mt-4">
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="standard-basic"
                      label="Username *"
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ width: 300 }}
                    />
                  </form>
                </div>
                <div className="mt-4">
                  <form className={classes.root}>
                    <TextField
                      type="email"
                      id="standard-basic"
                      onChange={(e) => validateEmail(e)}
                      label="Email *"
                      style={{ width: 300 }}
                    />
                  </form>
                  <span className="text-xs font-bold text-red-500">
                    {emailError}
                  </span>
                </div>
                <div className="mt-5">
                  <span className="text-gray-700">Account Type</span>
                  <div className="mt-4">
                    <label className="inline-flex items-center ">
                      <input
                        type="radio"
                        onChange={AccountType}
                        className="form-radio"
                        name="accountType"
                        value="artist"
                      />
                      <span className="ml-2">Artist</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        onChange={AccountType}
                        className="form-radio"
                        name="accountType"
                        value="collector"
                      />
                      <span className="ml-2">Collector</span>
                    </label>
                  </div>
                </div>
                <div
                  className="max-w-xs mt-5 mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <button
                    className="btn btn-primary text-center"
                    onClick={handleSignUp}
                    style={{
                      fontSize: "12px",
                      padding: 20,
                      width: 300,
                      backgroundColor: "black",
                      borderColor: "black",
                      fontWeight: "bold",
                    }}
                    disabled={!validateForm()}
                  >
                    {" "}
                    SIGN UP
                  </button>
                </div>{" "}
                <div className="max-w-xs mt-4 mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <span className="text-xs">
                    By clicking sign up you indicate that you have read and
                    agree to our{" "}
                    <a
                      href="#"
                      style={{
                        textDecoration: "underline",
                        color: "black",
                      }}
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      style={{
                        textDecoration: "underline",

                        color: "black",
                      }}
                    >
                      Privacy Policy
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {loading ? (
            <>
              <Loader />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default MainSignIn;
