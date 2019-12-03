import React, { Component } from "react";
import { Form, Button, Alert, Toast } from "react-bootstrap";
import Axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      response_message: "",
      show_message: false,
      validated: false,
      show_toast: false,
      response_type: "danger"
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeToast = () => this.setState({ show_toast: false });

  onSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });

    // form is filled out
    if (form.checkValidity() === true) {
      console.log("XD");
      const BODY = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      };

      Axios.post("http://localhost:8000/api/auth/register", BODY).then(
        response => {
          // if user successfully logged in
          if (response.data.valid === true) {
            this.setState({ response_type: "success" });
            this.setState({ show_toast: true });
            this.setState({ show_message: true });
            this.setState({ response_message: response.data.response_message });

            // // redirect user to home page
            // document.location.href = "/login";
          } else {
            this.setState({ response_type: "danger" });
            this.setState({ response_message: response.data.response_message });
            this.setState({ show_message: true });
          }
        }
      );
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
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={this.onChange}
            value={this.state.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide an email
          </Form.Control.Feedback>
        </Form.Group>
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
          <Alert variant={this.state.response_type}>
            {this.state.response_message}
          </Alert>
        ) : (
          ""
        )}
        <Button variant="warning" type="submit">
          Register
        </Button>
      </Form>
    );
  }
}

export default Register;
