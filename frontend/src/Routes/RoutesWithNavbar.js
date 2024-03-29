import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home";
import Inventory from "../components/Inventory/Inventory";
import ShowItem from "../components/Inventory/ShowItem";

import UserProfile from "../components/Profile/UserProfile";
import StaffProfile from "../components/Profile/StaffProfile";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../components/Inventory/Cart";

import { useSelector } from "react-redux";
import UserRoles from "../components/Admin/UserRoles";
import BookService from "../components/Booking/BookService";
import OrderPage from "../components/Booking/OrderPage";
import BookingCart from "../components/Booking/BookingCart";
import { Typography } from "@material-ui/core";
import BookingHover from "../components/common/BookingHover";
import Footer from "../components/Footer/Footer";

export default function RoutesWithNavbar() {
  const token = useSelector((state) => state.login.authToken);

  return (
    <div>
      <Navbar />
      <BookingHover />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={Inventory} />
        <Route exact path="/roles" component={UserRoles} />
        <Route exact path="/store/:id" component={ShowItem} />
        {/* <Route exact path="/map" component={} /> */}
        {/* <Route exact path="/user" component={UserProfile} /> */}
        {/* <ProtectedRoute path="/staff" isAuth={token} component={StaffProfile} /> */}

        {/* <ProtectedRoute path="/profile" component={UserProfile} isAuth={} /> */}
        {/* <Footer /> */}
        <Route exact path="/booking/:id" component={OrderPage} />
        <Route exact path="/bookingCart" component={BookingCart} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/booking" component={BookService} />
        <ProtectedRoute path="/user" isAuth={token} component={UserProfile} />
      </Switch>
      <Footer />
    </div>
  );
}
