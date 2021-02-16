import {
  Box,
  Container,
  Toolbar,
  Typography,
  Grid,
  Paper,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/Ecommerce/eStore-actions";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
  },
  paper: {
    marginTop: "2rem",
    maxHeight: "10rem",
  },
  deleteBtn: {},
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
  const [btnClick, setBtnClick] = useState(false);
  const cart = useSelector((state) => state.store.cart);
  const dispatch = useDispatch(removeFromCart());
  const [cartItem, setCartItem] = useState(cart);

  useEffect(() => {
    setCartItem(cart);
  }, [btnClick, cartItem]);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper>
        <Toolbar variant="dense">
          <Typography variant="body1">CART SUMMARY</Typography>
        </Toolbar>
      </Paper>
      {cartItem.length > 0 ? (
        cartItem.map((item) => (
          <Grid container spacing={3}>
            <Grid key={item.product_id} item xs={12} sm={8}>
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
                          require(`../../images/products/${item.image}`).default
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
                        removeFromCart(item.product_id);
                        setBtnClick(!btnClick);
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

            <Grid item xs={12} sm={4}>
              <Paper>
                <Box padding="1.2rem" marginTop="1.5rem">
                  <Typography variant="body2">Price : {}</Typography>
                  <Typography variant="body2">VAT : {}</Typography>
                  <br />
                  <Typography variant="body2">Total Amount: {}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ))
      ) : (
        <Paper className={classes.paper}>
          <Box padding="1rem" textAlign="center">
            <Typography variant="body2" style={{ color: "lightGrey" }}>
              No items in the cart.{" "}
              <Link className={classes.link} to="/store">
                VISIT STORE
              </Link>
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Cart;
