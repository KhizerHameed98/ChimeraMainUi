import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "react-dropdown/style.css";
import MainMarket from "../partials/Market/MainMarket";

function Market() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-6xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1
                className="font-extrabold text-5xl text-black"
                data-aos="zoom-y-out"
              >
                Market
              </h1>
            </div>
          </div>
        </div>
        <MainMarket />

        <Footer />
      </div>
    </>
  );
}
export default Market;
