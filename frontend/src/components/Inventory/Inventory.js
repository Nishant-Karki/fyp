import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "../scss/inventory.scss";
import {
  fetchProducts,
  loadCurrentItem,
} from "../../redux/Ecommerce/eStore-actions";

function Inventory({ products, fetchProducts, loadCurrentItem }) {
  // useEffect(() => {
  //   const response = async () => {
  //     console.log(records);
  //     await axios.get("/addProducts").then((res) => {
  //       setRecords(res.data.result);
  //       console.log(res.data.result);
  //     });
  //   };
  //   response();
  // }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "8rem" }}>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid
            key={item.product_id}
            item
            xs={12}
            sm={6}
            md={3}
            style={{ marginTop: "1.5rem" }}
          >
            <Paper className="product-container">
              <Box className="image-container">
                <img
                  src={require(`../../images/products/${item.image}`).default}
                  alt="product-img"
                  className="image"
                />
              </Box>
              <Box textAlign="center" marginTop="0.3rem">
                <Typography align="center" variant="body1">
                  {item.name}
                </Typography>
                <Typography align="center" variant="body1">
                  Rs. {item.price}
                </Typography>
                <Link
                  to={`/store/${item.product_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => loadCurrentItem(item)}
                >
                  <Button
                    style={{
                      marginBottom: "0.6rem",
                      backgroundColor: "green",
                      marginTop: "0.3rem",
                      width: "9rem",
                    }}
                  >
                    <Typography variant="caption">VIEW ITEM</Typography>
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.store.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(mapStateToProps, { loadCurrentItem, fetchProducts })(
  Inventory
);
