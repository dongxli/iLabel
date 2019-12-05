import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";

class UploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], empty: false };
  }

  deleteHandler = event => {
    // console.log(event.target.value);
    const TOKEN = localStorage.getItem("token");
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      }
    };
    Axios.delete(
      `http://localhost:8000/api/images/${event.target.value}/`,
      HEADERS
    ).then(response => {
      // reload after it is deleted
      window.location.reload();
    });
  };

  componentDidMount() {
    const TOKEN = localStorage.getItem("token");
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      }
    };
    // get all the images under the user
    Axios.get("http://localhost:8000/api/images", HEADERS).then(result => {
      if (result.status === 200) {
        this.setState({ list: result.data.image_details, empty: false });
      } else {
        this.setState({ empty: true });
      }
    });
  }

  render() {
    if (
      this.state.list === undefined ||
      this.state.list.length === 0 ||
      this.state.empty === true
    )
      return null;

    let list = this.state.list.map((el, i) => (
      <tr key={el["id"]}>
        <td>
          <img
            alt="uploadedimage"
            src={el["url"]}
            width="60px"
            height="60px"
            style={{ margin: "0 auto" }}
          />
        </td>
        <td>{el["description"]}</td>
        <td>{el["labels"]}</td>
        <td>
          <Button
            variant="danger"
            onClick={this.deleteHandler}
            value={el["id"]}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className="mr-auto ml-auto mt-5" style={{ width: "80%" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Labels</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      </div>
    );
  }
}

export default UploadPhoto;
