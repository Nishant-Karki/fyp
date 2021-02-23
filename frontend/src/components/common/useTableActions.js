import { Box, Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import PopUp from "./PopUp";

import axios from "axios";
import { Form, Formik } from "formik";
import useCustomForm from "./useCustomForm";
import ImageUploader from "./ImageUploader";
import { useDispatch } from "react-redux";
import { deleteService } from "../../redux/Booking/booking-actions";
import { deleteProduct } from "../../redux/Ecommerce/eStore-actions";

export default function useTableActions() {
  const { CustomTextField } = useCustomForm();

  const EditItem = (props) => {
    const { editPopUp, setEditPopUp, item, imagePath } = props;

    const onSubmit = (values) => {
      //to delete selected row
      console.log(values);
      // axios
      //   .post("./updateService", {
      //     service_id: item.service_id,
      //     values: values,
      //   })
      //   .then((res) => console.log(res));
    };
    return (
      <PopUp
        title="Edit Data"
        openPopup={editPopUp}
        setOpenPopup={setEditPopUp}
      >
        <Box width="26rem">
          <Formik
            initialValues={{
              name: item.name,
              price: item.price,
              description: item.description,
            }}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, values, setFieldValue }) => (
              <Form>
                <Grid container spacing={1} component="span">
                  <Grid item xs={4}>
                    <Typography>Name</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="name"
                      variant="standard"
                      value={values.name}
                      type="text"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="price"
                      variant="standard"
                      value={values.price}
                      type="number"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Description</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="description"
                      variant="standard"
                      multiline
                      value={values.description}
                      type="text"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageUploader
                      prevImageValue={`${imagePath}/${item.image}`}
                    />
                  </Grid>
                  <Typography variant="button" color="error">
                    Note : Provided Data will only be updated.
                  </Typography>
                  <Box display="flex" marginTop="1rem">
                    <Button type="submit">Save</Button>
                    <Button onClick={() => setEditPopUp(false)}>Cancel</Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </PopUp>
    );
  };

  const DeleteItem = (props) => {
    const { DeletePopUp, setDeletePopUp, item, route } = props;

    const dispatch = useDispatch();
    //to delete selected row
    const DeleteData = (item) => {
      setDeletePopUp(false);
      if (route === "deleteService") {
        dispatch(deleteService(item));
      } else {
        dispatch(deleteProduct(item));
      }
    };

    return (
      <PopUp
        title="Alert"
        openPopup={DeletePopUp}
        setOpenPopup={setDeletePopUp}
      >
        <Box width="20rem">
          <Typography>
            Deleting an item will remove all the records from our database.
          </Typography>

          <Box style={{ marginTop: "1rem" }}>
            <Button>
              <Typography color="error" onClick={() => DeleteData(item)}>
                Proceed
              </Typography>
            </Button>
            <Button>
              <Typography onClick={() => setDeletePopUp(false)}>
                Abort
              </Typography>
            </Button>
          </Box>
        </Box>
      </PopUp>
    );
  };

  return { DeleteItem, EditItem };
}
