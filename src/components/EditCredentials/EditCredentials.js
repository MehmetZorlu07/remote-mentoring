import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";

class EditCredentials extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  onOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value });
  };

  onNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  onConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  onSubmitPassword = () => {
    if (this.state.newPassword === this.state.confirmPassword) {
      fetch("http://localhost:3000/edit-credentials", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.props.user.email,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          history.push("/account");
        });
    } else {
      console.log("passwords don't match");
    }
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <Form>
            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>Enter your current password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current Password"
                onChange={this.onOldPasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicOldPassword">
              <Form.Label>Enter a new password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={this.onNewPasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm the new password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={this.onConfirmPasswordChange}
              />
            </Form.Group>
            <div className="form__footer">
              <Button variant="primary" onClick={this.onSubmitPassword}>
                Reset
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default EditCredentials;
