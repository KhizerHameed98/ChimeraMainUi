import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "react-dropdown/style.css";
import MainProfile from "../partials/Profile/MainProfile";
function Profile() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-6xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
          </div>
        </div>
        <div>
          <MainProfile />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Profile;
