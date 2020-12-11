import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      resetEmail: "",
      show: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ resetEmail: event.target.value });
  };

  onSubmitEmail = () => {
    fetch("http://localhost:3000/reset", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.resetEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.handleShow();
      });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  displayMessage = () => {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Password Reset</Modal.Title>
          </Modal.Header>
          <Modal.Body>We have sent you an email.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  render() {
    return (
      <div>
        <Card style={{ width: "40rem" }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter email address for password reset</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={this.onEmailChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.onSubmitEmail}>
              Send Email
            </Button>
          </Form>
        </Card>
        <this.displayMessage />
      </div>
    );
  }
}

export default Reset;
