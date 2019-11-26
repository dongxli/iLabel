import React, { Component } from "react";
import { Image, Table, Button } from "react-bootstrap";
import axios from "axios";

class UploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], empty: false };
  }

  deleteHandler = event => {
    console.log(event);
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/images").then(result => {
      if (result.status == 200) {
        this.setState({ list: result.data.images, empty: false });
      } else {
        this.setState({ empty: true });
      }
    });
  }

  render() {
    console.log(this.state.list);
    if (!this.state.list.length && !this.state.empty) return null;

    let list = this.state.list.map((el, i) => (
      <tr key={el[0]}>
        <td>{el[0]}</td>
        <td>{el[2]}</td>
        <td>{el[1]}</td>
        <td>
          <Button variant="danger" onClick={this.deleteHandler}>
            Delete
          </Button>
        </td>
      </tr>
    ));
    console.log(this.state.list);

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
