import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import MainDetailCurated from "../partials/detailCurated/mainDetailCurated";
import { withRouter } from "react-router-dom";
function DetailedCurated(props) {
  // const params = (props.match && props.match.params) || {};
  // console.log(params.id);
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <MainDetailCurated {...props} />
        <Footer />
      </div>
    </>
  );
}
export default withRouter(DetailedCurated);
