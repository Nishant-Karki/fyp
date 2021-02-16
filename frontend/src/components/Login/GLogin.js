import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";

import { FaGoogle } from "react-icons/fa";
import axios from "axios";

function GLogin() {
  const successResponse = (response) => {
    const { name, email, googleId } = response.profileObj;
    axios
      .post("/social-login", { name: name, email: email, googleId: googleId })
      .then((res) =>
        localStorage.setItem("token", response.tokenObj.access_token)
      );
    // (response) => {
    //   console.log(result);
    // }
    // );
  };

  const failureResponse = (response) => {
    console.log("Failed to login");
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

export default GLogin;
