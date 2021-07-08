import React from "react";
import Header from "../partials/Header";
import HeroHome from "../partials/Home/HeroHome";
import Footer from "../partials/Footer";
import HomeCarousel from "../partials/Home/HomeCarousel";
import HomeCollectArt from "../partials/Home/HomeCollectArt";
import HomeRecentActivity from "../partials/Home/HomeRecentActivity";
import HomeHowitWorks from "../partials/Home/HomeHowitWorks";
import HomeMarketMove from "../partials/Home/HomeMarketMove";


import "../css/Home.css";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}

      <Header />

      {/*  Page content */}
      <main className="flex-grow" style={{ backgroundColor: "#fef9f9" }}>
        {/*  Page sections */}
        <HeroHome />
      </main>
      <HomeCarousel />

      <HomeCollectArt />
      <HomeRecentActivity />
      <HomeHowitWorks />
      <HomeMarketMove />
      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;
