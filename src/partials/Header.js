import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../css/header.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import logoChimera from "../images/logoChimera.png";
import * as Icons from "phosphor-react";
import Dropdown from "react-bootstrap/Dropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [top, setTop] = useState(true);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const SignOut = () => {
    localStorage.clear();
    history.push("/");
  };

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <Router>
      <header
        className={`fixed  px-4 w-full bg-white-500 z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top && " bg-red-100 blur shadow-lg"
        }`}
      >
        <Navbar expand="lg">
          <Navbar.Brand href="/">
            <img src={logoChimera} style={{ width: 130, marginTop: "2px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mt-2">
              <Nav.Link href="/discover">Discover</Nav.Link>
              {/* <Nav.Link href="/curated-brands">Curated Brands</Nav.Link> */}

              <Nav.Link href="/market">Market</Nav.Link>
              <Nav.Link href="/activity">Activity</Nav.Link>
              {localStorage.getItem("walletAddress") ? (
                <>
                  <Dropdown id="check">
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className=" md:px-0 lg:px-0 flex flex-row -mt-2 ">
                        <div>
                          {" "}
                          {/* <Icons.UserCircle
                            size={38}
                            color="black"
                            id="nav-avatar"
                          /> */}
                          <Avatar
                            id="nav-avatar"
                            style={{
                              width: "32px",
                              height: "32px",
                            }}
                            alt="Remy Sharp"
                            src={localStorage.getItem("avatar")}
                            className={classes.large}
                          />
                        </div>
                        <div>
                          <Icons.CaretDown
                            style={{ marginTop: "3px" }}
                            size={25}
                            color="black"
                          />
                        </div>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item href="/profile">Profile</Dropdown.Item> */}
                      <Dropdown.Item
                        href={`/user-detail/${localStorage.getItem("id")}`}
                      >
                        Profile
                      </Dropdown.Item>

                      <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                      <Dropdown.Item href="/collection">
                        Collection
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={SignOut}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Nav.Link href="/signin">SignIn</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </Router>
  );
}

export default Header;
