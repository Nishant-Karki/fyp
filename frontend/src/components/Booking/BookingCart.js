import {
  Box,
  Container,
  Toolbar,
  Typography,
  Grid,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/Ecommerce/eStore-actions";
import { useEffect, useState } from "react";
import {
  deleteAppointment,
  handlePayment,
} from "../../redux/Booking/booking-actions";
import PopUp from "../common/PopUp";
import Payment from "../Payment/Payment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
    height: "60vh",
  },
  paper: {
    marginTop: "2rem",
    maxHeight: "10rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "grey",
      textDecoration: "none",
    },
  },
}));

function BookingCart() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.booking.bookingCart);

  // const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.login.userData);
  const [userId] = userData.map((item) => item.user_id);

  const newCart = cart.filter((item) => item.userId === userId);

  // let newCart = cart.filter((item) => item.userId === userId);
  // console.log(newCart);
  const [bookingCart, setBookingCart] = useState(newCart);
  let totalPrice;
  let withVAT;

  if (bookingCart?.length > 0) {
    let array = bookingCart.map((item) => item.price);
    totalPrice = array.reduce((a, b) => a + b);
    withVAT = totalPrice + Math.round(totalPrice * (13 / 100));
  }
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper>
        <Toolbar variant="dense">
          <Typography variant="body1">BOOKING SUMMARY</Typography>
        </Toolbar>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          {bookingCart && bookingCart?.length > 0 ? (
            bookingCart.map((item) => (
              <Grid container key={item.serviceId}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2} style={{ padding: "1rem" }}>
                    <Grid item xs={5}>
                      <Box
                        display="flex"
                        alignItems="center"
                        paddingLeft="0.5rem"
                        height="70px"
                        overflow="hidden"
                      >
                        <img
                          src={
                            require(`../../images/services/${item.image}`)
                              .default
                          }
                          alt="product"
                          width="100%"
                          height="100%"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2">Rs. {item.price}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Total = {item.price}
                      </Typography>
                      <Typography
                        type="button"
                        color="error"
                        variant="body2"
                        className={classes.deleteBtn}
                        onClick={() => {
                          dispatch(
                            deleteAppointment(item.serviceId, item.userId)
                          );
                          setBookingCart(
                            bookingCart.filter(
                              (filterItem) =>
                                filterItem.serviceId !== item.serviceId &&
                                filterItem !== item.serviceId
                            )
                          );
                        }}
                      >
                        Cancel
                        <AiFillDelete
                          style={{ marginLeft: "0.4rem" }}
                          size={15}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Box padding="0.5rem" textAlign="center">
                  <Typography variant="body2" style={{ color: "lightGrey" }}>
                    No items in the cart.{" "}
                    <Link className={classes.link} to="/booking">
                      BOOK APPOINTMENT
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
        {bookingCart && bookingCart.length > 0 && (
          <Grid item xs={12} sm={4} style={{ marginTop: "0.5rem" }}>
            <Paper>
              <Box padding="1.2rem" marginTop="1.5rem">
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="body2">Price :</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{totalPrice}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography align="left" variant="body2">
                      VAT
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="left" variant="body2">
                      13%
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">Total Amount: </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{withVAT}</Typography>
                  </Grid>
                </Grid>
                <Box
                  marginTop="0.5rem"
                  marginBottom="-0.4rem"
                  textAlign="center"
                >
                  <Link className={classes.link} to="/payment">
                    <Button style={{ backgroundColor: "teal" }}>
                      Checkout
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default BookingCart;
