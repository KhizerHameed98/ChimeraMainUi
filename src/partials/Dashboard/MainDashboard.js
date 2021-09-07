import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "../../css/Tabpanel.css";
import Web3 from "web3";
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../partials/Loader";
const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");

let SMAV2, web3, accounts, chimera;

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MainDashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [NFTData, setNFTData] = useState([]);
  const [OwnerData, setOwnerData] = useState([]);
  const [TokenId, setTokenId] = useState([]);
  const [TokenPrice, setTokenPrice] = useState([]);
  const [ArtistData, setArtistData] = useState([]);
  const [BiddingOwner, setBiddingOwner] = useState([]);
  const [BiddingPrice, setBiddingPrice] = useState([]);
  const [USDValue, setUSDValue] = useState(0);
  const [USDValueBid, setUSDValueBid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noData2, setNoData2] = useState(false);
  const [videoExtension, setVideoExtension] = useState([]);

  const [data, setData] = useState([]);
  {
    /*outgoing*/
  }
  const [NFTData2, setNFTData2] = useState([]);
  const [OwnerData2, setOwnerData2] = useState([]);
  const [TokenId2, setTokenId2] = useState([]);
  const [TokenPrice2, setTokenPrice2] = useState([]);
  const [ArtistData2, setArtistData2] = useState([]);
  const [BiddingOwner2, setBiddingOwner2] = useState([]);
  const [BiddingPrice2, setBiddingPrice2] = useState([]);
  const [BidPriceUsd2, setBidPriceUsd2] = useState(0);
  const [TokenPriceUsd2, setTokenPriceUsd2] = useState(0);
  const [videoExtension2, setVideoExtension2] = useState([]);

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
    let bidding = [];
    let USDTValue = [];
    let USDTValueBid = [];
    let biddingOwner = [];
    let videoOrNot = [];
    try {
      let totalSupply = await chimera.methods.totalSupply().call();
      for (let i = 0; i < totalSupply; i++) {
        let nfts = await chimera.methods.tokenByIndex(i).call();

        let owner = await chimera.methods.ownerOf(nfts).call();
        let bid = await SMAV2.methods
          .currentBidDetailsOfToken(config.Chimera, nfts)
          .call();

        if (owner === accounts[0] && bid[0] !== "0") {
          tokenId.push(nfts);
          let res = await axios.get(`${config.host}/file/${nfts}`);
          nftData.push(res.data[0]);
          let ext = res.data[0].extension.split(" ");
          if (ext[0] === "video") {
            videoOrNot.push(true);
          } else {
            videoOrNot.push(false);
          }

          let artistVar = await axios.get(
            `${config.host}/api/users/${res.data[0].Artist}`
          );
          artist.push(artistVar.data);

          let ownerVar = await axios.get(
            `${config.host}/api/users/${res.data[0].Owner}`
          );
          ownerData.push(ownerVar.data);

          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, nfts)
            .call();
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

          let biddingOwn = await axios.post(`${config.host}/api/auth`, {
            address: bid[1],
          });
          biddingOwner.push(biddingOwn.data);
        }
      }
      Promise.all([
        nftData,
        ownerData,
        tokenId,
        nftPrice,
        artist,
        bidding,
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
        setBiddingPrice(res[5]);

        setUSDValue(res[6]);
        setUSDValueBid(res[7]);
        setBiddingOwner(res[8]);
        setVideoExtension(res[9]);
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
  async function callDataOut() {
    setLoading2(true);
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    let nftData = [];
    let tokenId = [];
    let biddingOwner = [];
    let ownerData = [];
    let artistData = [];
    let tokenPrice = [];
    let tokenPriceUsd = [];
    let bidPrice = [];
    let bidPriceUsd = [];
    let videoOrNot = [];
    try {
      let res = await axios.get(`${config.host}/api/bids/get/${accounts[0]}`);
      let data = res.data;
      try {
        for (let i = 0; i < data.length; i++) {
          tokenId.push(data[i].tokenId);
          let owner = await chimera.methods.ownerOf(data[i].tokenId).call();
          let artist = await chimera.methods
            .tokenCreator(data[i].tokenId)
            .call();
          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, data[i].tokenId)
            .call();
          let bid = await SMAV2.methods
            .currentBidDetailsOfToken(config.Chimera, data[i].tokenId)
            .call();

          let res = await axios.get(`${config.host}/file/${data[i].tokenId}`);
          nftData.push(res.data[0]);
          let ext = res.data[0].extension.split(" ");
          if (ext[0] === "video") {
            videoOrNot.push(true);
          } else {
            videoOrNot.push(false);
          }
          let bidOwn = await axios.post(`${config.host}/api/auth`, {
            address: bid[1],
          });

          biddingOwner.push(bidOwn.data);
          let ownerD = await axios.post(`${config.host}/api/auth`, {
            address: owner,
          });
          let artistD = await axios.post(`${config.host}/api/auth`, {
            address: artist,
          });
          let bidBNB = Web3.utils.fromWei(bid[0], "ether");
          let priceBNB = Web3.utils.fromWei(price, "ether");
          await axios
            .get(
              "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
            )
            .then((res) => {
              let d = res.data;
              let bid = d.USD * bidBNB;
              let nftPrice = d.USD * priceBNB;
              bidPriceUsd.push(financial(bid));
              tokenPriceUsd.push(financial(nftPrice));
            });
          tokenPrice.push(priceBNB);
          bidPrice.push(bidBNB);
          ownerData.push(ownerD.data);

          artistData.push(artistD.data);
        }

        Promise.all([
          nftData,
          tokenId,
          biddingOwner,
          ownerData,
          artistData,
          tokenPrice,
          tokenPriceUsd,
          bidPrice,
          bidPriceUsd,
          videoOrNot,
        ]).then((res) => {
          if (res[0].length === 0) {
            setNoData2(true);
          }
          console.log(res);
          setNFTData2(res[0]);
          setTokenId2(res[1]);
          setBiddingOwner2(res[2]);
          setOwnerData2(res[3]);
          setArtistData2(res[4]);
          setTokenPrice2(res[5]);
          setTokenPriceUsd2(res[6]);
          setBiddingPrice2(res[7]);
          setBidPriceUsd2(res[8]);
          setVideoExtension2(res[9]);
          setLoading2(false);
        });
      } catch (error) {
        setLoading2(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      setLoading2(false);
      setNoData2(true);
      console.log(error);
    }
  }
  function financial(x) {
    return Number.parseFloat(x).toFixed(0);
  }

  useEffect(() => {
    callDataOut();
    callData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} className="mt-40">
      <h3 className="text-3xl">Offers</h3>
      <AppBar position="static" className="mt-5">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Incoming" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Outgoing" href="/spam" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/*Incoming*/}
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
                                      {videoExtension[key] ? (
                                        <>
                                          <a
                                            href={`acceptbiddetailed/${TokenId[key]}`}
                                          >
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
                                          </a>
                                        </>
                                      ) : (
                                        <>
                                          <a
                                            href={`acceptbiddetailed/${TokenId[key]}`}
                                          >
                                            <img
                                              src={d.image}
                                              style={{
                                                height: "350px",
                                                objectFit: "cover",
                                                width: "100%",
                                              }}
                                              alt="Random Creativity Outburst"
                                            />
                                          </a>
                                        </>
                                      )}
                                      <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                                        <div className=" sm:col-span-12 lg:col-span-12  ">
                                          <h1 className="font-bold text-base nftName text-black">
                                            {d.name}
                                          </h1>
                                        </div>

                                        <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                                          <>
                                            <>
                                              <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                                                <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                                                  <h1 className="text-base text-green-100">
                                                    <span>
                                                      {TokenPrice[key]}
                                                    </span>
                                                    BNB(
                                                    <span>
                                                      ${USDValue[key]}
                                                    </span>
                                                    )
                                                    <p className="text-xxs mt-2 text-green-200">
                                                      List price
                                                    </p>
                                                  </h1>
                                                </div>

                                                <>
                                                  <div className="col-start-6 col-span-7 mb-2">
                                                    <h1 className="text-base text-green-100">
                                                      <span>
                                                        {BiddingPrice[key]}
                                                      </span>
                                                      BNB(
                                                      <span>
                                                        ${USDValueBid[key]}
                                                      </span>
                                                      )
                                                      <p className="text-xxs mt-2 text-green-200">
                                                        Current offer by{" "}
                                                        <a
                                                          href={`/user-detail/${BiddingOwner[key]._id}`}
                                                          className="text-green-200"
                                                          style={{
                                                            textDecoration:
                                                              "none",
                                                          }}
                                                        >
                                                          @
                                                          {
                                                            BiddingOwner[key]
                                                              .name
                                                          }
                                                        </a>
                                                      </p>
                                                    </h1>
                                                  </div>
                                                </>
                                              </div>
                                            </>
                                          </>
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
                                            <a
                                              href={`/user-detail/${ArtistData[key]._id}`}
                                            >
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
                                            </a>
                                          </div>
                                          <div
                                            className="col-start-3 col-span-4"
                                            style={{
                                              marginLeft: "-18px",
                                              marginTop: "-28px",
                                            }}
                                          >
                                            <a
                                              href={`/user-detail/${ArtistData[key]._id}`}
                                              className="text-sm mt-1 text-decoration-none text-black-100 hover:text-black-100"
                                            >
                                              {ArtistData[key].name}
                                            </a>
                                          </div>

                                          <div className="col-start-7 col-span-2">
                                            <a
                                              href={`/user-detail/${OwnerData[key]._id}`}
                                            >
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
                                            </a>
                                          </div>
                                          <div
                                            className="col-start-9 col-span-4"
                                            style={{
                                              marginLeft: "-18px",
                                              marginTop: "-28px",
                                            }}
                                          >
                                            <a
                                              href={`/user-detail/${OwnerData[key]._id}`}
                                              className="text-sm mt-1 text-decoration-none text-black-100 hover:text-black-100"
                                            >
                                              {OwnerData[key].name}
                                            </a>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/*Outgoing*/}
        <div>
          <div className="max-w-6xl mt-10 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
              {loading2 ? (
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
                          {noData2 ? (
                            <>
                              <h1>NO DATA</h1>
                            </>
                          ) : (
                            <>
                              {/*Loop Start*/}
                              {NFTData2.map((d, key) => {
                                return (
                                  <>
                                    {/* 1st item */}
                                    <div className=" border-2 border-black-100 relative flex flex-col bg-white ">
                                      {videoExtension2[key] ? (
                                        <a
                                          href={`/artworkdetail/${TokenId2[key]}`}
                                        >
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
                                        </a>
                                      ) : (
                                        <a
                                          href={`/artworkdetailed/${TokenId2[key]}`}
                                        >
                                          <img
                                            src={d.image}
                                            style={{
                                              height: "350px",
                                              objectFit: "cover",
                                              width: "100%",
                                            }}
                                            alt="Random Creativity Outburst"
                                          />
                                        </a>
                                      )}
                                      <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                                        <div className=" sm:col-span-12 lg:col-span-12  ">
                                          <h1 className="font-bold text-base nftName text-black">
                                            {d.name}
                                          </h1>
                                        </div>

                                        <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                                          <>
                                            <>
                                              <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                                                <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                                                  <h1 className="text-base text-green-100">
                                                    <span>
                                                      {TokenPrice2[key]}
                                                    </span>
                                                    BNB(
                                                    <span>
                                                      ${TokenPriceUsd2[key]}
                                                    </span>
                                                    )
                                                    <p className="text-xxs mt-2 text-green-200">
                                                      List price
                                                    </p>
                                                  </h1>
                                                </div>

                                                <>
                                                  <div className="col-start-6 col-span-7 mb-2">
                                                    <h1 className="text-base text-green-100">
                                                      <span>
                                                        {BiddingPrice2[key]}
                                                      </span>
                                                      BNB(
                                                      <span>
                                                        ${BidPriceUsd2[key]}
                                                      </span>
                                                      )
                                                      <p className="text-xxs mt-2 text-green-200">
                                                        Current offer by{" "}
                                                        <a
                                                          href={`/user-detail/${BiddingOwner2[key]._id}`}
                                                          className="text-green-200"
                                                          style={{
                                                            textDecoration:
                                                              "none",
                                                          }}
                                                        >
                                                          @
                                                          {
                                                            BiddingOwner2[key]
                                                              .name
                                                          }
                                                        </a>
                                                      </p>
                                                    </h1>
                                                  </div>
                                                </>
                                              </div>
                                            </>
                                          </>
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
                                            <a
                                              href={`/user-detail/${ArtistData2[key]._id}`}
                                            >
                                              <Avatar
                                                style={{
                                                  width: "25px",
                                                  height: "25px",
                                                  marginTop: "-28px",
                                                }}
                                                alt="Remy Sharp"
                                                src={ArtistData2[key].avatar}
                                              />
                                            </a>
                                          </div>

                                          <div
                                            className="col-start-3 col-span-4"
                                            style={{
                                              marginLeft: "-18px",
                                              marginTop: "-28px",
                                            }}
                                          >
                                            <a
                                              href={`/user-detail/${ArtistData2[key]._id}`}
                                              className="text-sm mt-1 text-decoration-none text-black-100 hover:text-black-100"
                                            >
                                              {ArtistData2[key].name}
                                            </a>
                                          </div>
                                          <div className="col-start-7 col-span-2">
                                            <a
                                              href={`/user-detail/${OwnerData2[key]._id}`}
                                            >
                                              <Avatar
                                                style={{
                                                  width: "25px",
                                                  height: "25px",
                                                  marginTop: "-28px",
                                                }}
                                                alt="Remy Sharp"
                                                src={OwnerData2[key].avatar}
                                              />
                                            </a>
                                          </div>
                                          <div
                                            className="col-start-9 col-span-4"
                                            style={{
                                              marginLeft: "-18px",
                                              marginTop: "-28px",
                                            }}
                                          >
                                            <a
                                              href={`/user-detail/${OwnerData2[key]._id}`}
                                              className="text-sm mt-1 text-decoration-none text-black-100 hover:text-black-100"
                                            >
                                              {OwnerData2[key].name}
                                            </a>
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
      </TabPanel>
    </div>
  );
}
