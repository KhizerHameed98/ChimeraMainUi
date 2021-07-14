import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { MDBInput, MDBCol } from "mdbreact";
import DiscoverMultiCarousel from "../partials/Discover/DicoverMultiCarousel";

function Discover() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1 className="font-extrabold text-5xl text-black">Dicover</h1>
            </div>
          </div>
        </div>
        <div>
          <DiscoverMultiCarousel />
        </div>

        <Footer />
      </div>
    </>
  );
}
export default Discover;
