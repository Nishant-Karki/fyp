import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { Container } from "react-bootstrap";

import useCards from "../common/useCards";

function OurTeam() {
  const { SliderCard } = useCards();
  return (
    <div>
      <Container style={{ marginTop: "8%", marginBottom: "13%" }}>
        <Typography variant="h4" align="center">
          OUR TEAM
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} sm={6} md={3}>
            <SliderCard
              name="Nezuko"
              position="Hair Stylist"
              description="Nothing"
              insta="/"
              fb="/"
              twitter="/"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default OurTeam;
