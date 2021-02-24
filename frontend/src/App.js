import React from "react";
import "./app.scss";
import { useSelector } from "react-redux";
import Routes from "./Routes/Routes";

function App() {
  const token = useSelector((state) => state.login.authToken);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
