import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";

import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  authToken,
  isLoggedIn,
  userData,
} from "../../redux/Login/login-actions";

import { FaGoogle } from "react-icons/fa";
import axios from "axios";

function GLogin({ setResponse, setSnackType, setSnackbar }) {
  let history = useHistory();

  const dispatch = useDispatch();
  const successResponse = (response) => {
    const {
      givenName,
      familyName,
      email,
      googleId,
      imageUrl,
    } = response.profileObj;
    dispatch(authToken(response.tokenObj.access_token));
    axios
      .post("/social-login", {
        givenName,
        familyName,
        email,
        googleId,
        imageUrl,
      })
      .then((res) => {
        console.log(res);
        setResponse(res.data.message);
        setSnackType(res.data.type);
        setSnackbar(true);
        dispatch(userData(res.data.result));

        // setTimeout(() => {
        //   history.push("/");
        // }, 1500);

        // localStorage.setItem("token", response.tokenObj.access_token);
      });
  };

  const failureResponse = (res) => {
    setResponse("Failed to Login");
    setSnackType("info");
    setSnackbar(true);
  };

  return (
    <>
      <GoogleLogin
        clientId="1063695284455-cqvqm27presuv90l5ufd06jjo0ligt02.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button style={{ letterSpacing: 0.7 }} onClick={renderProps.onClick}>
            <FaGoogle
              size={18}
              style={{ marginRight: "1rem", marginTop: "0.1rem" }}
            />
            Continue with Google
          </Button>
        )}
        onSuccess={successResponse}
        onFailure={failureResponse}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     isLoggedIn: (message) => dispatch(isLoggedIn(message)),
//     userData: (message) => dispatch(userData(message)),
//   };
// };

export default GLogin;
