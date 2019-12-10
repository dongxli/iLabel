import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Axios from "axios";
import data from "../../config.json";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      response_message: "",
      show_message: false,
      validated: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });

    // form is filled out
    if (form.checkValidity() === true) {
      const BODY = {
        username: this.state.username,
        password: this.state.password
      };

      Axios.post(data.backend_url + "/api/auth/login", BODY).then(response => {
        // if user successfully logged in
        if (response.data.valid === true) {
          this.setState({ show_message: false });
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          // redirect user to home page
          document.location.href = "/";
        } else {
          this.setState({ response_message: response.data.response_message });
          this.setState({ show_message: true });
        }
      });
    }
  };

  render() {
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.onSubmit}
        style={{ width: "30%", margin: "30px auto 0 auto" }}
      >
        <Form.Group controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={this.onChange}
            value={this.state.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide an username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a password
          </Form.Control.Feedback>
        </Form.Group>
        {this.state.show_message ? (
          <Alert variant="danger">{this.state.response_message}</Alert>
        ) : (
          ""
        )}
        <Button variant="warning" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}

export default Login;
