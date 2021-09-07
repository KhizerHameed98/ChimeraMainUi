import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import MainDashboard from "../partials/Dashboard/MainDashboard";
import Web3 from "web3";
import * as Icons from "phosphor-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import config from "../config";
import Loader from "../partials/Loader";
import axios from "axios";
const chimeraContract = require("../contracts/Chimera.json");

let web3;
let accounts;
let chimera;

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [WalletBalance, setWalletBalance] = useState("");
  const [WalletBalanceUSDT, setWalletBalanceUSDT] = useState("");

  const [notApproved, setNotApproved] = useState(false);
  async function ApprovedOrNot() {
    setLoading(true);
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    chimera = await new web3.eth.Contract(chimeraContract.abi, config.Chimera);
    let res = await chimera.methods
      .isApprovedForAll(accounts[0], config.SMAV2)
      .call();
    if (res === false) {
      setNotApproved(true);
    }

    setLoading(false);
  }
  async function handleSetApproval() {
    setLoading(true);
    try {
      let res = await chimera.methods
        .setApprovalForAll(config.SMAV2, true)
        .send({ from: accounts[0] });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    ApprovedOrNot();
  }, []);

  useEffect(async () => {
    setLoading(true);
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    web3.eth.getBalance(
      localStorage.getItem("walletAddress"),
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          const balance = web3.utils.fromWei(result, "ether");
          let balanceUSDT;
          axios
            .get(
              "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
            )
            .then((res) => {
              let d = res.data;
              let USD = d.USD * balance;

              setWalletBalanceUSDT(financial(USD));
            });
          setWalletBalance(financial(balance));
          console.log(financial(balance));
          setLoading(false);
        }
      }
    );
  }, []);
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div className="px-8">
          <div className="max-w-10xl  mt-24 mx-auto px-4 sm:px-8">
            {/* Top area: Blocks */}

            <div className="grid sm:grid-cols-12  px-6 gap-8 py-8 md:py-12">
              {/* 1st block */}
              <div className="sm:col-span-12 lg:col-span-4">
                <div>
                  <div class=" flex  tracking-widest flex-wrap content-start ...">
                    <div
                      className="font-normal text-4xl sm:text-5xl "
                      data-aos="zoom-y-out"
                    >
                      {WalletBalance}{" "}
                    </div>
                    <div
                      className="font-normal text-4xl sm:text-5xl "
                      data-aos="zoom-y-out"
                    >
                      BNB
                    </div>
                    <div
                      className="text-base font-semibold
                      ml-3 mt-3"
                      data-aos="zoom-y-out"
                    >
                      ${WalletBalanceUSDT}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-12 md:col-span-3 text-center lg:col-span-3 "></div>

              <div className="sm:col-span-12 md:col-span-3   lg:col-span-3">
                <div className="text-center mb-20">
                  {loading ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    <>
                      {localStorage.getItem("role") === "artist" ? (
                        <>
                          {" "}
                          {notApproved ? (
                            <>
                              <button
                                onClick={handleSetApproval}
                                className="btn text-center add-artist-btn btn-primary mt-3 hover: bg-gray-1000"
                              >
                                Set Approval for Market
                                <i className="fas text-lg ml-2 fa-plus-circle"></i>
                              </button>{" "}
                            </>
                          ) : (
                            <>
                              <button
                                onClick={handleClickOpen}
                                className="btn text-center add-artist-btn btn-primary mt-3 hover: bg-gray-1000"
                              >
                                MAKE AN ART{" "}
                                <i className="fas text-lg ml-2 fa-plus-circle"></i>
                              </button>
                            </>
                          )}
                        </>
                      ) : null}
                    </>
                  )}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Which One?"}
                    </DialogTitle>
                    <DialogContent
                      className="text-center"
                      style={{ paddingBottom: "50px" }}
                    >
                      <div className="px-12">
                        <a
                          href="/create-digitalart"
                          className="md:mr-5 lg:mr-5  xl:mr-5 sm:mr-0 text-decoration-none hover:text-black-100"
                        >
                          <button
                            className="btn btn-primary text-center"
                            style={{
                              borderRadius: "30px",
                              height: 360,
                              width: 203,
                              backgroundColor: "white",
                              color: "black",
                              borderColor: "#D8D8D8",
                            }}
                          >
                            {/* <span className="font-bold font-Lobster text-xl">
                              Digital
                            </span> */}
                            <div class="space-y-4 ...">
                              <span class="block ...">
                                <img
                                  src="https://rarible.com/aeab66c41451d080f78d.png"
                                  width="150px"
                                  alt="img"
                                  className="rounded shadow-2xl  mt-4 mb-4"
                                />
                              </span>
                              <span class="block font-bold font-Lobster text-xl">
                                Digital
                              </span>
                            </div>

                            {/* <p className="font-bold font-Lobster text-xl">
                              Digital
                            </p> */}
                          </button>
                        </a>
                        {/* <a disabled href="/create-physicalart"> */}
                        <button
                          disabled
                          className="btn btn-primary "
                          style={{
                            borderRadius: "30px",
                            height: 360,
                            width: 203,
                            backgroundColor: "white",
                            color: "black",
                            borderColor: "#D8D8D8",
                          }}
                        >
                          <div class="space-y-4 ...">
                            <span class="block ...">
                              <img
                                src="https://rarible.com/36bb69094bddb424314b.png"
                                width="155px"
                                className="rounded shadow-2xl mt-4 mb-4"
                                alt="img"
                              />
                            </span>
                            <span class="block font-bold font-Lobster text-xl">
                              Physical
                            </span>
                            <span
                              class="block font-bold font-Lobster text-base"
                              style={{ color: "green" }}
                            >
                              Coming Soon
                            </span>
                          </div>
                        </button>
                        {/* </a> */}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* 2nd block */}

              <div class=" md:px-0 lg:px-0 flex flex-row ">
                <div>
                  {" "}
                  <button>
                    <Icons.ArrowCircleDown
                      weight="thin"
                      color="black"
                      size={78}
                    />
                  </button>
                </div>
                <div>
                  {" "}
                  <button>
                    <Icons.ArrowCircleUp
                      weight="thin"
                      color="black"
                      size={78}
                    />
                  </button>
                </div>
              </div>
            </div>
            {/*Divider Start */}
            <section className="relative">
              {/* Section background (needs .relative class on parent and next sibling elements) */}

              <div className="absolute left-0 right-0 bottom-0 m-auto transform translate-y-1/2"></div>

              <div className="relative max-w-7xl mx-auto  sm:px-6">
                <div className="py-2 md:py-20">
                  {/* Items */}
                  <div className="max-w-sm mt-5 mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3  md:max-w-2xl lg:max-w-none">
                    {/* 1st item */}
                    <div className="relative flex mt-2 flex-col  px-5 bg-white rounded shadow-xl">
                      <div className="mt-4 text-xxs font-semibold text-gray-500">
                        <span>TOTAL # SALES</span>
                      </div>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl">0</span>
                      </div>
                    </div>
                    {/* 1st item */}
                    <div className="relative flex mt-2 flex-col  px-5 bg-white rounded shadow-xl">
                      <div className="mt-4 text-xxs font-semibold text-gray-500">
                        <span>TOTAL SALES VALUE</span>
                      </div>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl">0 BNB</span>
                      </div>
                    </div>
                    {/* 1st item */}
                    <div className="relative flex mt-2 flex-col  px-5 bg-white rounded shadow-xl">
                      <div className="mt-4 text-xxs font-semibold text-gray-500">
                        <span>ARTISTS COLLECTED</span>
                      </div>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl">0</span>
                      </div>
                    </div>
                    {/* 1st item */}
                    <div className="relative flex mt-2 flex-col  px-5 bg-white rounded shadow-xl">
                      <div className="mt-4 text-xxs font-semibold text-gray-500">
                        <span>TOTAL # COLLECTED</span>
                      </div>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl">0</span>
                      </div>
                    </div>
                    {/* 1st item */}
                    <div className="relative flex mt-2 flex-col  px-5 bg-white rounded shadow-xl">
                      <div className="mt-4 text-xxs font-semibold text-gray-500">
                        <span>TOTAL COLLECTED VALUE</span>
                      </div>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl">0 BNB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Start*/}
        <div className="px-8">
          <div className="max-w-10xl  mt-24 mx-auto px-4 sm:px-8">
            {/* Top area: Blocks */}
            <MainDashboard />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
