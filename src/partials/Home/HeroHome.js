import React, { useState } from "react";
import { Link } from "react-router-dom";
function HeroHome() {
  return (
    <section className="relative mb-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6  ">
        {/* Hero content */}
        <div className="pt-32 pb-16 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className=" pb-12 md:pb-16 mt-5">
            <h1
              className=" sm:text-2xl    md:text-6xl font-extrabold  tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Collect{" "}
              <span className="ml-2" style={{ color: "blue" }}>
                Chimera
              </span>
              <br />
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-9">
                  <p className="mt-3 ml-20 sm:ml-0 md:ml-0 ">
                    Digital Artworks
                  </p>
                </div>
              </div>
            </h1>
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-center">
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
                      <strong style={{ fontSize: "12px" }}>
                        START COLLECTING
                      </strong>
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
                      <strong style={{ fontSize: "12px" }}>
                        START COLLECTING
                      </strong>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
