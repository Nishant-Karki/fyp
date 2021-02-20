import React, { useState } from "react";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import useCustomForm from "../common/useCustomForm";

import PopUp from "../common/PopUp";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import axios from "axios";

const validationSchema = Yup.object().shape({
  username: Yup.string().optional(),
  dob: Yup.date().optional(),
  contact: Yup.number().min(10).optional(),
});
export default function EditDetails({ detailPopUp, setDetailPopUp }) {
  const [userId, setUserId] = useState(null);

  const { CustomTextField } = useCustomForm();

  const userData = useSelector((state) => state.login.userData);

  const submitHandler = (values) => {
    axios
      .post("/updateUser", { values: values, id: userId })
      .then((res) => console.log(res));
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
                initialValues={{ username: "", dob: "", contact: "" }}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                {({ touched, errors, handleChange }) => (
                  <Form>
                    <Grid container component="span" spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "1.2rem" }}
                          variant="body2"
                        >
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          label={item.name}
                          name="username"
                          type="text"
                          error={errors.username && touched.username}
                          onChange={handleChange}
                          errortext={errors.username}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "1.2rem" }}
                          variant="body2"
                        >
                          Email
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          style={{ marginTop: "1.2rem" }}
                          variant="body2"
                        >
                          {item.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "1.2rem" }}
                          variant="body2"
                        >
                          Birthday
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          label={item.dob}
                          name="dob"
                          type="text"
                          error={errors.username && touched.username}
                          onChange={handleChange}
                          errortext={errors.username}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          style={{ marginTop: "1.2rem" }}
                          variant="body2"
                        >
                          Contact
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <CustomTextField
                          variant="standard"
                          label={item.contact}
                          name="contact"
                          type="text"
                          error={errors.username && touched.username}
                          onChange={handleChange}
                          errortext={errors.username}
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
