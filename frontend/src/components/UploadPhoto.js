import React, { Component } from "react";
import { Image, Table, Form, Button, Spinner } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import axios from "axios";

class UploadPhoto extends Component {
  state = {
    selectedFile: null,
    description: "",
    show: false,
    in_progress: false
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  descriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  // close the toast
  closeToast = () => this.setState({ show: false });

  uploadHandler = () => {
    // construct post body
    let formData = new FormData();
    formData.append("image", this.state.selectedFile);
    formData.append("description", this.state.description);

    // let user know it is in progress
    this.setState({ in_progress: true });

    // calls backend
    axios.post("http://localhost:8000/api/images/", formData).then(result => {
      // uploaded and reset the form
      this.setState({
        selectedFile: null,
        description: "",
        show: true,
        in_progress: false
      });
    });
  };

  render() {
    return (
      <div
        className="mr-auto ml-auto"
        style={{ marginTop: "60px", width: "600px" }}
      >
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile02"
              onChange={this.fileChangedHandler}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile02">
              {this.state.selectedFile == null ? (
                <span>Choose file </span>
              ) : (
                <span>{this.state.selectedFile.name}</span>
              )}
            </label>
          </div>
          <div className="input-group-append">
            {this.state.in_progress === false ? (
              <Button variant="warning" onClick={this.uploadHandler}>
                Upload
              </Button>
            ) : (
              <Button variant="warning" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )}
          </div>
        </div>
        <Form className="mt-5">
          <Form.Group controlId="description">
            <Form.Label>Type your description</Form.Label>
            <Form.Control
              value={this.state.description}
              onChange={this.descriptionChange}
              as="textarea"
              rows="3"
            />
          </Form.Group>
        </Form>
        <Toast
          style={{
            position: "absolute",
            top: 0,
            right: 0
          }}
          show={this.state.show}
          onClose={this.closeToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Image</strong>
          </Toast.Header>
          <Toast.Body>Your image has been processed!</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default UploadPhoto;
