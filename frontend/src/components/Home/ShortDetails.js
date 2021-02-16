import { makeStyles, Paper, Grid, Typography, Box } from "@material-ui/core";
import React from "react";

import { Container } from "react-bootstrap";

import { MdDone } from "react-icons/md";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    height: "auto",
  },
  hrow: {
    width: "2.1rem",
    marginTop: "0.4rem",
    border: "1px solid black",
    backgroundColor: "black",
  },
  // gridTop: {
  //   marginTop: "1rem",
  // },
});

function ShortDetails() {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.root}>
        <Grid container spacing={4} style={{ padding: "1.5rem 0 0 2.4rem" }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h6">OUR FEATURES</Typography>
              <hr className={classes.hrow} />
              {[
                "Online Salon Booking",
                "Qualitfied Staffs",
                "Buy Salon Products",
              ].map((item, index) => (
                <Typography key={index}>
                  <MdDone className="mr-1" />
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">OPENING HOURS</Typography>
            <hr className={classes.hrow} />
            <Grid container>
              <Grid item xs={6}>
                <Typography>Sunday:</Typography>
                <Typography>Saturday:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>8:00 - 20:00</Typography>
                <Typography>9:00 - 18:00</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.gridTop}>
            <Typography variant="h6">GET IN TOUCH</Typography>
            <hr className={classes.hrow} />
            <Grid container>
              <Grid item xs={6}>
                <Typography>Fax:</Typography>
                <Typography>Phone:</Typography>
                <Typography>Mobile:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>5522183</Typography>
                <Typography>5522183</Typography>

                <Typography>981246785</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3} className={classes.gridTop}>
            <Typography variant="h6">LOCATION</Typography>
            <hr className={classes.hrow} />
            <Typography>Jagati, Bhaktapur</Typography>
            <Typography>Jagati, Bhaktapur</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ShortDetails;
