import { Typography, Box } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";

import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import { Link } from "react-router-dom";
import "../scss/footer.scss";

function Footer() {
  return (
    <Container className="container">
      <div className="root">
        <Box display="flex" justifyContent="center" height="3rem">
          <img
            src={require("../../images/other/logo-white.png").default}
            alt="logo"
          />
        </Box>
        <hr style={{ backgroundColor: "white" }} />
        <Box className="footer">
          <Typography>
            Nepa De Salon &copy;{new Date().getFullYear()}.
          </Typography>
          <ul>
            <li>
              <Link to="/" className="icon">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to="/" className="icon">
                <FaInstagram />
              </Link>
            </li>

            <li>
              <Link to="/" className="icon">
                <FaGoogle />
              </Link>
            </li>
            <li>
              <Link to="/" className="icon">
                <FiTwitter />
              </Link>
            </li>
          </ul>
        </Box>
      </div>
    </Container>
  );
}

export default Footer;
