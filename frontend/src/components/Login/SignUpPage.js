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

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Moment from "moment";

import axios from "axios";
import useCustomForm from "../common/useCustomForm";
import { Link, useHistory } from "react-router-dom";
import CustomSnackbar from "../common/CustomSnackbar";

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

  let history = useHistory();
  const { CustomTextField, CustomDatePicker } = useCustomForm();

  const token = useSelector((state) => state.login.authToken);

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  const radioData = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    if (token != null) {
      setSnackbar(true);
      setResponse("Already logged in");
      setSnackType("warning");

      setTimeout(() => {
        history.push("/");
      }, 1500);
    }
  }, []);

  const onSubmit = (values) => {
    axios
      .post("/register", {
        values,
      })
      .then((response) => {
        setResponse(response.data.message);
        setSnackType(response.data.type);

        setTimeout(() => {
          response.data.type === "success" && history.push("/login");
        }, 1500);
      });
  };

  return (
    <Container className={classes.contactContainer}>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
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
                        inputVariant="outlined"
                        onChange={(value) =>
                          setFieldValue(
                            "dob",
                            Moment(value).format("YYYY-MM-DD")
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
                    onClick={() => setSnackbar(true)}
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
