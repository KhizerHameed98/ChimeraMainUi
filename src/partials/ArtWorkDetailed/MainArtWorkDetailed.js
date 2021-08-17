import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import ReadMoreReact from "read-more-react";
import "../../css/check.css";
import * as Icons from "phosphor-react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Web3 from "web3";
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../partials/Loader";
import BuyPopUp from "../../components/BuyPopUp";
import BidPopUp from "../../components/BidPopUp";

const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");
const MarketPlaceSetting = require("../../contracts/MarketplaceSettings.json");
let SMAV2, web3, accounts, chimera, MP;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

function MainArtWorkDetailed({ id }) {
  const classes = useStyles();

  let history = useHistory();

  const [maketPlaceFee, setMarketPalceFee] = useState("");
  const [TotalBuyPrice, setTotalBuyFee] = useState("");
  const [NFTData, setNFTData] = useState([]);
  const [NFTPrice, setNFTPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [OwnerData, setOwnerData] = useState([]);
  const [ArtistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApprovalForAll, setIsApprovalForAll] = useState("");
  const [Tags, setTags] = useState([]);
  const [videoExtension, setVideoExtension] = useState(false);
  const [CurrentBid, setCurrentBid] = useState([]);

  const [like, setLike] = useState(false);
  async function callData() {
    setLoading(true);
    try {
      web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      accounts = await web3.eth.getAccounts();
      chimera = await new web3.eth.Contract(
        chimeraContract.abi,
        config.Chimera
      );
      MP = await new web3.eth.Contract(
        MarketPlaceSetting.abi,
        config.MarketPlaceSettings
      );
      SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);
      let description = await chimera.methods.tokenURI(id).call();

      let nft = await axios.get(`${config.host}/file/${id}`);
      let ext = nft.data[0].extension.split(" ");
      if (ext[0] === "video") {
        setVideoExtension(true);
      }
      let owner = await axios.get(
        `${config.host}/api/users/${nft.data[0].Owner}`
      );

      let artist = await axios.get(
        `${config.host}/api/users/${nft.data[0].Artist}`
      );
      let price = await SMAV2.methods.tokenPrice(config.Chimera, id).call();
      let priceFeeIncluded = await SMAV2.methods
        .tokenPriceFeeIncluded(config.Chimera, id)
        .call();

      let marketplaceFee = await MP.methods
        .getMarketplaceFeePercentage()
        .call();

      const etherValue = Web3.utils.fromWei(price, "ether");
      const etherValue2 = Web3.utils.fromWei(priceFeeIncluded, "ether");

      let res = await chimera.methods
        .isApprovedForAll(accounts[0], config.SMAV2)
        .call();
      if (res === true) {
        setIsApprovalForAll(true);
      } else {
        setIsApprovalForAll(false);
      }

      setMarketPalceFee(marketplaceFee);
      setNFTPrice(etherValue);
      setTotalBuyFee(etherValue2);
      setNFTData(nft.data[0]);
      setOwnerData(owner.data);
      setArtistData(artist.data);
      setDescription(description);
      setTags(nft.data[0].tag);
      setNFTData(nft.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      history.push("/market");
    }
  }
  async function SetApprovalForAll() {
    setLoading(true);
    try {
      let res = await chimera.methods
        .setApprovalForAll(config.SMAV2, true)
        .send({ from: accounts[0] });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  useEffect(() => {
    if (!id) {
      history.push("/");
    }
    document.title = "Chimera | ArtWork";
    callData();
  }, []);

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <>
      {loading ? (
        <>
          {/* <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
            <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
            <circle cx="20" cy="20" r="20" />
          </ContentLoader> */}
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Loader />
          </div>
        </>
      ) : (
        <>
          <div className=" mx-5 mt-40 grid gap-6 mx-2 md:grid-cols-12 lg:grid-cols-12 md:max-w-2xl lg:max-w-6xl xl:max-w-none sm:mx-0">
            <div className=" sm:col-span-12 sm:px-0 lg:col-span-4 lg:px-10">
              {/*Loop Start */}
              <h1 className="font-Lobster pr-10 uppercase">{NFTData.name}</h1>
              <div className="mt-4">
                <span className="text-sm font-extrabold">Edition 1 of 1</span>
              </div>
              <div className="mt-5 font-Inconsolata">
                <ReadMoreReact
                  text={Description}
                  min={60}
                  ideal={90}
                  max={120}
                  readMoreText={
                    <button style={{ color: "#007bff" }} className="text-sm">
                      show more
                    </button>
                  }
                />
              </div>

              <div class="text-left text-sm font-Inconsolata p-2 mt-2 ">
                {Tags.map((d, key) => {
                  return (
                    <>
                      <span>
                        <a href="#">#{d}</a>
                      </span>{" "}
                    </>
                  );
                })}
              </div>
              {localStorage.getItem("walletAddress") ? (
                <>
                  {localStorage.getItem("role") === "collector" &&
                  OwnerData.address !==
                    localStorage.getItem("walletAddress") ? (
                        <>
                          {/*commit this check */}
                      {isApprovalForAll ? (
                        <>
                          <div className="mt-5">
                            <span
                              style={{
                                color: "#a5a5a5",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              LIST PRICE:
                            </span>
                            <p className="text-5xl font-extrabold">
                              {NFTPrice}
                              <span className="text-xs font-extrabold">
                                BNB
                              </span>
                            </p>
                          </div>
                          {/*BUY*/}
                          {/* <BuyPopUp
                            id={id}
                            nftData={NFTData}
                            nftPrice={NFTPrice}
                            nftPriceFeeIncluded={TotalBuyPrice}
                            marketPlaceSettingsFee={maketPlaceFee}
                            OwnerData={OwnerData}
                          /> */}

                          <BidPopUp
                            key={1}
                            id={id}
                            nftData={NFTData}
                            nftPrice={NFTPrice}
                            nftPriceFeeIncluded={TotalBuyPrice}
                            marketPlaceSettingsFee={maketPlaceFee}
                            OwnerData={OwnerData}
                          />
                        </>
                      ) : (
                        <>
                          <div className="text-center mb-20">
                            <button
                              onClick={SetApprovalForAll}
                              className="btn text-center make-offer-btn btn-primary mt-4 hover: bg-gray-1000"
                            >
                              Set Approval
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="text-center mb-20">
                    <Link to="/signin">
                      <button className="btn text-center make-offer-btn btn-primary mt-5 hover: bg-gray-1000">
                        SIGNIN TO COLLECT
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="  sm:col-span-12 lg:col-span-5 ">
              {videoExtension ? (
                <>
                  <video autoPlay muted controls loop className="shadow-2xl">
                    <source src={NFTData.image} type="video/mp4" />
                  </video>
                </>
              ) : (
                <>
                  <img src={NFTData.image} className="shadow-2xl" />
                </>
              )}
            </div>
            <div className="mt-10 sm:ml-0  sm:col-span-12  lg:col-span-3 lg:ml-20 lg:mt-3 ">
              <div className="flex flex-col divide-y  divide-gray-300">
                {/*First Divider */}
                <div className="flex flex-col">
                  <div className="mb-3">
                    <a
                      href={`/user-detail/${ArtistData._id}`}
                      className="text-sm mt-1 text-decoration-none text-black-100 hover:text-black-100"
                    >
                      <div class="space-x-20   sm:space-x-5 ">
                        <div class="inline-block ...">
                          {" "}
                          <Avatar
                            id="nav-avatar"
                            style={{
                              marginLeft: "-1px",
                              marginTop: "1px",
                              width: "42px",
                              height: "42px",
                            }}
                            alt="Remy Sharp"
                            src={ArtistData.avatar}
                            className={classes.large}
                          />
                        </div>
                        <div class="inline-block">
                          <span className="text-sm">@{ArtistData.name}</span>
                          <p className="text-xs text-gray-500 font-bold">
                            Artist
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  {/*Second Line */}
                  <div className="mb-4">
                    <a
                      href={`/user-detail/${OwnerData._id}`}
                      className="text-sm mt-1 text-decoration-none text-black-100 hover:text-black-100"
                    >
                      <div class="space-x-20   sm:space-x-5 ">
                        <div class="inline-block ...">
                          {" "}
                          <Avatar
                            id="nav-avatar"
                            style={{
                              marginLeft: "-1px",
                              width: "42px",
                              height: "42px",
                            }}
                            alt="Remy Sharp"
                            src={OwnerData.avatar}
                          />
                        </div>
                        <div class="inline-block">
                          <span className="text-sm">@{OwnerData.name}</span>
                          <p className="text-xs text-gray-500 font-bold">
                            Owner
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  {/*Second Line */}
                  <div className="mb-4">
                    <div class="space-x-20   sm:space-x-5 ">
                      <div class="inline-block ...">
                        {" "}
                        <img
                          class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          style={{ marginTop: "-30px" }}
                          src="https://www.pinclipart.com/picdir/big/35-353647_spinnin-records-youtube-spinnin-records-logo-png-clipart.png"
                          alt=""
                        />
                      </div>
                      <div class="inline-block">
                        <span className="text-sm">@Spinnin_Records</span>
                        <p className="text-xs text-gray-500 font-bold">Brand</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Second Divider */}
                <div className="flex flex-col">
                  <div className="mb-3 mt-5">
                    <div class="space-x-20  sm:space-x-8 ">
                      <div class="inline-block ...">
                        {" "}
                        <button>
                          {" "}
                          <Icons.Heart
                            size={30}
                            onClick={toggleLike}
                            weight={like ? "fill" : "regular"}
                          />
                        </button>
                      </div>
                      <div class="inline-block">
                        <span className="text-sm">3</span>
                        <p className="text-xs text-gray-500 font-bold">
                          Favorites
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*Second Line */}
                  <div className="mb-4">
                    <div class="space-x-20 sm:space-x-8 ">
                      <div class="inline-block ...">
                        <Icons.Eye size={30} />
                      </div>
                      <div class="inline-block">
                        <span className="text-sm">6</span>
                        <p className="text-xs text-gray-500 font-bold">Views</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" mt-40  sm:col-span-12 lg:col-span-5 ">
              <h1 className="text-xl font-bold">HISTORY</h1>
              <div className="flex flex-col divide-y  divide-gray-300">
                <div className="flex flex-col mb-3  mt-5">
                  <span className="text-sm">
                    <a href="#">@aee</a> accepted an offer of 8.888=($14,330)
                    from <a href="#">@_888_</a>
                  </span>
                  <span className="text-gray-500 text-xs font-bold">
                    2 Hours ago
                  </span>
                </div>
                <div className="flex pt-5 flex-col">
                  <p className="text-sm">
                    <a href="#">@aee</a> accepted an offer of 8.888=($14,330)
                    from <a href="#">@_888_</a>
                    <p className="text-gray-500 text-xs font-bold">
                      2 Hours ago
                    </p>
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}
export default MainArtWorkDetailed;
