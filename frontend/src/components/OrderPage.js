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

import image from "./girl.jpg";
import "./orderpage.scss";
import useCustomForm from "./common/useCustomForm";

import Autocomplete from "@material-ui/lab/Autocomplete";

function OrderPage() {
  const { CustomDatePicker, DropdownSelect, CustomDateTime } = useCustomForm();

  const [specialist, setSpecialist] = useState("");

  const SpecialistsAvailable = [
    { id: 1, name: "Luffy" },
    { id: 2, name: "Chopper" },
    { id: 3, name: "Nami" },
    { id: 4, name: "Zoro" },
    { id: 5, name: "Sanji" },
  ];

  return (
    <>
      <Container style={{ paddingTop: "4rem" }}>
        <Grid container spacing={4}>
          <Grid item sm={7} md={6}>
            <Box
              style={{
                borderRadius: "0.7rem",
                overflow: "hidden",
              }}
            >
              <img src={image} alt="container" width="100%" />
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
                Service Name
              </Typography>
              <Box className="product-info">
                <Box className="price">Rs. 120</Box>
                <Typography variant="subtitle2" className="price-subText">
                  Exclusive of taxes
                </Typography>
              </Box>
              <Box className="description">
                <Typography>lorem ipsum</Typography>
              </Box>

              <DropdownSelect
                specialist={specialist}
                setSpecialist={setSpecialist}
                values={SpecialistsAvailable}
              />
              <CustomDateTime
                name="date"
                label="Choose Date & Time"
                disablePast
              />

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
