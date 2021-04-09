import React from "react";
import { Box, Paper, makeStyles, Grid, Button } from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import useCustomForm from "../common/useCustomForm";
import axios from "axios";

const useStyles = makeStyles({
  contactContainer: { marginTop: "10%", marginBottom: "10%" },

  box: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  submitBtn: {
    textAlign: "center",
    marginTop: "1.4rem",
  },
});

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.number().min(10).required("Number is required"),
  email: Yup.string().email().required("Email is required"),
  message: Yup.string().required("Feedbacks are appreciated"),
});

export default function ContactForm({
  subject,
  setResponse,
  setSnackbar,
  setSnackType,
  staff,
}) {
  const classes = useStyles();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };
  const { CustomTextField } = useCustomForm();

  const onSubmit = async (values) => {
    await axios
      .post("/contactForm", { values: values, subject: subject, staff: staff })
      .then((res) => {
        setResponse(res.data.message);
        setSnackType(res.data.type);
        setSnackbar(true);
      });
  };
  return (
    <div>
      <Box className={classes.box}>
        <Formik
          initialValues={initialValues}
          validationSchema={ContactSchema}
          onSubmit={onSubmit}
        >
          {({ errors, handleChange, touched, isValid, isSubmitting }) => (
            <Form autoComplete="off">
              <Grid container component="div" spacing={4}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Your Name"
                    name="name"
                    type="text"
                    error={errors.name && touched.name}
                    onChange={handleChange}
                    errortext={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Phone"
                    name="phone"
                    type="tel"
                    error={errors.phone && touched.phone}
                    errortext={errors.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Your E-mail"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    error={errors.email && touched.email}
                    errortext={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <CustomTextField
                    label="Message"
                    name="message"
                    type="text"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    error={errors.message && touched.message}
                    errortext={errors.message}
                  />
                </Grid>
              </Grid>
              <Box textAlign="center">
                <Button
                  type="submit"
                  size="large"
                  className={classes.submitBtn}
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
