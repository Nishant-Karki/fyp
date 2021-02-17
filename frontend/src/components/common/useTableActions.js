import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import PopUp from "./PopUp";

import axios from "axios";
import { Form, Formik } from "formik";
import useCustomForm from "./useCustomForm";
import { Grid } from "@material-ui/core";
import ImageUploader from "./ImageUploader";

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
          <Formik initialValues={{ name: "" }} onSubmit={onSubmit}>
            {({ errors, handleChange, touched, setFieldValue }) => (
              <Form>
                <Grid container spacing={1} component="span">
                  <Grid item xs={4}>
                    <Typography>Name</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      name="name"
                      variant="standard"
                      placeholder={item.name}
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
                      placeholder={item.price}
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
                      placeholder={item.description}
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
    const { DeletePopUp, setDeletePopUp, item } = props;

    //to delete selected row
    const DeleteData = (item) => {
      setDeletePopUp(false);
      axios
        .post("/deleteService", { items: item })
        .then((res) => console.log(res));
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
