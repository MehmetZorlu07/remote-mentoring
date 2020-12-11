import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import history from "../../history";

class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      information: "",
      type: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onInformationChange = (event) => {
    this.setState({ information: event.target.value });
  };

  onTypeChange = (event) => {
    this.setState({ type: event.target.value });
  };

  onSubmitRegister = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        information: this.state.information,
        type: this.state.type,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          this.props.loadUser(user);
          this.props.setLoginState(true);
          history.push("/");
        }
      });
  };

  render() {
    return (
      <Card style={{ width: "40rem" }}>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Name"
              onChange={this.onNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.onEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicInformation">
            <Form.Label>Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Information"
              onChange={this.onInformationChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              onChange={this.onTypeChange}
              defaultValue="researcher"
            >
              <option>researcher</option>
              <option>academic</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={this.onSubmitRegister}>
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Register;
