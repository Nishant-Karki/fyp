import {
  Typography,
  Box,
  Paper,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import useCustomForm from "../common/useCustomForm";

const useStyles = makeStyles({
  contactContainer: { marginTop: "10%", marginBottom: "10%" },
  paper: {
    width: "40rem",
    padding: "2.5rem",
  },
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

const onSubmit = (values) => {
  console.log(values);
};

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.number().min(10).max(13).required("Number is required"),
  email: Yup.string().email().required("Email is required"),
  message: Yup.string().required("Feedback is appreciated"),
});

const initialValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function Contact() {
  const classes = useStyles();

  const { CustomTextField } = useCustomForm();

  return (
    <>
      <div id="contact" style={{ marginBottom: "5rem" }}></div>

      {/* for smooth scrolling */}
      <div style={{ marginBottom: "5rem" }}></div>
      <Box>
        <Container className={classes.contactContainer}>
          <Typography variant="h4" align="center">
            GET IN TOUCH WITH US
          </Typography>
          <Box className={classes.box}>
            <Paper className={classes.paper}>
              <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={onSubmit}
              >
                {({ errors, handleChange, touched }) => (
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
                          name="message"
                          label="Your Message"
                          multiline
                          rows={4}
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
                      >
                        Submit
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Contact;
