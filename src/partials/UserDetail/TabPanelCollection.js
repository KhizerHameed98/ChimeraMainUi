import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import "../../css/Tabpanel.css";
import "../../css/tabPanelCollection.css";

import Web3 from "web3";
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../partials/Loader";
const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");

let SMAV2, web3, chimera;

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

export default function MainDashboard({
  id,
  setCollection,
  setCreation,
  setLoading,
  loading,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [CollectionNFTData, setCollectionNFTData] = useState([]);
  const [CollectionTokenId, setCollectionTokenId] = useState([]);
  const [CreationNFTData, setCreationNFTData] = useState([]);
  const [CreationTokenId, setCreationTokenId] = useState([]);
  const [VideoCollection, setVideoCollection] = useState([]);
  const [VideoCreation, setVideoCreation] = useState([]);
  const [NoDataCollection, setNoDataCollection] = useState(false);
  const [NoDataCreation, setNoDataCreation] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function callData() {
    setLoading(true);
    try {
      web3 = new Web3(window.ethereum);
      chimera = await new web3.eth.Contract(
        chimeraContract.abi,
        config.Chimera
      );
      SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);

      let collectionNftData = [];
      let creationNftData = [];
      let collectionTokenId = [];
      let creationTokenId = [];
      let videoCollection = [];
      let videoCreation = [];

      let collection = 0;
      let creation = 0;

      let res = await axios.get(`${config.host}/api/users/${id}`);
      let data = res.data;

      let totalSupply = await chimera.methods.totalSupply().call();

      for (let i = 0; i < totalSupply; i++) {
        let nftId = await chimera.methods.tokenByIndex(i).call();

        let owner = await chimera.methods.ownerOf(nftId).call();

        let creator = await chimera.methods.tokenCreator(nftId).call();

        //collection
        if (data.address === owner) {
          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, nftId)
            .call();
          collection++;
          collectionTokenId.push(nftId);
          let res = await axios.get(`${config.host}/file/${nftId}`);
          let ext = res.data[0].extension.split(" ");
          if (ext[0] === "video") {
            videoCollection.push(true);
          } else {
            videoCollection.push(false);
          }
          collectionNftData.push(res.data[0]);
        }
        //creation

        if (data.address === creator) {
          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, nftId)
            .call();

          creation++;
          creationTokenId.push(nftId);
          let res = await axios.get(`${config.host}/file/${nftId}`);
          let ext = res.data[0].extension.split(" ");
          if (ext[0] === "video") {
            videoCreation.push(true);
          } else {
            videoCreation.push(false);
          }
          creationNftData.push(res.data[0]);
        }
      }
      Promise.all([
        collectionNftData,
        creationNftData,
        collectionTokenId,
        creationTokenId,
        collection,
        creation,
        videoCollection,
        videoCreation,
      ]).then((res) => {
        console.log(res);
        if (res[0].length === 0) {
          setNoDataCollection(true);
        }
        if (res[1].length === 0) {
          setNoDataCreation(true);
        }
        console.log(res[0]);
        setCollectionNFTData(res[0]);
        setCreationNFTData(res[1]);
        setCollectionTokenId(res[2]);
        setCreationTokenId(res[3]);
        setCollection(res[4]);
        setCreation(res[5]);
        setVideoCollection(res[6]);
        setVideoCreation(res[7]);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);

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
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="COLLECTIONS" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="CREATIONS" href="/spam" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <TabPanel value={value} index={0}>
            {/*Incoming*/}
            {/*Collection*/}

            <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
              {NoDataCollection ? (
                <>
                  <p>Looks like there's nothing in this collection yet!</p>
                  <p>
                    See what's being created and collected in the{" "}
                    <a href="/market">activity feed</a>
                  </p>
                </>
              ) : (
                <>
                  <section className="relative">
                    {/* Section background (needs .relative class on parent and next sibling elements) */}

                    <div className="relative max-w-10xl mx-auto  sm:px-6">
                      <div className="py-8 md:py-10">
                        {/* Items */}
                        <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-2 md:max-w-2xl lg:max-w-none">
                          {/*Loop Start*/}
                          {/* 1st item */}
                          {CollectionNFTData.map((d, key) => {
                            return (
                              <>
                                {VideoCollection[key] ? (
                                  <a
                                    href={`/artworkdetailed/${CollectionTokenId[key]}`}
                                  >
                                    <video
                                      autoPlay
                                      muted
                                      loop
                                      style={{
                                        height: "250px",
                                        objectFit: "cover",
                                        width: "100%",
                                      }}
                                    >
                                      <source src={d.image} type="video/mp4" />
                                    </video>
                                  </a>
                                ) : (
                                  <a
                                    href={`/artworkdetailed/${CollectionTokenId[key]}`}
                                  >
                                    <img
                                      src={d.image}
                                      style={{
                                        height: "250px",
                                        objectFit: "cover",
                                        width: "100%",
                                      }}
                                    />
                                  </a>
                                )}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/*Outgoing*/}
            {/*Creation*/}
            <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
              {NoDataCreation ? (
                <>
                  <p>Looks like there's nothing in this creation yet!</p>
                  <p>
                    See what's being created and collected in the{" "}
                    <a href="/market">activity feed</a>
                  </p>
                </>
              ) : (
                <>
                  <section className="relative">
                    {/* Section background (needs .relative class on parent and next sibling elements) */}

                    <div className="relative max-w-10xl mx-auto  sm:px-6">
                      <div className="py-8 md:py-10">
                        {/* Items */}
                        <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-2 md:max-w-2xl lg:max-w-none">
                          {/* 1st item */}
                          {/*Loop Start*/}
                          {/* 1st item */}
                          {CreationNFTData.map((d, key) => {
                            return (
                              <>
                                {VideoCreation[key] ? (
                                  <a
                                    href={`/artworkdetailed/${CreationTokenId[key]}`}
                                  >
                                    <video
                                      autoPlay
                                      muted
                                      loop
                                      style={{
                                        height: "250px",
                                        objectFit: "cover",
                                        width: "100%",
                                      }}
                                    >
                                      <source src={d.image} type="video/mp4" />
                                    </video>
                                  </a>
                                ) : (
                                  <a
                                    href={`/artworkdetailed/${CreationTokenId[key]}`}
                                  >
                                    <img
                                      src={d.image}
                                      style={{
                                        height: "250px",
                                        objectFit: "cover",
                                        width: "100%",
                                      }}
                                    />
                                  </a>
                                )}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </TabPanel>
        </>
      )}
    </div>
  );
}
