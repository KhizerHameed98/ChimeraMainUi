import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import * as Icons from "phosphor-react";
import data from "../../Data/Discover/3D";
import axios from "axios";
import Web3 from "web3";
import { MDBInput, MDBCol } from "mdbreact";
import Loader from "../Loader";
import config from "../../config";
const chimeraContract = require("../../contracts/Chimera.json");

let web3, chimera;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 564, min: 0 },
    items: 1,
  },
};

function DiscoverMultiCarousel(props) {
  const [searchInput, setSearchInput] = useState("");
  const [NFTData, setNFTData] = useState([]);
  const [Description, setDescription] = useState([]);
  const [hideCarousel, setHideCarousel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoExtension, setVideoExtension] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    console.log(props.search);
    document.title = "Search | Chimera";
  }, []);

  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      if (searchInput) {
        try {
          let description = [];
          let videoOrNot = [];

          web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          chimera = await new web3.eth.Contract(
            chimeraContract.abi,
            config.Chimera
          );
          setHideCarousel(true);
          setLoading(true);
          let res = await axios.post(`${config.host}/api/search/bar`, {
            search: searchInput,
          });
          setNFTData(res.data.imageSearch);
          let nftData = res.data.imageSearch;

          for (let i = 0; i < nftData.length; i++) {
            let desc = await chimera.methods
              .tokenURI(nftData[i].tokenId)
              .call();
            let ext = nftData[i].extension.split(" ");
            if (ext[0] === "video") {
              videoOrNot.push(true);
            } else {
              videoOrNot.push(false);
            }
            description.push(desc);
          }

          Promise.all([description, videoOrNot]).then((res) => {
            setDescription(res[0]);
            setVideoExtension(res[1]);
            setLoading(false);
            console.log(nftData);
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
  }
  function onChangeInput(e) {
    setSearchInput(e.target.value);
  }
  return (
    <>
      {/* 3D */}
      <div className="max-w-6xl  text-center  mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div>
          <MDBCol md="12">
            <MDBInput
              hint="Search..."
              onChange={onChangeInput}
              onKeyPress={handleKeyPress}
              id="Search"
              type="text"
              style={{
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
              }}
              containerClass="active-pink active-pink-2 mt-0 mb-3"
            />
          </MDBCol>
        </div>
      </div>
      {!hideCarousel ? (
        <>
          <div className="text-center pt-4">
            <span className="font-extrabold">Trending Tags</span>
          </div>
        </>
      ) : null}

      <div className="max-w-8xl    mt-24 mx-auto px-40 sm:px-40">
        {/* Top area: Blocks */}
      </div>

      <div className="max-w-6xl    mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}

        {!hideCarousel ? (
          <>
            <div>
              <div>
                <div className="mb-3 ml-3">
                  <span>#3d</span>
                </div>
                <div className="container ml-1" id="carousel">
                  <Carousel responsive={responsive}>
                    {data.map((d, key) => {
                      return d.video ? (
                        <a href="#">
                          <video width="348" height="348" autoPlay muted loop>
                            <source src={d.src} type="video/mp4" />
                          </video>
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "20px",
                            }}
                          >
                            <Icons.VideoCamera
                              size={20}
                              color="white"
                              weight="fill"
                            />
                          </div>
                        </a>
                      ) : (
                        <a href="#">
                          <img
                            src={d.src}
                            style={{ width: "348px", height: "348px" }}
                          />
                        </a>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
              {/*animation*/}
              <div>
                <div className="mb-3 ml-3 mt-5">
                  <span>#animation</span>
                </div>
                <div className="container ml-1" id="carousel">
                  <Carousel responsive={responsive}>
                    {data.map((d, key) => {
                      return d.video ? (
                        <a href="#">
                          <video width="348" height="348" autoPlay muted loop>
                            <source src={d.src} type="video/mp4" />
                          </video>
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "20px",
                            }}
                          >
                            <Icons.VideoCamera
                              size={20}
                              color="white"
                              weight="fill"
                            />
                          </div>
                        </a>
                      ) : (
                        <a href="#">
                          <img
                            src={d.src}
                            style={{ width: "348px", height: "348px" }}
                          />
                        </a>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
              {/*surreal*/}
              <div>
                <div className="mb-3 ml-3 mt-5">
                  <span>#surreal</span>
                </div>
                <div className="container ml-1" id="carousel">
                  <Carousel responsive={responsive}>
                    {data.map((d, key) => {
                      return d.video ? (
                        <a href="#">
                          <video width="348" height="348" autoPlay muted loop>
                            <source src={d.src} type="video/mp4" />
                          </video>
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "20px",
                            }}
                          >
                            <Icons.VideoCamera
                              size={20}
                              color="white"
                              weight="fill"
                            />
                          </div>
                        </a>
                      ) : (
                        <a href="#">
                          <img
                            src={d.src}
                            style={{ width: "348px", height: "348px" }}
                          />
                        </a>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <Loader className="mt-40" />
              </>
            ) : (
              <>
                {/*search item */}
                {NFTData.map((d, key) => {
                  return (
                    <>
                      <div className="  grid gap-6 md:grid-cols-12 lg:grid-cols-12  md:max-w-2xl border-b-2 border-black pb-12 mb-12 lg:max-w-none">
                        <div className="col-span-4">
                          {videoExtension[key] ? (
                            <>
                              <a href={`artworkdetailed/${d.tokenId}`}>
                                <video
                                  autoPlay
                                  muted
                                  loop
                                  style={{
                                    height: "330px",
                                    width: "300px",
                                    objectFit: "cover",
                                  }}
                                >
                                  <source src={d.image} type="video/mp4" />
                                </video>
                              </a>
                            </>
                          ) : (
                            <>
                              <a href={`artworkdetailed/${d.tokenId}`}>
                                <img
                                  className="shadow-2xl rounded"
                                  src={d.image}
                                  style={{
                                    height: "330px",
                                    width: "300px",
                                    objectFit: "cover",
                                  }}
                                />
                              </a>
                            </>
                          )}
                        </div>
                        <div className="col-span-8">
                          <h1 className=" text-3xl font-Inconsolata font-bold sm:mt-5 lg:mt-12 lg:ml-5">
                            {d.name}
                          </h1>
                          <p className="mt-3 text-base font-Inconsolata lg:ml-5">
                            {Description[key]}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default DiscoverMultiCarousel;
