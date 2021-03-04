import React from "react";
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
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function BookingCart() {
  const bookingCart = useSelector((state) => state.booking.bookingCart);
  console.log(bookingCart);
  return (
    <div style={{ marginTop: "10rem" }}>
      {bookingCart !== undefined && bookingCart.length > 0 ? (
        bookingCart.map((item) => (
          <Grid key={item.product_id} item xs={12} sm={8}>
            <Paper>
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
                        require(`../../images/services/${item.image}`).default
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
                  <Typography variant="body2">Quantity : {item.qty}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">
                    Total = {item.price * item.qty}
                  </Typography>
                  <Typography
                    type="button"
                    color="error"
                    variant="body2"
                    //   className={classes.deleteBtn}
                    //   onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                    <AiFillDelete style={{ marginLeft: "0.4rem" }} size={15} />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Paper>
            <Box padding="0.5rem" textAlign="center">
              <Typography variant="body2" style={{ color: "lightGrey" }}>
                No items in the cart.{" "}
                <Link
                  // lassName={classes.link}
                  to="/store"
                >
                  VISIT STORE
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      )}
      {bookingCart !== undefined && bookingCart.length > 0 && (
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box padding="1.2rem" marginTop="1.5rem">
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body2">Price : {}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">Price : {}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography align="left" variant="body2">
                    VAT
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  <Typography align="left" variant="body2">
                    13%
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Total Amount: {}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2"> sa{}</Typography>
                </Grid>
              </Grid>
              <Box marginTop="0.5rem" marginBottom="-0.4rem" textAlign="center">
                <Link
                  // className={classes.link}
                  to="/payment"
                >
                  <Button style={{ backgroundColor: "teal" }}>Checkout</Button>
                </Link>
              </Box>
            </Box>
          </Paper>
        </Grid>
      )}
    </div>
  );
}
