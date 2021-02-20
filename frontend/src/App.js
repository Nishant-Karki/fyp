import React, { useEffect } from "react";

import "./app.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Admin from "./components/Admin/Admin";

import OrderPage from "./components/OrderPage";
import LoginPage from "./components/Login/LoginPage";
import Inventory from "./components/Inventory/Inventory";
import ShowItem from "./components/Inventory/ShowItem";

import SignUpPage from "./components/Login/SignUpPage";
import GoogleMap from "./components/GoogleMap";
import BingMap from "./components/BingMap";
import UserProfile from "./components/Profile/UserProfile";
import StaffProfile from "./components/Profile/StaffProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Inventory/Cart";

import { useSelector } from "react-redux";
import { useState } from "react";
import { isAuth } from "./redux/Login/login-actions";
import UserRoles from "./components/Admin/UserRoles";
import BookService from "./components/Booking/BookService";
import Payment from "./components/Payment/Payment";

function App() {
  const token = localStorage.getItem("token");
  // const [auth, setAuth] = useState();
  // useEffect(() => {
  //   setAuth(isAuth);
  // }, [isAuth]);
  const Routes = () => (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={Inventory} />
        <Route exact path="/roles" component={UserRoles} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/store/:id" component={ShowItem} />
        {/* <Route exact path="/map" component={} /> */}
        {/* <Route exact path="/user" component={UserProfile} /> */}
        <ProtectedRoute path="/staff" isAuth={token} component={StaffProfile} />

        {/* <ProtectedRoute path="/profile" component={UserProfile} isAuth={} /> */}
        {/* <Footer /> */}
        <Route exact path="/booking/:id" component={OrderPage} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/items" component={BookService} />
        <ProtectedRoute path="/user" isAuth={token} component={UserProfile} />
      </Switch>
    </div>
  );

  return (
    <>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <ProtectedRoute path="/admin" isAuth={token} component={Admin} />
        <ProtectedRoute path="/payment" isAuth={token} component={Payment} />
        <Routes /> {/* works inside switch only */}
      </Switch>
    </>
  );
}

export default App;
