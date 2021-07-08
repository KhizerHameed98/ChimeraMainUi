import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import data from "../../Data/Market/data";
import Spinnin from "../../images/Spinnin.gif";

import "../../css/curatedbrands.css";
//import data from "../../Data/CuratedDetailed/data";
import { Link } from "react-router-dom";
function MainDetailCurated(props) {
  const [propsData, setData] = useState("");
  useEffect(() => {
    document.title = "Chimera|Brand-detail";
    setData(props.location.state.d);

    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i].src);
    }
    Promise.all(result).then((response) => {
      let finalData = response.map((item, index) => {
        var res = item.split(".");
        var format = res[res.length - 1];
        if (format === "png" || format === "jpg" || format === "jpeg") {
          return {
            src: item,
            video: false,
          };
        } else {
          return {
            src: item,
            video: true,
          };
        }
      });
    });
  }, []);

  return (
    <>
      {/* 3D */}

      <div className="max-w-6xl  mt-40 mx-auto px-10 sm:px-6">
        <Carousel>
          <Carousel.Item>
            <div>
              <img
                src={Spinnin}
                alt="img"
                class="object-contain  w-full ..."
                style={{ height: 300 }}
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="max-w-8xl mt-10  text-center px-4 sm:px-6">
        <Carousel className="mt-20 shadow-2xl CarouselAnimation curatedCarousel">
          <Carousel.Item className="changeColor">
            <div>
              <img
                src={propsData.src}
                alt="img"
                className="object-cover shadow-2xl rounded w-full ..."
                style={{ height: 430 }}
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        <div className="max-w-6xl mt-20   mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="px-6  py-8 md:py-12">
            {/* 1st block */}
            <div className="md:flex md:items-center md:justify-between pt-5 md:py-8 border-t border-gray-200">
              {/* Social links */}
              <div className="flex mb-4  md:order-1 md:ml-4 md:mb-0 ">
                <span className="text-base font-semibold font-Inconsolata ">
                  Creation Date: 1999
                </span>
              </div>

              {/* Copyrights note */}
              <div className="text-sm max-w-sm text-gray-600 mr-4  ">
                <span className="text-base font-bold font-Inconsolata">
                  Spinnin' Records is a Dutch electronic music record label
                  founded in 1999 by Eelko van Kooten and Roger de Graaf
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="max-w-6xl  mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 ">
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
                          <Link
                            to={{ pathname: "/artworkdetailed", state: d.src }}
                          >
                            {d.ArtPicture ? (
                              <img
                                src={d.src}
                                alt="Random Creativity Outburst"
                              />
                            ) : (
                              <video autoPlay muted loop>
                                <source src={d.src} type="video/mp4" />
                              </video>
                            )}
                          </Link>
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
export default MainDetailCurated;
