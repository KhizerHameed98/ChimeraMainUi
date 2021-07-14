import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useLocation,
  NotFoundRoute,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import Web3 from "web3";
import "./css/style.scss";
import "./App.css";
import AOS from "aos";
import { focusHandling } from "cruip-js-toolkit";
import { useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Market from "./pages/Market";
import Activity from "./pages/Activity";
import SignIn from "./pages/SignIn";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import ArtWorkDetailed from "./pages/ArtWorkDetailed";
import CuratedBrands from "./pages/CuratedBrands";
import DetailedCurated from "./pages/detailedCurated";
import CreateDigitalArt from "./pages/CreateDigitalArt";
import CreatePhysicalArt from "./pages/CreatePhysicalArt";
import AcceptBidDetailed from "./pages/AcceptBidDetailed";
import UserDetail from "./pages/UserDetails";
import Profile from "./pages/Profile";
import config from "./config.js";

let web3;
let accounts;
function App() {
  const location = useLocation();
  let history = useHistory();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  async function metamaskConnection() {
    if (!window.ethereum) {
      await alert("metamask not installed!!!!");
      window.location.reload();
    } else {
      web3 = new Web3(window.ethereum);
      web3.eth.getAccounts(function (err, accounts) {
        if (err !== null) console.error("An error occurred: " + err);
        else if (
          accounts.length === 0 &&
          localStorage.getItem("walletAddress")
        ) {
          console.log("User is not logged in to MetaMask");
          localStorage.clear();
          history.push("/");
        } else console.log("User is logged in to MetaMask");
      });
      accounts = await web3.eth.getAccounts();
      web3.eth.net.getId().then((netId) => {
        if (netId != config.networkId) {
          localStorage.clear();
          history.push("/");
          alert("Please Select the correct network");
        }
      });

      if (
        localStorage.getItem("walletAddress") &&
        localStorage.getItem("walletAddress") != accounts
      ) {
        localStorage.clear();
        history.push("/");
      }
    }
  }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async function (accounts) {
        // document.location.reload();
        let acc = await web3.eth.getAccounts();
        console.log(acc);
        if (
          localStorage.getItem("walletAddress") &&
          localStorage.getItem("walletAddress") != acc
        ) {
          localStorage.clear();
          history.push("/signin");
        } else {
          window.location.reload();
        }
      });
      window.ethereum.on("networkChanged", function (networkId) {
        if (networkId != config.networkId) {
          console.log(networkId);
          localStorage.clear();
          alert("please Select the correct network");
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    }
  }, [window.ethereum]);

  useEffect(() => {
    metamaskConnection();

    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <>
      {localStorage.getItem("walletAddress") ? (
        <>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path={`/discover`}>
              <Discover />
            </Route>
            <Route path="/market">
              <Market />
            </Route>
            <Route path="/activity">
              <Activity />
            </Route>

            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/collection">
              <Collection />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/artworkdetailed/:id">
              <ArtWorkDetailed />
            </Route>
            <Route exact path="/acceptbiddetailed/:id">
              <AcceptBidDetailed />
            </Route>
            <Route path="/curated-brands">
              <CuratedBrands />
            </Route>
            {/* <Route path="/curated-detailed/:id"> */}
            <Route path="/curated-detailed">
              <DetailedCurated />
            </Route>
            <Route path="/create-digitalart">
              <CreateDigitalArt />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/user-detail/:id">
              <UserDetail />
            </Route>
            <Route path="/create-physicalart">
              <CreatePhysicalArt />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/market">
              <Market />
            </Route>
            <Route path="/activity">
              <Activity />
            </Route>

            <Route path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/artworkdetailed/:id">
              <ArtWorkDetailed />
            </Route>
            <Route path="/curated-brands">
              <CuratedBrands />
            </Route>
            <Route exact path="/user-detail/:id">
              <UserDetail />
            </Route>
            {/* <Route path="/curated-detailed/:id"> */}
            <Route path="/curated-detailed">
              <DetailedCurated />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
