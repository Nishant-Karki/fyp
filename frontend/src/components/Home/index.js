import React from "react";
import About from "./About";
import OurServices from "./OurServices";
import OurTeam from "./OurTeam";
import ParallaxComp from "./ParallaxComp";
import ShortDetails from "./ShortDetails";
import ClientReview from "./ClientReview";
import Contact from "./Contact";

function index() {
  return (
    <>
      <ParallaxComp />
      <ShortDetails />
      <OurServices id="services" />
      <About />
      <ClientReview />
      <OurTeam />
      <Contact />
    </>
  );
}

export default index;
