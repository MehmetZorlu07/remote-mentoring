import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId && data.success === "true") {
          this.saveAuthTokenInSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: data.token,
            },
          })
            .then((res) => res.json())
            .then((user) => {
              if (user && user.email) {
                this.props.loadUser(user);
                this.props.setLoginState(true);
                history.push("/");
              }
            })
            .catch(console.log);
        }
      });
  };

  resetPassword = () => {
    history.push("/reset");
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <Form>
            <div className="form__title">Signin</div>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.onEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.onPasswordChange}
              />
            </Form.Group>
            <div className="form__footer">
              <Button variant="link" onClick={this.resetPassword}>
                Forgot Password
              </Button>
              <Button variant="primary" onClick={this.onSubmitSignIn}>
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default Signin;
