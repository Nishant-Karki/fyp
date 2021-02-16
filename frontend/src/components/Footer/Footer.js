import { Typography, Box } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";

import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import { Link } from "react-router-dom";
import "../scss/footer.scss";

function Footer() {
  return (
    <div className="root">
      <Container className="container">
        <Typography align="center">
          <img
            src={require("../../images/other/logo.png").default}
            alt="logo"
          />
        </Typography>
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
      </Container>
    </div>
  );
}

export default Footer;
