import { Box, Grid, Typography, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import PopUp from "./PopUp";

import { Form, Formik } from "formik";
import useCustomForm from "./useCustomForm";
import ImageUploader from "./ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  fetchServices,
  updateService,
} from "../../redux/Booking/booking-actions";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../redux/Ecommerce/eStore-actions";
import axios from "axios";

export default function useTableActions() {
  const { CustomTextField } = useCustomForm();
  const dispatch = useDispatch();
  // const updatedService = useSelector((state) => state.booking.services);
  const updatedProduct = useSelector((state) => state.store.products);

  const EditItem = (props) => {
    const {
      editPopUp,
      setEditPopUp,
      item,
      imagePath,
      route,
      setRecords,
      setIsLoading,
    } = props;

    const onSubmit = async (values) => {
      setIsLoading(true);
      // console.log(values.image);
      console.log(item);
      // let image_value = values.image === null ? "old" : values.image;
      // let data = new FormData();
      // data.append("name", values.name);
      // data.append("price", values.price);
      // data.append("description", values.description);
      // data.append("id", item.service_id);
      // data.append("image", image_value);

      if (route === "updateService") {
        // axios.post("/updateService", data);
        // setRecords(updatedService);
        // .then((res) => dispatch(updateService()));
        dispatch(updateService(values, item.service_id));
        await axios.get("/addServices").then((res) => {
          setRecords(res.data.result);
        });
        setTimeout(() => {
          setIsLoading(false);

          // setRecords(dispatch(fetchServices()));
          //  setRecords(updatedService);
        }, 2000);
        setEditPopUp(false);
      } else {
        // axios.post("/updateProduct", data);
        console.log("there");

        dispatch(updateProduct(values, item.product_id));
        await axios
          .get("/addProducts")
          .then((res) => setRecords(res.data.result));

        setTimeout(() => {
          setIsLoading(false);
          //  setRecords(updatedService);
        }, 2000);
        setEditPopUp(false);

        // setRecords(updatedProduct);
      }
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
              // image: null,
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
                    <img
                      src={
                        require(`../../images/${imagePath}/${item.image}`)
                          .default
                      }
                      width="300rem"
                      style={{ padding: "2rem", marginLeft: "3.5rem" }}
                      alt="preview"
                    />
                    {/* <ImageUploader
                      setFieldValue={setFieldValue}
                    /> */}
                  </Grid>
                  <Box display="flex">
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
    const {
      DeletePopUp,
      setDeletePopUp,
      item,
      route,
      setRecords,
      setIsLoading,
    } = props;

    //to delete selected row
    const DeleteData = (item) => {
      setDeletePopUp(false);
      setIsLoading(true);
      if (route === "deleteService") {
        dispatch(deleteService(item));
        axios.get("/addServices").then((res) => setRecords(res.data.result));
        setTimeout(() => {
          setIsLoading(false);
          //  setRecords(updatedService);
        }, 1500);
        // dispatch(fetchServices());
      } else {
        dispatch(deleteProduct(item));
        axios.get("/addProducts").then((res) => setRecords(res.data.result));
        setRecords(updatedProduct);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        // setRecords(updatedProduct);
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
