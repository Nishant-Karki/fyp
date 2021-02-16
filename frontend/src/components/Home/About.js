import { Grid, Box, Typography, Button } from "@material-ui/core";
import React from "react";

import { Container } from "react-bootstrap";

function About() {
  return (
    <Container style={{ marginTop: "10%", marginBottom: "10%" }}>
      <Grid container spacing={4} style={{ padding: "1rem" }}>
        <Grid item xs={12} md={6}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1517800249805-f3d51bd0b07f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1032&q=80"
              alt="about-us"
              width="100%"
              style={{ filter: "brightness(90%)" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" align="center">
              Who are We
            </Typography>
            <Typography variant="body1" align="center">
              Our salon is the territory created for men and women who
              appreciate high quality, impeccable service, and the perfect look.
            </Typography>
            <Typography variant="h6" align="center">
              Welcome to Nepa De Salon
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
