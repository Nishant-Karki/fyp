import React, { useState } from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import useCustomForm from "../common/useCustomForm";

import PopUp from "../common/PopUp";
import { Formik, Form } from "formik";

export default function EditDetails({ detailPopUp, setDetailPopUp }) {
  const { CustomTextField } = useCustomForm();

  return (
    <div>
      <PopUp
        title="Personal Details"
        openPopup={detailPopUp}
        setOpenPopup={setDetailPopUp}
      >
        <Box width="21rem">
          <Formik
            initialValues={{ username: "", dob: "", contact: "" }}
            validationSchema={{}}
            onSubmit={{}}
          >
            {({ touched, errors, handleChange }) => (
              <Form>
                <Grid container component="span" spacing={2}>
                  <Grid item xs={3}>
                    <Typography style={{ marginTop: "1.2rem" }} variant="body2">
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      variant="standard"
                      label="Name from db"
                      name="username"
                      type="text"
                      error={errors.username && touched.username}
                      onChange={handleChange}
                      errortext={errors.username}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{ marginTop: "1.2rem" }} variant="body2">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography style={{ marginTop: "1.2rem" }} variant="body2">
                      karkinishant14@gmail.com
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{ marginTop: "1.2rem" }} variant="body2">
                      Birthday
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      variant="standard"
                      label="Name from db"
                      name="dob"
                      type="text"
                      error={errors.username && touched.username}
                      onChange={handleChange}
                      errortext={errors.username}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{ marginTop: "1.2rem" }} variant="body2">
                      Contact
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextField
                      variant="standard"
                      label="Name from db"
                      name="contact"
                      type="text"
                      error={errors.username && touched.username}
                      onChange={handleChange}
                      errortext={errors.username}
                    />
                  </Grid>
                </Grid>
                <Box style={{ marginTop: "1.2rem" }}>
                  <Button>Save</Button>
                  <Button onClick={() => setDetailPopUp(false)}>Cancel</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </PopUp>
    </div>
  );
}
