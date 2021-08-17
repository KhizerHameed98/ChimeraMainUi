import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TabPanel from "./TabPanelCollection";
import Swal from "sweetalert2";
import Loader from "../Loader";
import axios from "axios";
import config from "../../config";
const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");
let SMAV2, web3, accounts, chimera;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function MainUserDetail({ id }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [collection, setCollection] = useState("");
  const [creation, setCreation] = useState("");
  const [loading2, setLoading2] = useState(false);
  async function callData() {
    let address;
    setLoading(true);
    try {
      let res = await axios.get(`${config.host}/api/users/${id}`);
      setUserData(res.data);
      setUserAddress(res.data.address);
      address = res.data.address;
      setLoading(false);
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
    callData();
  }, []);

  return (
    <>
      <div className="max-w-6xl    mt-12 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}

        {/*search item */}

        <>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className=" text-gray-700 grid gap-6 md:grid-cols-12 lg:grid-cols-12  md:max-w-2xl pb-12 mb-12 lg:max-w-none">
                <div className="lg:col-span-6 sm:col-span-12">
                  {/*Column start 1 */}
                  <div className=" grid gap-6 md:grid-cols-12  lg:grid-cols-12  md:max-w-2xl  mb-12 lg:max-w-none">
                    {/*Inner 1*/}
                    <div className="lg:col-span-4 md:col-span-4 sm:col-span-12 ">
                      <div className={classes.root}>
                        <Avatar
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                          alt="Remy Sharp"
                          src={userData.avatar}
                          className={classes.large}
                        />
                      </div>
                      {localStorage.getItem("id") === id ? (
                        <>
                          <a
                            href="/profile"
                            className="btn btn-primary mt-3 px-4 "
                            style={{
                              backgroundColor: "#212121",
                              fontSize: "12px",
                              borderColor: "#212121",
                            }}
                          >
                            {" "}
                            Edit Profile
                          </a>
                          <div>
                            <a
                              href="https://forms.gle/TdMcYcE3LBA8Wn349?_imcp=1"
                              className="btn btn-primary mt-3"
                              style={{
                                backgroundColor: "#212121",
                                fontSize: "12px",
                                paddingRight: "41px",
                                paddingLeft: "42px",
                                borderColor: "#212121",
                              }}
                            >
                              KYC
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <button
                              className="btn btn-primary mt-3 px-4 ml-2 "
                              style={{
                                backgroundColor: "#212121",
                                fontSize: "15px",
                                borderColor: "#212121",
                              }}
                            >
                              Follow
                            </button>
                          </div>
                        </>
                      )}
                      <div className="mt-4 ml-2 pl-1">
                        <span
                          className="font-Inconsolata font-bold"
                          style={{ fontSize: "14px" }}
                        >
                          Followers:118
                        </span>
                      </div>
                      <div className="mt-2 ml-2 pl-1">
                        <span
                          className="font-Inconsolata font-bold"
                          style={{ fontSize: "14px" }}
                        >
                          Following:161
                        </span>
                      </div>
                    </div>
                    <div className="col-span-8">
                      <div>
                        <span className=" text-4xl font-bold">
                          {userData.flname}
                        </span>
                      </div>
                      <div>
                        <span
                          className="text-base font-bold"
                          style={{ color: "rgb(10 10 10 / 70%)" }}
                        >
                          @{userData.name}
                        </span>
                      </div>

                      {loading2 ? (
                        <Loader />
                      ) : (
                        <>
                          <div className=" grid mt-4 gap-6 md:grid-cols-12  lg:grid-cols-12  md:max-w-2xl lg:max-w-none">
                            <div className="col-span-4 ">
                              <a
                                href="#"
                                style={{ textDecoration: "none" }}
                                className="text-gray-150 hover:text-blue-400"
                              >
                                <span className="text-xs font-bold">
                                  COLLECTIONS
                                </span>
                                <p className="text-black-100  font-extrabold text-3xl">
                                  {collection}
                                </p>
                              </a>
                            </div>
                            <div className="col-span-4  ">
                              <a
                                href="#"
                                style={{ textDecoration: "none" }}
                                className="text-gray-150 hover:text-blue-400"
                              >
                                <span className="text-xs font-bold">
                                  CREATIONS
                                </span>
                                <p className="text-black-100  font-extrabold text-3xl">
                                  {creation}
                                </p>
                              </a>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="text-gray-150">
                        {userData.location ? (
                          <>
                            <i class="fas fa-map-marker-alt"></i>
                            <span className="ml-2 font-semibold">
                              {userData.location}
                            </span>
                          </>
                        ) : null}
                        <p className="mt-2" style={{ fontSize: "14px" }}>
                          <a className="text-blue-400" href={userData.website}>
                            {userData.website}
                          </a>
                        </p>
                        <p className="mt-4 text-gray-700 pr-2">
                          {userData.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 md:col-span-12 sm:col-span:12">
                  {/* <h1>hey</h1> */}
                  <TabPanel
                    id={id}
                    setCollection={setCollection}
                    setCreation={setCreation}
                    setLoading={setLoading2}
                    loading={loading2}
                  />
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
}
export default MainUserDetail;
