import React from "react";
import { Button } from "@material-ui/core";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { FaFacebook } from "react-icons/fa";
import axios from "axios";

function FLogin() {
  const responseFacebook = (response) => {
    console.log(response);
    const { name, id } = response;
    axios.post("/social-login", { name: name, facebookId: id }, (result) => {
      console.log(result);
    });
  };
  return (
    <>
      <FacebookLogin
        appId="140934134127174"
        autoLoad
        callback={responseFacebook}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick}>
            <FaFacebook size={20} style={{ marginRight: "1rem" }} />
            Continue with Facebook
          </Button>
        )}
      />
    </>
  );
}

export default FLogin;
