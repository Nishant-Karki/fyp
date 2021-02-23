import React, { useState } from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import useCustomForm from "../common/useCustomForm";

import PopUp from "../common/PopUp";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
});
export default function EditDetails({
  detailPopUp,
  setDetailPopUp,
  setSnackType,
  setSnackbar,
  setResponse,
}) {
  const [userId, setUserId] = useState(null);

  const { CustomTextField, CustomDatePicker } = useCustomForm();

  const userData = useSelector((state) => state.login.userData);

  const submitHandler = (values) => {
    axios.post("/updateUser", { values: values, id: userId }).then((res) => {
      console.log(res.data.type);
      console.log(res.data.message);

      setDetailPopUp(false);
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
    });
  };

  return (
    <div>
      <PopUp
        title="Personal Details"
        openPopup={detailPopUp}
        setOpenPopup={setDetailPopUp}
      >
        {userData &&
          userData.length > 0 &&
          userData.map((item) => (
            <Box width="21rem" key={item.user_id}>
              <Formik
                initialValues={{
                  firstname: item.fname,
                  lastname: item.lname,
                  dob: item.dob,
                  contact: item.phone,
                }}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                {({ touched, errors, handleChange, values, setFieldValue }) => (
                  <Form>
                    <Grid container component="span" spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          Firstame
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          value={values.firstname}
                          name="firstname"
                          type="text"
                          error={errors.firstname && touched.firstname}
                          onChange={handleChange}
                          errortext={errors.firstname}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          Last Name
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          name="lastname"
                          type="text"
                          value={values.lastname}
                          error={errors.lastname && touched.lastname}
                          onChange={handleChange}
                          errortext={errors.lastname}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          Email
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          {item.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.5rem" }}
                          variant="body2"
                        >
                          Birthday
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomDatePicker
                          name="dob"
                          disableFuture
                          minDate={new Date("1950-01-01")}
                          value={values.dob}
                          onChange={(value) =>
                            setFieldValue(
                              "dob",
                              Moment(value).format("YYYY-MM-DD")
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "0.6rem" }}
                          variant="body2"
                        >
                          Contact
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          value={values.contact}
                          name="contact"
                          type="number"
                          error={errors.contact && touched.contact}
                          onChange={handleChange}
                          errortext={errors.contact}
                        />
                      </Grid>
                    </Grid>
                    <Box style={{ marginTop: "1.2rem" }}>
                      <Button
                        type="submit"
                        onClick={() => setUserId(item.user_id)}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setDetailPopUp(false)}>
                        Cancel
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          ))}
      </PopUp>
    </div>
  );
}
