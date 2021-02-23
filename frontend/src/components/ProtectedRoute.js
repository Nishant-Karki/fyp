import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const role = useSelector((state) => state.login.role);

  const { isAuth: isAuth, permission, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          // if (permission === role) {
          // } else {
          //   <div>SHOW ERROR PAGE</div>;
          // }
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
