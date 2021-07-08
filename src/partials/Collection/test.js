import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import "react-dropdown/style.css";
import "../../css/check.css";
import Web3 from "web3";
import Dropdown from "react-dropdown";
import data from "../../Data/Market/data";
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";

import Loader from "../../partials/Loader";
const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");
let SMAV2, web3, accounts, chimera;

const options = ["Newest", "Lowest Price", "Highest Price", "Oldest"];
function MainCollection(props) {
  const [checkedState, setCheckedState] = useState({
    hasListPrice: false,
    hasOpenOffer: false,
    ownedByCreator: false,
    hasSold: false,
    hasReservePrice: false,
  });
  const [selected, setSelected] = useState("");
  const [hooks_setSalePrice, setHooks_setSalePrice] = useState([]);
  const [hooks_isConfirmedByAdmin, setHooks_setIsConfirmedByAdmin] = useState(
    []
  );
  const [nftData, setNFTData] = useState([]);

  function _onSelect(option) {
    console.log("You selected ", option.value);
    setSelected(option);
  }

  function handlehasListPrice(checked) {
    setCheckedState({
      ...checkedState,
      hasListPrice: !checkedState.hasListPrice,
    });
  }
  function handlehasOpenOffer(checked) {
    setCheckedState({
      ...checkedState,
      hasOpenOffer: !checkedState.hasOpenOffer,
    });
  }
  function handleownedByCreator(checked) {
    setCheckedState({
      ...checkedState,
      ownedByCreator: !checkedState.ownedByCreator,
    });
  }
  function handlehasSold(checked) {
    setCheckedState({
      ...checkedState,
      hasSold: !checkedState.hasSold,
    });
  }
  function handlehasReservePrice(checked) {
    setCheckedState({
      ...checkedState,
      hasReservePrice: !checkedState.hasReservePrice,
    });
  }
  const [loading, setLoading] = useState(false);
  async function callData() {
    setLoading(true);
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    chimera = await new web3.eth.Contract(chimeraContract.abi, config.Chimera);
    SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);

    let nftData = [];
    let ownerData = [];
    let tokenId = [];
    let nftPrice = [];
    let artist = [];
    let setSalePrice = [];
    let isApprovedByAdmin = [];
    let bidding = [];
    let biddingBool = [];
    try {
      let totalSupply = await chimera.methods.totalSupply().call();
      for (let i = 0; i < totalSupply; i++) {
        let nfts = await chimera.methods.tokenByIndex(i).call();
        let owner = await chimera.methods.ownerOf(nfts).call();
        if (owner === accounts[0]) {
          tokenId.push(nfts);
          let res = await axios.get(`http://localhost:5000/file/${nfts}`);
          nftData.push(res.data[0]);

          let artistVar = await axios.get(
            `http://localhost:5000/api/users/${res.data[0].Artist}`
          );
          artist.push(artistVar.data);

          let ownerVar = await axios.get(
            `http://localhost:5000/api/users/${res.data[0].Owner}`
          );
          ownerData.push(ownerVar.data);
          let confirmed = await SMAV2.methods
            .isTokenConfirmedByAdmin(nfts)
            .call();
          isApprovedByAdmin.push(confirmed);

          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, nfts)
            .call();
          nftPrice.push(price);
          if (price === "0") {
            setSalePrice.push(false);
          } else {
            setSalePrice.push(true);
          }
          let bid = await SMAV2.methods
            .currentBidDetailsOfToken(config.Chimera, nfts)
            .call();
          bidding.push(bid);
          if (bid[0] === "0") {
            biddingBool.push(false);
          } else {
            biddingBool.push(true);
          }
        }
      }
      Promise.all([
        nftData,
        ownerData,
        tokenId,
        nftPrice,
        artist,
        setSalePrice,
        isApprovedByAdmin,
        bidding,
        biddingBool,
      ]).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  useEffect(() => {
    callData();
  }, []);

  return (
    <>
      <div>
        <div className="max-w-6xl mt-32 mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
            <span
              className=" lg:text-4xl font-bold text-black sm:text-2xl"
              data-aos="zoom-y-out"
            >
              Artworks collected by
            </span>{" "}
            <a
              href="#"
              className="lg:text-2xl  text-blue-900 hover:text-blue-1000"
            >
              @{localStorage.getItem("name")}
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-6xl   mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="px-6  py-8 md:py-12">
            {/* 1st block */}
            <div className="max-w-sm  grid gap-6 md:grid-cols-12 lg:grid-cols-12  md:max-w-2xl lg:max-w-none">
              <div className="sm:col-span-12 lg:col-span-9">
                <div className="max-w-sm  grid gap-6 md:grid-cols-12 lg:grid-cols-12  md:max-w-2xl lg:max-w-none">
                  <div className="sm:col-span-12 lg:col-span-12">
                    <h1 className="text-xs font-bold">FILTER BY:</h1>
                  </div>
                  <div className="sm:col-span-12 lg:col-span-3 flex">
                    <Switch
                      checked={checkedState.hasListPrice}
                      onChange={handlehasListPrice}
                      onColor="#d9d9d9"
                      onHandleColor="#337ab7"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={10}
                      width={38}
                    />
                    <span className="ml-2 font-bold text-xs">
                      Has list price
                    </span>{" "}
                  </div>
                  <div className="sm:col-span-12 lg:col-span-3 flex">
                    <Switch
                      checked={checkedState.hasOpenOffer}
                      onChange={handlehasOpenOffer}
                      onColor="#d9d9d9"
                      onHandleColor="#337ab7"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={10}
                      width={38}
                    />
                    <span className="ml-2 font-bold text-xs">
                      Has open offer
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="mx-auto sm:col-span-12 lg:col-span-3">
                <div>
                  <h1 className="text-xs font-bold">SORT BY:</h1>
                </div>
                <div className="mt-3">
                  <Dropdown
                    options={options}
                    onChange={_onSelect}
                    value={selected}
                    placeholder={options[0]}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <div className="max-w-6xl mt-10 mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
            <section className="relative">
              {/* Section background (needs .relative class on parent and next sibling elements) */}

              <div className="relative max-w-10xl mx-auto  sm:px-6">
                <div className="py-8 md:py-10">
                  {/* Items */}
                  <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
                    {/* 1st item */}

                    {/*Loop Start*/}

                    {data.map((d, key) => {
                      return (
                        <div className=" border-2 border-black-100 relative flex flex-col bg-white ">
                          {d.ArtPicture ? (
                            <img src={d.src} alt="Random Creativity Outburst" />
                          ) : (
                            <video autoPlay muted loop>
                              <source src={d.src} type="video/mp4" />
                            </video>
                          )}
                          <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                            <div className=" sm:col-span-12 lg:col-span-12  ">
                              <h1 className="font-bold text-base text-black">
                                {d.name}
                              </h1>
                            </div>
                            <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                              <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                                {/* If is in Listed Category */}
                                {d.List ? (
                                  <>
                                    <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                                      {/* If has Price ListPrice*/}
                                      {d.Price ? (
                                        <h1 className="text-base text-green-100">
                                          <span>{d.Price}</span>Ξ($
                                          <span>{d.DollarEquivalent}</span>)
                                          <p className="text-xxs mt-2 text-green-200">
                                            List price
                                          </p>
                                        </h1>
                                      ) : (
                                        <h1 className="text-base text-green-100">
                                          <span className="text-gray-600">
                                            -
                                          </span>
                                          <p className="text-xxs mt-2 text-gray-600">
                                            List price
                                          </p>
                                        </h1>
                                      )}
                                    </div>
                                    {d.CurrentOffer ? (
                                      <>
                                        <div className="col-start-6 col-span-7 mb-2">
                                          <h1 className="text-base text-green-100">
                                            <span>{d.LCPrice}</span>Ξ($
                                            <span>{d.LCDollarEquivalent}</span>)
                                            <p className="text-xxs mt-2 text-green-200">
                                              Current offer by{" "}
                                              <a
                                                href="#"
                                                className="text-green-200"
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                              >
                                                @{d.CurrentOfferBy}
                                              </a>
                                            </p>
                                          </h1>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="col-start-6 col-span-7 mb-2">
                                          <h1 className="text-base text-green-100">
                                            <span>{d.LCPrice}</span>Ξ($
                                            <span>{d.LCDollarEquivalent}</span>)
                                            <p className="text-xxs mt-2 text-green-200">
                                              Last Sale Price
                                            </p>
                                          </h1>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </div>

                            <div className="grid gap-6 mb-4 sm:grid-cols-12 lg:grid-cols-12">
                              <div className="col-start-3 col-span-4 mt-1">
                                <h5
                                  className="text-xs text-gray-600"
                                  style={{ marginLeft: "-18px" }}
                                >
                                  ARTIST
                                </h5>
                              </div>
                              <div
                                className="col-start-9 col-span-4 mt-1"
                                style={{ marginLeft: "-18px" }}
                              >
                                <h5 className="text-xs text-gray-600">OWNER</h5>
                              </div>
                              <div className="col-start-1 col-span-2 ">
                                <img
                                  src={d.Holders.ArtistAvatar}
                                  alt="Avatar"
                                  class="avatar"
                                  style={{
                                    verticalAlign: "middle",
                                    width: "28px",
                                    borderRadius: "50px",
                                    marginTop: "-28px",
                                  }}
                                />
                              </div>
                              <div
                                className="col-start-3 col-span-4"
                                style={{
                                  marginLeft: "-18px",
                                  marginTop: "-28px",
                                }}
                              >
                                <h5 className="text-sm mt-1">
                                  {d.Holders.ArtistName}
                                </h5>
                              </div>
                              <div className="col-start-7 col-span-2">
                                <img
                                  src={d.Holders.OwnerAvatar}
                                  alt="Avatar"
                                  class="avatar"
                                  style={{
                                    verticalAlign: "middle",
                                    width: "28px",
                                    borderRadius: "50px",
                                    marginTop: "-28px",
                                  }}
                                />
                              </div>
                              <div
                                className="col-start-9 col-span-4"
                                style={{
                                  marginLeft: "-18px",
                                  marginTop: "-28px",
                                }}
                              >
                                <h5 className="text-sm mt-1">
                                  {d.Holders.OwnerName}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* 1st item */}
                    <div className=" border-2 border-black-100 relative flex flex-col bg-white ">
                      <img
                        src="https://ipfs.pixura.io/ipfs/QmZQdQVQKYkMR7NHySpxnah1YbdKxhND7C8GGvFxz9XBo7/peek-a-pooh-shark-edition-.jpg"
                        alt="Random Creativity Outburst"
                      />
                      <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                        <div className=" sm:col-span-12 lg:col-span-12  ">
                          <h1 className="font-bold text-base text-black">
                            Colorful guest 021
                          </h1>
                        </div>
                        <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                          <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                            <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                              <h1 className="text-base text-green-100">
                                <span>1</span>Ξ(<span>$6,720</span>)
                                <p className="text-xxs mt-2 text-green-200">
                                  List price
                                </p>
                              </h1>
                            </div>
                            <div className="col-start-6 col-span-7 mb-2">
                              <h1 className="text-base text-green-100">
                                <span>1</span>Ξ(<span>$6,720</span>)
                                <p className="text-xxs mt-2 text-green-200">
                                  Current offer by{" "}
                                  <a
                                    href="#"
                                    className="text-green-200"
                                    style={{ textDecoration: "none" }}
                                  >
                                    @l1ttl3b1gk1d
                                  </a>
                                </p>
                              </h1>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-6 mb-4 sm:grid-cols-12 lg:grid-cols-12">
                          <div className="col-start-3 col-span-4 mt-1">
                            <h5
                              className="text-xs text-gray-600"
                              style={{ marginLeft: "-18px" }}
                            >
                              ARTIST
                            </h5>
                          </div>
                          <div
                            className="col-start-9 col-span-4 mt-1"
                            style={{ marginLeft: "-18px" }}
                          >
                            <h5 className="text-xs text-gray-600">OWNER</h5>
                          </div>
                          <div className="col-start-1 col-span-2 ">
                            <img
                              src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                              alt="Avatar"
                              class="avatar"
                              style={{
                                verticalAlign: "middle",
                                width: "28px",
                                borderRadius: "50px",
                                marginTop: "-28px",
                              }}
                            />
                          </div>
                          <div
                            className="col-start-3 col-span-4"
                            style={{
                              marginLeft: "-18px",
                              marginTop: "-28px",
                            }}
                          >
                            <h5 className="text-sm mt-1">Dangiuz</h5>
                          </div>
                          <div className="col-start-7 col-span-2">
                            <img
                              src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                              alt="Avatar"
                              class="avatar"
                              style={{
                                verticalAlign: "middle",
                                width: "28px",
                                borderRadius: "50px",
                                marginTop: "-28px",
                              }}
                            />
                          </div>
                          <div
                            className="col-start-9 col-span-4"
                            style={{
                              marginLeft: "-18px",
                              marginTop: "-28px",
                            }}
                          >
                            <h5 className="text-sm mt-1">Dangiuz</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 1st item */}
                    <div className=" border-2 border-black-100 relative flex flex-col bg-white ">
                      <img
                        src="https://ipfs.pixura.io/ipfs/QmfQSqbZghVjB431DkejRokRVpJF4sUEwBstu7Vy9k9JW2/see-my-heart.jpg"
                        alt="Random Creativity Outburst"
                      />
                      <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                        <div className=" sm:col-span-12 lg:col-span-12  ">
                          <h1 className="font-bold text-base text-black">
                            Colorful guest 021
                          </h1>
                        </div>
                        <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                          <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                            <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                              <h1 className="text-base text-green-100">
                                <span>1</span>Ξ(<span>$6,720</span>)
                                <p className="text-xxs mt-2 text-green-200">
                                  List price
                                </p>
                              </h1>
                            </div>
                            <div className="col-start-6 col-span-7 mb-2">
                              <h1 className="text-base text-green-100">
                                <span>1</span>Ξ(<span>$6,720</span>)
                                <p className="text-xxs mt-2 text-green-200">
                                  Current offer by{" "}
                                  <a
                                    href="#"
                                    className="text-green-200"
                                    style={{ textDecoration: "none" }}
                                  >
                                    @l1ttl3b1gk1d
                                  </a>
                                </p>
                              </h1>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-6 mb-4 sm:grid-cols-12 lg:grid-cols-12">
                          <div className="col-start-3 col-span-4 mt-1">
                            <h5
                              className="text-xs text-gray-600"
                              style={{ marginLeft: "-18px" }}
                            >
                              ARTIST
                            </h5>
                          </div>
                          <div
                            className="col-start-9 col-span-4 mt-1"
                            style={{ marginLeft: "-18px" }}
                          >
                            <h5 className="text-xs text-gray-600">OWNER</h5>
                          </div>
                          <div className="col-start-1 col-span-2 ">
                            <img
                              src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                              alt="Avatar"
                              class="avatar"
                              style={{
                                verticalAlign: "middle",
                                width: "28px",
                                borderRadius: "50px",
                                marginTop: "-28px",
                              }}
                            />
                          </div>
                          <div
                            className="col-start-3 col-span-4"
                            style={{
                              marginLeft: "-18px",
                              marginTop: "-28px",
                            }}
                          >
                            <h5 className="text-sm mt-1">Dangiuz</h5>
                          </div>
                          <div className="col-start-7 col-span-2">
                            <img
                              src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                              alt="Avatar"
                              class="avatar"
                              style={{
                                verticalAlign: "middle",
                                width: "28px",
                                borderRadius: "50px",
                                marginTop: "-28px",
                              }}
                            />
                          </div>
                          <div
                            className="col-start-9 col-span-4"
                            style={{
                              marginLeft: "-18px",
                              marginTop: "-28px",
                            }}
                          >
                            <h5 className="text-sm mt-1">Dangiuz</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainCollection;
