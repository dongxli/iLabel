import React, { Component, Fragment } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import logo from "../logo.png";
import Axios from "axios";
import data from "../config.json";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  logout = event => {
    const TOKEN = localStorage.getItem("token");
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      }
    };
    Axios.post(data.backend_url + "/api/auth/logout", null, HEADERS).then(
      response => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.location.href = "/";
      }
    );
  };

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }
  render() {
    const LOGGED_IN = (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="/images">Images</Nav.Link>
          <Nav.Link href="/upload">Upload</Nav.Link>
        </Nav>
        <span className="ml-auto">
          <span className="mr-3">
            <strong style={{ color: "white" }}>
              {this.state.user ? `Welcome ${this.state.user.username}` : ""}
            </strong>
          </span>
          <Button size="sm" variant="warning" onClick={this.logout}>
            Log out
          </Button>
        </span>
      </Navbar.Collapse>
    );
    const LOGGED_OUT = (
      <Nav className="ml-auto">
        <Nav.Link href="/login">Sign in</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    );
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
            {this.state.user ? LOGGED_IN : LOGGED_OUT}
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

export default Header;
