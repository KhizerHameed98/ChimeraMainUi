import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "react-dropdown/style.css";
import { useLocation } from "react-router-dom";

import MainCollection from "../partials/Collection/MainCollection";

function Collection(props) {

  const location = useLocation();
  const [walletAccount, setWalletAccount]=useState("");
  useEffect(() => {
    if (location.pathname && location.state) {
      console.log(location.pathname);
      console.log(location.state.walletAccount);
      setWalletAccount(location.state.walletAccount);
    } else {
      console.log("no");
    }
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <MainCollection Account={walletAccount} />

        <Footer />
      </div>
    </>
  );
}
export default Collection;
