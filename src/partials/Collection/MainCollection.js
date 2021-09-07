import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import "react-dropdown/style.css";
import "../../css/check.css";
import Web3 from "web3";
import Dropdown from "react-dropdown";
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../partials/Loader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import DialoguePopUp from "../../components/setSalePricePopUp";
const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");
let SMAV2, web3, accounts, chimera;
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        width: "22ch",
      },
      [theme.breakpoints.up("md")]: {
        width: "33ch",
      },
      [theme.breakpoints.up("lg")]: {
        width: "38ch",
      },
    },
  },
}));
const options = ["Newest", "Lowest Price", "Highest Price", "Oldest"];
function MainCollection(props) {
  const classes = useStyles();
  const [checkedState, setCheckedState] = useState({
    hasListPrice: false,
    hasOpenOffer: false,
    ownedByCreator: false,
    hasSold: false,
    hasReservePrice: false,
  });
  const [selected, setSelected] = useState("");

  const [NFTData, setNFTData] = useState([]);
  const [OwnerData, setOwnerData] = useState([]);
  const [TokenId, setTokenId] = useState([]);
  const [TokenPrice, setTokenPrice] = useState([]);
  const [ArtistData, setArtistData] = useState([]);
  const [IsSalePrice, setIsSalePrice] = useState([]);
  const [IsApprovedByAdmin, setIsApprovedByAdmin] = useState([]);
  const [BiddingPrice, setBiddingPrice] = useState([]);
  const [BiddingOrNot, setBiddingOrNot] = useState([]);
  const [USDValue, setUSDValue] = useState(0);
  const [USDValueBid, setUSDValueBid] = useState(0);
  const [BiddingOwner, setBiddingOwner] = useState([]);
  const [VideoExtension, setVideoExtension] = useState([]);

  const [Alldata, setData] = useState([]);
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
  const [noData, setNoData] = useState(false);
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
    let USDTValue = [];
    let USDTValueBid = [];
    let biddingOwner = [];
    let videoOrNot = [];
    try {
      console.log(1);
      let totalSupply = await chimera.methods.totalSupply().call();
      for (let i = 0; i < totalSupply; i++) {
        let nfts = await chimera.methods.tokenByIndex(i).call();
        let owner = await chimera.methods.ownerOf(nfts).call();
        if (owner === accounts[0]) {
          tokenId.push(nfts);
          let res = await axios.get(`${config.host}/file/${nfts}`);
          nftData.push(res.data[0]);
          // console.log(res.data[0].extension);
          let ext = res.data[0].extension.split(" ");
          if (ext[0] === "video") {
            videoOrNot.push(true);
          } else if (ext[0] === "image") {
            videoOrNot.push(false);
          }

          let artistVar = await axios.get(
            `${config.host}/api/users/${res.data[0].Artist}`
          );
          artist.push(artistVar.data);

          let ownerVar = await axios.post(`${config.host}/api/auth`, {
            address: owner,
          });

          ownerData.push(ownerVar.data);
          let confirmed = await SMAV2.methods
            .isTokenConfirmedByAdmin(nfts)
            .call();
          console.log("nfts----->>>", nfts);
          isApprovedByAdmin.push(confirmed);

          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, nfts)
            .call();
          console.log("price------>>>", price);
          const etherValue = Web3.utils.fromWei(price, "ether");
          await axios
            .get(
              "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
            )
            .then((res) => {
              let d = res.data;
              let USD = d.USD * etherValue;
              USDTValue.push(financial(USD));
            });
          nftPrice.push(etherValue);
          if (price === "0") {
            setSalePrice.push(false);
          } else {
            setSalePrice.push(true);
          }
          let bid = await SMAV2.methods
            .currentBidDetailsOfToken(config.Chimera, nfts)
            .call();
          console.log(6);

          const eth = Web3.utils.fromWei(bid[0], "ether");

          await axios
            .get(
              "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
            )
            .then((res) => {
              let d = res.data;
              let USD = d.USD * eth;
              USDTValueBid.push(financial(USD));
            });

          bidding.push(eth);
          if (bid[0] === "0") {
            biddingOwner.push("");
            biddingBool.push(false);
          } else {
            let biddingOwn = await axios.post(`${config.host}/api/auth`, {
              address: bid[1],
            });
            biddingOwner.push(biddingOwn.data);
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
        USDTValue,
        USDTValueBid,
        biddingOwner,
        videoOrNot,
      ]).then((res) => {
        if (res[0].length === 0) {
          setNoData(true);
        }

        setNFTData(res[0]);
        setOwnerData(res[1]);
        setTokenId(res[2]);
        setTokenPrice(res[3]);
        setArtistData(res[4]);
        setIsSalePrice(res[5]);
        setIsApprovedByAdmin(res[6]);
        setBiddingPrice(res[7]);
        setBiddingOrNot(res[8]);
        setUSDValue(res[9]);
        setUSDValueBid(res[10]);
        setBiddingOwner(res[11]);
        setVideoExtension(videoOrNot);
        setLoading(false);
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
  function financial(x) {
    return Number.parseFloat(x).toFixed(1);
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
            {loading ? (
              <div className="mt-5">
                <Loader />
              </div>
            ) : (
              <>
                <section className="relative">
                  {/* Section background (needs .relative class on parent and next sibling elements) */}

                  <div className="relative max-w-10xl mx-auto  sm:px-6">
                    <div className="py-8 md:py-10">
                      {/* Items */}
                      <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
                        {/* 1st item */}
                        {noData ? (
                          <>
                            <h1>NO DATA</h1>
                          </>
                        ) : (
                          <>
                            {/*Loop Start*/}
                            {NFTData.map((d, key) => {
                              return (
                                <>
                                  {/* 1st item */}
                                  <div className=" border-2 border-black-100 relative flex flex-col bg-white ">
                                    {VideoExtension[key] ? (
                                      <>
                                        <video
                                          autoPlay
                                          muted
                                          loop
                                          style={{
                                            height: "350px",
                                            objectFit: "cover",
                                            width: "100%",
                                          }}
                                        >
                                          <source
                                            src={d.image}
                                            type="video/mp4"
                                          />
                                        </video>
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={d.image}
                                          style={{
                                            height: "350px",
                                            objectFit: "cover",
                                            width: "100%",
                                          }}
                                          alt="Random Creativity Outburst"
                                        />
                                      </>
                                    )}
                                    <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                                      <div className=" sm:col-span-12 lg:col-span-12  ">
                                        <h1 className="font-bold text-base nftName text-black">
                                          {d.name}
                                        </h1>
                                      </div>

                                      <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                                        {IsApprovedByAdmin[key] ? (
                                          <>
                                            {IsSalePrice[key] == true ? (
                                              <>
                                                <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                                                  <div className=" col-start-1 col-span-6 sm:mb-0 lg:mb-2">
                                                    <h1 className="text-base text-green-100">
                                                      <span>
                                                        {TokenPrice[key]} BNB{" "}
                                                      </span>
                                                      (
                                                      <span>
                                                        ${USDValue[key]}
                                                      </span>
                                                      )
                                                      <p className="text-xxs mt-2 text-green-200">
                                                        List price
                                                      </p>
                                                    </h1>
                                                  </div>

                                                  {BiddingOrNot[key] ? (
                                                    <>
                                                      <div className="col-start-7 col-span-8 mb-2">
                                                        <h1 className="text-base text-green-100">
                                                          <span>
                                                            {BiddingPrice[key]}{" "}
                                                            BNB{" "}
                                                          </span>
                                                          (
                                                          <span>
                                                            ${USDValueBid[key]}
                                                          </span>
                                                          )
                                                          <p className="text-xxs mt-2 text-green-200">
                                                            Current offer by{" "}
                                                            <a
                                                              href="#"
                                                              className="text-green-200"
                                                              style={{
                                                                textDecoration:
                                                                  "none",
                                                              }}
                                                            >
                                                              @
                                                              {
                                                                BiddingOwner[
                                                                  key
                                                                ].name
                                                              }
                                                            </a>
                                                          </p>
                                                        </h1>
                                                      </div>
                                                    </>
                                                  ) : null}
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                                                  <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                                                    <h1 className="text-base text-green-100">
                                                      <span className="text-gray-600">
                                                        -
                                                      </span>
                                                      <p className="text-xxs mt-2 text-gray-600">
                                                        List price
                                                      </p>
                                                    </h1>
                                                  </div>
                                                  <div className="col-start-6 col-span-7 text-right mb-2">
                                                    <DialoguePopUp
                                                      id={TokenId[key]}
                                                      key={key}
                                                    />
                                                  </div>
                                                </div>
                                              </>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            <div
                                              className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2"
                                              style={{ paddingBottom: "5px" }}
                                            >
                                              <h1 className="text-base mt-3 text-green-100">
                                                <span>
                                                  waiting for approval
                                                </span>
                                              </h1>
                                            </div>
                                          </>
                                        )}
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
                                          <h5 className="text-xs text-gray-600">
                                            OWNER
                                          </h5>
                                        </div>
                                        <div className="col-start-1 col-span-2 ">
                                          <Avatar
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                              marginTop: "-28px",
                                            }}
                                            alt="Remy Sharp"
                                            src={ArtistData[key].avatar}
                                            className={classes.large}
                                          />
                                        </div>
                                        <div
                                          className="col-start-3 col-span-4"
                                          style={{
                                            marginLeft: "-18px",
                                            marginTop: "-28px",
                                          }}
                                        >
                                          <h5 className="text-sm mt-1 ">
                                            {ArtistData[key].name}
                                          </h5>
                                        </div>
                                        <div className="col-start-7 col-span-2">
                                          <Avatar
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                              marginTop: "-28px",
                                            }}
                                            alt="Remy Sharp"
                                            src={OwnerData[key].avatar}
                                            className={classes.large}
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
                                            {OwnerData[key].name}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainCollection;
