import React, { Component, Fragment } from "react";
import ListPhoto from "./ListPhoto";
import { Nav, Navbar, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UploadPhoto from "./UploadPhoto";
import logo from "../logo.png";

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {" iLabel"}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/images">Images</Nav.Link>
                <Nav.Link href="/upload">Upload</Nav.Link>
              </Nav>

              <Nav className="ml-auto">
                <Nav.Link href="#signin">Sign in</Nav.Link>
                <Nav.Link href="#link">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

export default Header;
