import React, { useEffect, useState } from "react";
import { Container, Button, Box, Grid } from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import ImageUploader from "./ImageUploader";

import PopUp from "./PopUp";
import axios from "axios";
import useCustomForm from "./useCustomForm";
import { addService, fetchServices } from "../../redux/Booking/booking-actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/Ecommerce/eStore-actions";

export default function AddItem(props) {
  const { postRoute, title, setRecords, setIsLoading } = props;
  const { CustomTextField } = useCustomForm();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);

  const services = useSelector((state) => state.booking.services);
  const products = useSelector((state) => state.booking.products);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    description: Yup.string().required("Description is required!"),
    price: Yup.number().required("Price is required"),
  });

  const initialValues = {
    name: "",
    description: "",
    price: "",
    image: null,
  };

  const onSubmit = (values) => {
    setOpenPopup(false);
    //to send image file and values to the backend
    let data = new FormData();
    console.log(values.image);
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("image", values.image);

    setIsLoading(true);
    axios.post(`/${postRoute}`, data).then((res) => {
      if (postRoute === "addServices") {
        // dispatch(addService());
        setTimeout(() => {
          axios.get("/addServices").then((res) => setRecords(res.data.result));
          // dispatch(fetchServices());
          setIsLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          axios.get("/addProducts").then((res) => setRecords(res.data.result));
          // dispatch(fetchProducts());
          setIsLoading(false);
        }, 2000);
      }
    });
  };
  return (
    <Container>
      <Button
        onClick={() => setOpenPopup(true)}
        style={{
          backgroundColor: "teal",
          marginBottom: "1rem",
          width: "13rem",
        }}
      >
        {title}
      </Button>
      <PopUp title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Formik
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={onSubmit}
        >
          {({ errors, handleChange, touched, setFieldValue }) => (
            <Form>
              <Grid container spacing={2} component="div">
                <Grid item xs={12} md={6}>
                  <ImageUploader setFieldValue={setFieldValue} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid
                    container
                    component="div"
                    spacing={2}
                    style={{ padding: "1rem" }}
                  >
                    <Grid item xs={12}>
                      <CustomTextField
                        label="Name"
                        name="name"
                        type="text"
                        error={errors.name && touched.name}
                        onChange={handleChange}
                        errortext={errors.name}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomTextField
                        label="Price"
                        name="price"
                        type="number"
                        error={errors.price && touched.price}
                        onChange={handleChange}
                        errortext={errors.price}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        label="Description"
                        name="description"
                        id="description"
                        multiline
                        rows={5}
                        error={errors.description && touched.description}
                        onChange={handleChange}
                        errortext={errors.description}
                      />
                    </Grid>
                  </Grid>
                  <Box style={{ float: "right" }}>
                    <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
                    <Button type="submit">Add</Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </PopUp>
    </Container>
  );
}
