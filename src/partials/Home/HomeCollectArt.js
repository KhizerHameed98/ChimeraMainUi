import React from "react";
import { Link } from "react-router-dom";
function HomeCollectArt() {
  return (
    <>
      <div className="max-w-16xl pb-5 mt-5  mx-5 md:mx-3  sm:px-6 mx-0 ">
        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 px-6 gap-8 py-8 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              <h1
                className="text-4xl md:text-3xl my-2 font-extrabold  tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                How to Collect Digital Art.
              </h1>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 text-xs font-extrabold mb-2">
              DISCOVER TOKENIZED DIGITAL ART.
            </h6>
            <p className="text-sm">
              Artists issue authenticated single edition digital artworks. These
              are certified on the Ethereum blockchain to prevent forgery and
              provide historical provenance.
            </p>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 text-xs font-extrabold mb-2">
              BUYING & SELLING
            </h6>
            <p className="text-sm">
              Purchase at the asking price or make an offer by placing a bid.
              Once you own a piece you can resell it in the secondary market to
              other collectors.
            </p>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 text-xs font-extrabold mb-2">
              SHOWCASE YOUR COLLECTION
            </h6>
            <p className="text-sm">
              Customize your profile to show off your art collection to patrons
              around the world. Display your works in a VR gallery, digital
              display, or anywhere else you like.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        {localStorage.getItem("walletAddress") ? (
          <>
            <Link to="/market">
              <button
                data-aos="zoom-y-out"
                className="btn btn-primary"
                style={{
                  width: 250,
                  height: 45,
                  backgroundColor: "black",
                  borderColor: "black",
                }}
              >
                <strong style={{ fontSize: "12px" }}>START COLLECTING</strong>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button
                data-aos="zoom-y-out"
                className="btn btn-primary"
                style={{
                  width: 250,
                  height: 45,
                  backgroundColor: "black",
                  borderColor: "black",
                }}
              >
                <strong style={{ fontSize: "12px" }}>START COLLECTING</strong>
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
export default HomeCollectArt;
