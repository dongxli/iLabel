import React from "react";
import Header from "./components/Header";
import UploadPhoto from "./components/UploadPhoto";
import ListPhoto from "./components/ListPhoto";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  const AUTH = localStorage.getItem("user") && localStorage.getItem("token");
  console.log(AUTH);

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Route exact path="/">
          <p style={{ marginTop: "100px", fontSize: "20px" }}>
            Welcome to Image Labels, you can upload your images to get auto
            generated labels for them!
          </p>
        </Route>
        <Route exact path="/images">
          {AUTH ? <ListPhoto /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/upload">
          {AUTH ? <UploadPhoto /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </div>
    </Router>
  );
}

export default App;
