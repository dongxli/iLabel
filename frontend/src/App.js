import React from "react";
import Header from "./components/Header";
import UploadPhoto from "./components/UploadPhoto";
import ListPhoto from "./components/ListPhoto";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.png";

function App() {
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
          <ListPhoto />
        </Route>
        <Route exact path="/upload">
          <UploadPhoto />
        </Route>
      </div>
    </Router>
  );
}

export default App;
