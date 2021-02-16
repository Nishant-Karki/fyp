import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "4rem",
  },
  gridContainer: {
    marginTop: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
      color: "grey",
    },
  },
}));

function OurServices() {
  const classes = useStyles();
  return (
    <>
      {/* for smooth scrolling */}
      <div id="services"></div>
      <Box>
        <Container className={classes.container}>
          <Box>
            <Typography variant="h4" align="center">
              SERVICE BEYOND EXPECTATION
            </Typography>
            <Grid container spacing={6} className={classes.gridContainer}>
              <Grid item xs={12} md={6}>
                <Link to="/items" className={classes.link}>
                  <Box textAlign="center">
                    <img
                      src={
                        require("../../images/other/booking-png.png").default
                      }
                      width="50%"
                      style={{ marginTop: "2.5rem" }}
                      alt="online-booking"
                    />
                    <Typography variant="h6" style={{ marginTop: "2.2rem" }}>
                      Book Appointment
                    </Typography>
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/store" className={classes.link}>
                  <Box textAlign="center">
                    <img
                      src={
                        require("../../images/other/cart-mobile.png").default
                      }
                      width="50%"
                      alt="online-shopping"
                    />

                    <Typography variant="h6" style={{ marginTop: "2rem" }}>
                      Online Shopping
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OurServices;
