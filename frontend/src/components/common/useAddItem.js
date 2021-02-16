import React, { useState } from "react";
import { Container, Button, Box, Grid } from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import ImageUploader from "../common/ImageUploader";

import PopUp from "../common/PopUp";
import axios from "axios";
import useCustomForm from "../common/useCustomForm";

export default function useAddItem() {
  const { CustomTextField } = useCustomForm();

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

  const ItemSalon = (props) => {
    const { postRoute, title } = props;
    const [openPopup, setOpenPopup] = useState(false);

    const onSubmit = (values) => {
      console.log(values);
      setOpenPopup(false);
      //to send image file and values to the backend
      let data = new FormData();

      data.append("name", values.name);
      data.append("description", values.description);
      data.append("price", values.price);
      data.append("image", values.image);
      console.log(data);
      console.log(postRoute);
      axios.post(`/${postRoute}`, data).then((res) => console.log(res));
    };
    return (
      <Container>
        <Button onClick={() => setOpenPopup(true)}>{title}</Button>
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
                      <Button
                      // onClick={() => setOpenPopup(false)}
                      >
                        Cancel
                      </Button>
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
  };

  return { ItemSalon };
}
