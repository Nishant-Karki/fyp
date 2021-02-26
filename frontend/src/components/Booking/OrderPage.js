import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

import { FaCheckCircle } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";

import "../scss/orderpage.scss";
import useCustomForm from "../common/useCustomForm";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
import { MenuItem } from "@material-ui/core";

function OrderPage() {
  const { CustomDatePicker, DropdownSelect, CustomDateTime } = useCustomForm();

  const item = useSelector((state) => state.booking.currentItem);

  const [specialist, setSpecialist] = useState("");

  const SpecialistsAvailable = [
    { id: 1, name: "Luffy" },
    { id: 2, name: "Chopper" },
    { id: 3, name: "Nami" },
    { id: 4, name: "Zoro" },
    { id: 5, name: "Sanji" },
  ];
  const TimeAvailable = [
    { id: 1, name: "8-9" },
    { id: 2, name: "9-10" },
    { id: 3, name: "10-11" },
    { id: 4, name: "11-12" },
    { id: 5, name: "12-13" },
  ];

  return (
    <>
      <Container style={{ paddingTop: "8rem" }}>
        <Grid container spacing={4}>
          <Grid item sm={7} md={6}>
            <Box
              style={{
                borderRadius: "0.7rem",
                overflow: "hidden",
              }}
            >
              <img
                src={require(`../../images/services/${item.image}`).default}
                alt="container"
                className="itemImage"
              />
            </Box>
            <Box className="image-subText">
              <Typography>
                <FaCheckCircle className="icons" />
                100% Customer Satisfaction
              </Typography>
              <Typography>
                <FaCheckCircle className="icons" />
                Cancel Appointment Anytime
              </Typography>
              <Typography>
                <SiCashapp className="icons" />
                Payment method of your choice
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={5} md={6}>
            <Box>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {item.name}
              </Typography>
              <Box className="product-info">
                <Box className="price">Rs. {item.price}</Box>
                <Typography variant="subtitle2" className="price-subText">
                  Exclusive of taxes
                </Typography>
              </Box>
              <Box className="description">
                <Typography>{item.description}</Typography>
              </Box>

              <select
                style={{
                  backgroundColor: "#424242",
                  border: "none",
                  color: "white",
                  width: "10rem",
                  height: "2rem",
                  borderRadius: "0.4rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {SpecialistsAvailable.map((item) => (
                  <option style={{ color: "white", border: "none" }}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                style={{
                  backgroundColor: "#424242",
                  border: "none",
                  color: "white",
                  width: "10rem",
                  height: "2rem",
                  borderRadius: "0.4rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {TimeAvailable.map((item) => (
                  <option style={{ color: "white", border: "none" }}>
                    {item.name}
                  </option>
                ))}
              </select>

              <Button
                style={{
                  backgroundColor: "teal",
                  color: "white",
                  width: "14rem",
                  padding: "0.6rem",
                  borderRadius: "0.7rem",
                  margin: "0.5rem",
                }}
              >
                Book Appointment
              </Button>
              <Typography></Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default OrderPage;
