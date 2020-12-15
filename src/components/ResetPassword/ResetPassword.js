import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      token: "",
    };
  }

  componentDidMount() {
    this.setState({ token: this.props.match.params.token });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  onSubmitPassword = () => {
    if (this.state.password === this.state.confirmPassword) {
      fetch("http://localhost:3000/reset-password/" + this.state.token, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          history.push("/sign-in");
        });
    } else {
      console.log("passwords dont match");
    }
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter a new password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={this.onPasswordChange}
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

export default ResetPassword;
