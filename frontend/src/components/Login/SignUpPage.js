import {
  Typography,
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";

import React from "react";
import { Container } from "react-bootstrap";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "axios";
import useCustomForm from "../common/useCustomForm";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  contactContainer: { marginTop: "10%", marginBottom: "10%" },
  paper: {
    width: "33rem",
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
  radioButton: {
    paddingLeft: "1.4rem",
    marginTop: "0.7rem",
  },
  login: {
    marginTop: "-1rem",
    paddingBottom: "1rem",
    marginLeft: "18rem",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "inherit",
      textDecoration: "none",
    },
  },
});

const SignUpSchema = Yup.object().shape({
  fname: Yup.string().required("Required"),
  lname: Yup.string().required("Required"),
  email: Yup.string().email().required("Invalid Email!!"),
  password: Yup.string()
    .min(8, "Must have 8 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
  phone: Yup.number().min(10).required("Number is required"),
  dob: Yup.date().required("Date is required"),
});

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  phone: null,
  dob: null,
  gender: "",
};

function SignUpPage() {
  const classes = useStyles();

  const { CustomTextField, CustomDatePicker } = useCustomForm();

  const radioData = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("/register", {
        values,
      })
      .then((response) => console.log(response));
  };

  return (
    <Container className={classes.contactContainer}>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        JOIN US
      </Typography>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Link to="/login" className={classes.link}>
            <Typography
              align="right"
              type="button"
              variant="body2"
              className={classes.login}
            >
              Login Instead
            </Typography>
          </Link>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, touched, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={4} component="div">
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="First Name"
                      name="fname"
                      type="text"
                      error={errors.fname && touched.fname}
                      errortext={errors.fname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Last Name"
                      name="lname"
                      type="text"
                      error={errors.lname && touched.lname}
                      errortext={errors.lname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Your Email"
                      name="email"
                      type="email"
                      error={errors.email && touched.email}
                      errortext={errors.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {" "}
                    <CustomTextField
                      label="Password"
                      name="password"
                      type="password"
                      error={errors.password && touched.password}
                      errortext={errors.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Confirm"
                      name="passwordConfirmation"
                      type="password"
                      error={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                      }
                      errortext={errors.passwordConfirmation}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      label="Phone"
                      type="tel"
                      name="phone"
                      error={errors.phone && touched.phone}
                      errortext={errors.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <CustomDatePicker
                        label="Date of Birth"
                        name="dob"
                        disableFuture
                        minDate={new Date("1950-01-01")}
                        value={values.dob}
                        setFieldValue={setFieldValue}
                        error={errors.dob && touched.dob}
                        onChange={(value) =>
                          setFieldValue(
                            "dob",
                            new Date(value).toLocaleDateString()
                          )
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} className={classes.radioButton}>
                    <FormControl component="fieldset">
                      <FormLabel color="secondary" component="legend">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        label="gender"
                        name="gender"
                        onChange={(e) =>
                          setFieldValue("gender", e.target.value)
                        }
                      >
                        <Box display="flex">
                          {radioData.map((radio) => (
                            <FormControlLabel
                              key={radio.value}
                              value={radio.value}
                              control={<Radio size="small" />}
                              label={radio.label}
                            />
                          ))}
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Button
                    type="submit"
                    size="large"
                    className={classes.submitBtn}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
}

export default SignUpPage;
