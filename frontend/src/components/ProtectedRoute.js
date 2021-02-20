import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const {
    isAuth: isAuth,
    permission = "C",
    component: Component,
    ...rest
  } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
            // state to know from whereever you called this route
          );
        }
      }}
    />
  );
}
