import React, { useState, useEffect } from "react";

//ui
import {
  Grid,
  Box,
  Typography,
  Button,
  makeStyles,
  Container,
  ListItem,
  Avatar,
  Paper,
  TextField,
} from "@material-ui/core";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchOrder } from "../../redux/Ecommerce/eStore-actions";
import { useHistory } from "react-router-dom";

import CustomToolbar from "../common/CustomToolbar";

//sass
import "../scss/showItem.scss";

import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const useStyles = makeStyles({
  container: { marginTop: "15%", marginBottom: "10%" },
  quantityBtn: {
    minWidth: "2rem",
  },
});

function ShowItem() {
  let history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const currentItem = useSelector((state) => state.store.currentItem);
  const { product_id, name, price, image, description } = currentItem;

  const userData = useSelector((state) => state.login.userData);
  const [userId] = userData.map((item) => item.user_id);

  const [count, setCount] = useState(1);
  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onSubmit = (product_id, count, userId) => {
    if (userData.length > 0) {
      dispatch(addToCart(product_id, count, userId));
    } else {
      history.push("/login");
    }
  };

  const [productFeedback, setProductFeedback] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchFeedback();
    fetchOrder();
    console.log(productFeedback);
  }, [trigger]);

  const fetchFeedback = async () => {
    await axios
      .get("/userProductReview")
      .then((res) => setProductFeedback(res.data.result));
  };

  const deleteFeedback = (id) => {
    axios.post("/deleteFeedback", { id: id });
    setProductFeedback(productFeedback.filter((value) => value.fed_id !== id));
    setTrigger(true);
  };

  const [feedback, setFeedback] = useState("");

  const onFeedbackSubmit = () => {
    console.log(userId);
    if (feedback?.length !== 0) {
      axios.post("/userReview", {
        feedback: feedback,
        userId: userId,
        type: "product",
        serviceId: product_id,
      });
      setFeedback("");
    }
    setTrigger(true);
    fetchFeedback();
    // setBookingFeedback([
    //   ...bookingFeedback,
    //   {
    //     feedback: feedback,
    //     user_id: userId,
    //     service_type: "booking",
    //     service_number: item.service_id,
    //   },
    // ]);
  };

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
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
                  onClick={() => onSubmit(product_id, count, userId)}
                  style={{
                    marginTop: "1.3rem",
                    backgroundColor: "teal",
                    width: "12rem",
                  }}
                >
                  <Typography color="teal" variant="body1">
                    ADD TO CART
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Container maxWidth="md">
          <Paper style={{ marginTop: "4rem" }}>
            <CustomToolbar variant="dense" title="Reviews and Feedback" />
            <Box>
              <ListItem>
                <Grid container style={{ marginLeft: "0.5rem" }}>
                  <Grid item xs={1} style={{ marginTop: 5 }}>
                    <Avatar style={{ height: 35, width: 35 }} />
                  </Grid>
                  <Grid item xs={11} style={{ marginLeft: "-1rem" }}>
                    <Grid container>
                      <Grid item xs={9}>
                        <TextField
                          fullWidth
                          onChange={(e) => setFeedback(e.target.value)}
                          color="secondary"
                          disabled={userData?.length > 0 ? false : true}
                          placeholder={
                            userData?.length > 0
                              ? "Any reviews or feedback?"
                              : "Login To Give Feedback"
                          }
                          value={feedback}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {userData?.length > 0 && (
                          <Button
                            onClick={onFeedbackSubmit}
                            style={{
                              backgroundColor: "teal",
                              width: "8rem",
                              marginLeft: "1rem",
                              height: "1.8rem",
                              marginTop: "0.2rem",
                            }}
                          >
                            Submit
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              {productFeedback
                .filter(
                  (filterItem) => filterItem.service_number === product_id
                )
                .map((item) => (
                  <ListItem key={item.fed_id}>
                    <Grid container style={{ marginLeft: "0.5rem" }}>
                      <Grid item xs={1} style={{ marginTop: 5 }}>
                        <Avatar style={{ height: 35, width: 35 }} />
                      </Grid>
                      <Grid item xs={10} style={{ marginLeft: "-1rem" }}>
                        <Typography
                          variant="subtitle2"
                          style={{ marginTop: "-0.1rem" }}
                        >
                          {item.client} {item.lastname}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ marginTop: "-0.2rem" }}
                        >
                          {item.feedback}
                        </Typography>
                      </Grid>
                      {item.user_id === userId && (
                        <Grid item xs={1}>
                          <Button onClick={() => deleteFeedback(item.fed_id)}>
                            <AiFillDelete color="red" />
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </ListItem>
                ))}
            </Box>
          </Paper>
        </Container>
      </Container>
    </>
  );
}

export default ShowItem;
