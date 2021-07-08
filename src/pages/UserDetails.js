import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "react-dropdown/style.css";
import { useHistory, useParams, withRouter } from "react-router-dom";

import MainUserDetail from "../partials/UserDetail/MainUserDetail";
function UserDetail() {
  const { id } = useParams();

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
          </div>
        </div>
        <div>
          <MainUserDetail id={id} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default withRouter(UserDetail);
