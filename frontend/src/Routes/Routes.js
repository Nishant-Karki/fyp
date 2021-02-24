import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginPage from "../components/Login/LoginPage";

import SignUpPage from "../components/Login/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";

import { useSelector } from "react-redux";

import Payment from "../components/Payment/Payment";
import RoutesWithNavbar from "./RoutesWithNavbar";
import Admin from "../components/Admin/Admin";
import UserRoles from "../components/Admin/UserRoles";
import ProductsTable from "../components/Admin/ProductsTable";
import ServicesTable from "../components/Admin/ServicesTable";

export default function Routes() {
  const token = useSelector((state) => state.login.authToken);

  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <ProtectedRoute
        path="/admin/userRole"
        isAuth={token}
        component={UserRoles}
      />
      <ProtectedRoute path="/payment" isAuth={token} component={Payment} />
      <ProtectedRoute
        path="/admin/product"
        isAuth={token}
        component={ServicesTable}
      />
      <ProtectedRoute path="/admin" isAuth={token} component={Admin} />
      <ProtectedRoute
        path="/admin/service"
        isAuth={token}
        component={ProductsTable}
      />

      <RoutesWithNavbar />
    </Switch>
  );
}
