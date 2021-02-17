import React from "react";
import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "../scss/payment.scss";
import { Link } from "react-router-dom";
import useKhaltiCheckout from "./useKhaltiCheckout";

export default function Payment() {
  const { checkout } = useKhaltiCheckout();
  return (
    <Container maxWidth="md" style={{ marginTop: "9rem" }}>
      <Typography align="center" variant="h5">
        Choose your preferred payment method{" "}
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        style={{ marginTop: "3rem" }}
      >
        <Grid item xs={6}>
          <Link to="/">
            <Paper className="paper">
              <img
                src={require("../../images/other/cash-in-hand.png").default}
                alt="cash in hand"
                className="image-payment"
              />
            </Paper>
          </Link>
          <Typography align="center" variant="h6" className="text">
            Cash in Hand
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className="paper" onClick={() => checkout()}>
            <img
              src={require("../../images/other/online-payment.png").default}
              alt="online payment"
              className="image-payment"
            />
          </Paper>

          <Typography align="center" variant="h6" className="text">
            Online Payment
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
