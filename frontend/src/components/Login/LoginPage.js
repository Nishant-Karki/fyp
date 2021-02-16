import {
  Typography,
  Box,
  Paper,
  makeStyles,
  Grid,
  Button,
  Checkbox,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import GLogin from "./GLogin";
import FLogin from "./FLogin";

import { Switch, Link, Route } from "react-router-dom";
import Inventory from "../Inventory/Inventory";
import OurServices from "../Home/OurServices";
import useCustomForm from "../common/useCustomForm";

import { useDispatch, useSelector } from "react-redux";
import { isAuth, isLoggedIn } from "../../redux/Login/login-actions";

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
  checkbox: {
    paddingLeft: "1rem",
    marginBottom: "0.3rem",
  },
});

axios.defaults.withCredentials = true;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Invalid Email!!"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
  loggedIn: false,
};

function LoginPage() {
  const classes = useStyles();

  const dispatch = useDispatch(isLoggedIn(), isAuth());

  const { CustomTextField } = useCustomForm();

  const onSubmit = (values) => {
    axios
      .post("/login", {
        values,
      })
      .then((response) => {
        if (response.data.auth === true) {
          isLoggedIn(true);
          localStorage.setItem("token", response.data.token);
        } else {
          isLoggedIn(false);
        }
      });
  };

  useEffect(() => {
    axios.get("/login").then((response) => {
      response.data.loggedIn === true && isLoggedIn(true);
    });
  }, []);

  const userAuthenticated = () => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post("/isUserAuth").then((response) => {
      isAuth(response.data.auth);
      console.log(response.data.auth);
    });
  };

  return (
    <Container className={classes.contactContainer}>
      <Typography variant="h4" align="center">
        WELCOME
      </Typography>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, touched, values, setFieldValue }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Your Email"
                      name="email"
                      type="email"
                      error={errors.email && touched.email}
                      onChange={handleChange}
                      errortext={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      label="Password"
                      name="password"
                      type="password"
                      error={errors.password && touched.password}
                      onChange={handleChange}
                      errortext={errors.password}
                    />
                  </Grid>
                  {/* <Box>
                    <Typography component="div">
                      <Checkbox
                        className={classes.checkbox}
                        color="default"
                        value={values.loggedIn}
                        onChange={(value) => setFieldValue("loggedIn", true)}
                      />
                      Keep me logged in.
                    </Typography>
                  </Box> */}
                </Grid>
                <Box textAlign="center">
                  <Button
                    type="submit"
                    size="large"
                    className={classes.submitBtn}
                    onClick={() => userAuthenticated()}
                  >
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <hr style={{ backgroundColor: "white" }} />
          <Box textAlign="center">
            <GLogin />
            {/* <FLogin /> */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
