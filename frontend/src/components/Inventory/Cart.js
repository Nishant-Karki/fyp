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
import { handleStorePayment } from "../../redux/Ecommerce/eStore-actions";

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

function Cart() {
  const classes = useStyles();

  const storeCart = useSelector((state) => state.store.cart);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.login.userData);
  const [userId] = userData.map((item) => item.user_id);

  const newCart = storeCart.filter((item) => item.userId === userId);

  const [click, setClick] = useState(false);

  useEffect(() => {
    setCart(newCart);
  }, [click]);
  // let newCart = cart.filter((item) => item.userId === userId);
  // console.log(newCart);
  const [cart, setCart] = useState(newCart);

  let totalPrice;
  let withVAT;

  if (cart?.length > 0) {
    let array = cart.map((item) => item.price * item.qty);
    totalPrice = array.reduce((a, b) => a + b);
    withVAT = totalPrice + Math.round(totalPrice * (13 / 100));
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper>
        <Toolbar variant="dense">
          <Typography variant="body1">CART SUMMARY</Typography>
        </Toolbar>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <Grid container key={item.product_id}>
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
                            require(`../../images/products/${item.image}`)
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
                      <Typography variant="body2">
                        Quantity : {item.qty}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Total = {item.price * item.qty}
                      </Typography>
                      <Typography
                        type="button"
                        color="error"
                        variant="body2"
                        className={classes.deleteBtn}
                        onClick={() => {
                          dispatch(removeFromCart(item.product_id));
                          setClick(!click);
                        }}
                      >
                        Remove
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
                    <Link className={classes.link} to="/store">
                      VISIT STORE
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
        {cart.length > 0 && (
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
                    {" "}
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
                    <Button
                      style={{ backgroundColor: "teal" }}
                      onClick={() => {
                        dispatch(handleStorePayment(cart));
                      }}
                    >
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

export default Cart;
