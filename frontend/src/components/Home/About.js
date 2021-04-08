import { Grid, Box, Typography, Button } from "@material-ui/core";
import React from "react";

import { Container } from "react-bootstrap";

function About() {
  return (
    <Container style={{ marginTop: "12%", marginBottom: "12%" }}>
      <Grid container spacing={4} style={{ padding: "1rem" }}>
        <Grid item xs={12} md={6}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <img
              src={require(`../../images/other/logo.png`).default}
              alt="about-us"
              width="80%"
              style={{ filter: "brightness(90%)", marginLeft: "3rem" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box alignItems="center" display="flex">
            <div>
              <Typography variant="h4" align="center">
                Who are We
              </Typography>
              <br />
              <Typography variant="body1" align="center">
                Our salon is the territory created for men and women who
                appreciate high quality, impeccable service, and the perfect
                look.
              </Typography>
              <br />
              <Typography variant="h6" align="center">
                Welcome to Nepa De Salon
              </Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
