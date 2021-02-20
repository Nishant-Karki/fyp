import {
  Typography,
  Box,
  Paper,
  makeStyles,
  Grid,
  Button,
  Checkbox,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import GLogin from "./GLogin";
import FLogin from "./FLogin";

import { useHistory, Link } from "react-router-dom";
import Inventory from "../Inventory/Inventory";
import OurServices from "../Home/OurServices";
import useCustomForm from "../common/useCustomForm";

import { useDispatch, useSelector, connect } from "react-redux";
import { isLoggedIn, userData } from "../../redux/Login/login-actions";
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
  signIn: {
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
  let history = useHistory();
  const classes = useStyles();

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  // const dispatch = useDispatch(isLoggedIn(), userData());

  const { CustomTextField } = useCustomForm();

  const onSubmit = (values) => {
    axios
      .post("/login", {
        values,
      })
      .then((response) => {
        setResponse(response.data.message);
        setSnackType(response.data.type);
        if (response.data.auth === true) {
          isLoggedIn(true);
          userData(response.data.result);
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
      setTimeout(() => {
        response.data.auth && history.push("/");
      }, 1500);
      console.log(response);
    });
  };

  return (
    <Container className={classes.contactContainer}>
      <Typography variant="h4" align="center">
        WELCOME
      </Typography>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Link to="/signup" className={classes.link}>
            <Typography
              align="right"
              type="button"
              variant="body2"
              className={classes.signIn}
            >
              Create an account
            </Typography>
          </Link>
          {response && response.length > 0 && (
            <CustomSnackbar
              snackbarOpen={snackbar}
              setSnackbar={setSnackbar}
              snackType={snackType}
              snackContent={response}
            />
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
            enableReinitialize={false}
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
                    onClick={() => {
                      userAuthenticated();
                      setSnackbar(true);
                    }}
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

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (message) => dispatch(isLoggedIn(message)),
    userData: (message) => dispatch(userData(message)),
  };
};

export default connect(mapDispatchToProps)(LoginPage);
