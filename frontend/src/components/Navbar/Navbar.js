import React, { useState, useEffect } from "react";

import {
  AppBar,
  Drawer,
  Box,
  Container,
  Grid,
  Typography,
  Badge,
} from "@material-ui/core";

import { HashLink as Link } from "react-router-hash-link";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosMenu } from "react-icons/io";

import { connect } from "react-redux";

import useWindowScrollPosition from "@rehooks/window-scroll-position";

import "../scss/navbar.scss";

function Navbar({ cart }) {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const changePosition = 80;

  //for showing navbar on slide
  let position = useWindowScrollPosition();

  if (position.y > changePosition && !change) {
    setChange(true);
  }
  if (position.y <= changePosition && change) {
    setChange(false);
  }

  const [cartCount, setCartCount] = useState(null);
  //hook to show number of item in cart
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => (count += item.qty));
    setCartCount(count);
  }, [cart, cartCount]);

  //style
  let appBarStyle = {
    backgroundColor: change ? "black" : "transparent",
    transition: "600ms ease",
    boxShadow: "none",
  };

  let navLinkStyle = {
    color: change ? "white" : "white",
    fontWeight: "bold",
    letterSpacing: "3px",
  };

  const handleDrawer = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const NavLink = ({ path, children }) => {
    return (
      <li>
        <Link className="link" smooth to={path}>
          <Typography style={navLinkStyle} variant="body1">
            {children}
          </Typography>
        </Link>
      </li>
    );
  };

  return (
    <>
      <AppBar sticky="true" style={appBarStyle}>
        <Container>
          <Grid container component="div" style={{ paddingTop: "1.3rem" }}>
            <Grid item xs={3} sm={2}>
              <Link to="/">
                <Box
                  height="3rem"
                  display="flex"
                  justifyContent="center"
                  marginTop="-0.8rem"
                  marginLeft="1.5rem"
                >
                  <img
                    src={require("../../images/other/logo-white.png").default}
                    alt="logo"
                  />
                </Box>
              </Link>
            </Grid>
            <Grid item xs={7} sm={8}>
              <ul className="nav-ul d-none  d-md-flex">
                <NavLink path="/#">HOME</NavLink>
                <NavLink path="/#services">SERVICES</NavLink>
                <NavLink path="/store">STORE</NavLink>
                <NavLink path="/#contact">CONTACT</NavLink>
              </ul>
            </Grid>
            <Grid item xs={2} sm={2} className="d-none d-sm-flex">
              <ul className="icons-ul ">
                <NavLink path="/user">
                  <HiOutlineUserCircle size={22} />
                </NavLink>
                <NavLink path="/cart">
                  <Badge color="error" badgeContent={cartCount}>
                    <AiOutlineShoppingCart size={22} />
                  </Badge>
                </NavLink>
              </ul>
            </Grid>
          </Grid>
          <IoIosMenu
            size={26}
            onClick={handleDrawer}
            style={{ marginTop: "-2.5rem" }}
            className="d-flex d-sm-none menu-icon"
          />
        </Container>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box style={{ width: "16.5rem" }}>
          <Container style={{ marginTop: "1rem" }}>
            <Typography variant="h6">
              <AiOutlineCloseCircle style={{ marginBottom: "0.3rem" }} /> Close
            </Typography>
            <hr
              style={{
                marginTop: "0.3rem",
                marginBottom: "0.5rem",
                backgroundColor: "white",
              }}
            />
            <ul className="drawer-navlinks">
              <li>
                <Link path="/#" className="drawer-links">
                  <Typography variant="body1">HOME</Typography>
                </Link>
              </li>
              <li>
                <Link path="/#services" className="drawer-links">
                  <Typography variant="body1">SERVICES</Typography>
                </Link>
              </li>
              <li>
                <Link path="/store" className="drawer-links">
                  <Typography variant="body1">STORE</Typography>
                </Link>
              </li>
              <li>
                <Link path="/#contact" className="drawer-links">
                  <Typography variant="body1">CONTACT</Typography>
                </Link>
              </li>
            </ul>
          </Container>
        </Box>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.store.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
