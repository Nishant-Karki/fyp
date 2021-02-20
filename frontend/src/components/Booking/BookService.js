import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { useSelector, connect } from "react-redux";
import { fetchServices } from "../../redux/Booking/booking-actions";

function BookService({ services }) {
  const [products, setProducts] = useState([]);

  // const services = useSelector((state) => state.booking.services);
  console.log(services);

  useEffect(() => {
    fetchServices();
    // axios.get("/addServices").then((res) => console.log(res));
  }, []);
  return (
    <Container maxWidth="lg" style={{ marginTop: "10rem" }}>
      {/* <Box>
        <Grid container spacing={2}>
          {services.map((item) => (
            <Grid key={item.product_id} item xs={12} sm={6} md={3}>
              <Paper className="product-container">
                <Box className="image-container">
                  <img
                    src={require(`../../images/services/${item.image}`).default}
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
                    to={`/booking/${item.product_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    //   onClick={() => loadCurrentItem(item)}
                  >
                    <Button
                      style={{
                        marginBottom: "0.6rem",
                        backgroundColor: "teal",
                        marginTop: "0.3rem",
                        width: "9rem",
                      }}
                    >
                      <Typography variant="caption">BOOK NOW</Typography>
                    </Button>
                  </Link>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    services: state.booking.services,
  };
};
export default connect(mapStateToProps)(BookService);
