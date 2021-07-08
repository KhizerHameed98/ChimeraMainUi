import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import MainSignIn from "../partials/SignIn/MainSignIn";
function SignIn() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />

        {/* Start */}

        <MainSignIn />
        <Footer />
      </div>
    </>
  );
}

export default SignIn;
