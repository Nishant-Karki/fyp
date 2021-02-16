import React from "react";
import "../scss/parallax.scss";

import { Parallax, Background } from "react-parallax";

import { Typography, Button, Box } from "@material-ui/core";

function ParallaxComp() {
  return (
    <>
      {/* for smooth scrolling */}
      <div id="/#"></div>

      <Parallax strength={600} className="d-none d-lg-block">
        <Background className="parallax">
          <img
            src="https://images.unsplash.com/photo-1541533848490-bc8115cd6522"
            style={{ filter: "brightness(55%)", marginLeft: "-0.5rem" }}
            width="135%"
            height="120%"
            alt="parallax-img"
          />
        </Background>
        <div className="text-container-parallax">
          <div style={{ textAlign: "center", marginBotton: "-4rem" }}>
            <Typography variant="h2">Make Time For Yourself</Typography>
            <Typography variant="h5">Get Glowing and Natural looks</Typography>
            <Button>BOOK APPOINTMENT</Button>
          </div>
        </div>
      </Parallax>
      <Box className="mini-image-container d-lg-none"></Box>
      <Box className="sm-text d-lg-none">
        <Box textAlign="center">
          <Typography variant="h4">Make Time For Yourself</Typography>
          <Typography variant="body2">Get Glowing and Natural looks</Typography>
          <Button>BOOK APPOINTMENT</Button>
        </Box>
      </Box>
    </>
  );
}

export default ParallaxComp;
