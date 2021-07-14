import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import MainCuratedBrands from "../partials/CuratedBrands/MainCuratedBrands";
import "../css/curatedbrands.css";

function CuratedBrands() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1 className="font-extrabold text-black text-5xl" data-aos="zoom-y-out">
                CURATED BRANDS
              </h1>
            </div>
          </div>
        </div>
        <div>
          <MainCuratedBrands />
        </div>

        <Footer />
      </div>
    </>
  );
}
export default CuratedBrands;
