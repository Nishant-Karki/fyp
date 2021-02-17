import React, { useState } from "react";

//ui
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

//redux
import { connect } from "react-redux";
import { addToCart } from "../../redux/Ecommerce/eStore-actions";

//sass
import "../scss/showItem.scss";

const useStyles = makeStyles({
  container: { marginTop: "15%", marginBottom: "10%" },
  quantityBtn: {
    minWidth: "2rem",
  },
});

function ShowItem({ addToCart, currentItem }) {
  const { product_id, name, price, image, description } = currentItem;
  const classes = useStyles();

  const [count, setCount] = useState(1);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <Navbar />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Box className="container-image">
              <img
                src={require(`../../images/products/${image}`).default}
                alt="item"
                className="image"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box>
              <Typography variant="h4" style={{ marginBottom: "0.7rem" }}>
                {name}
              </Typography>
              <Typography variant="body1">{description}</Typography>
              <Typography variant="h6" style={{ marginTop: "0.8rem" }}>
                Rs. {price}
              </Typography>
              <Box className="d-flex mt-3">
                <Button
                  className={classes.quantityBtn}
                  onClick={handleSubtract}
                >
                  -
                </Button>
                <Box className="quantity" textAlign="center">
                  <Typography className="mt-1" style={{ letterSpacing: 2 }}>
                    {count}
                  </Typography>
                </Box>
                <Button className={classes.quantityBtn} onClick={handleAdd}>
                  +
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => addToCart(product_id, count)}
                  style={{ marginTop: "1.3rem", marginLeft: "1.7rem" }}
                >
                  <Typography color="teal" variant="body1">
                    ADD TO CART
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.store.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, qty) => dispatch(addToCart(id, qty)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem);
