import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Invalid Email")
    .required("*Email is a required field"),
  password: yup.string().required("*Password is a required field"),
});

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: "",
      password: "",
    };
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignIn = () => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.emailAddress,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId && data.success === "true") {
          this.saveAuthTokenInSession(data.token);
          fetch(
            `https://fathomless-gorge-74945.herokuapp.com/profile/${data.userId}`,
            {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: data.token,
              },
            }
          )
            .then((res) => res.json())
            .then((user) => {
              if (user && user.email) {
                this.props.loadUser(user);
                this.props.setLoginState(true);
                history.push("/");
              }
            })
            .catch(console.log);
        } else {
          alert("Wrong Credentials.");
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
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.setState({
                emailAddress: values.emailAddress,
                password: values.password,
              });
              this.onSubmitSignIn();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => {
              return (
                <>
                  <Form>
                    <div className="form__title">Sign in</div>
                    <Form.Group controlId="emailAddress">
                      <Form.Label>Enter your e-mail address:</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="E-mail address"
                        name="emailAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.emailAddress && errors.emailAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.emailAddress}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Enter your password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                  <div className="form__footer">
                    <Button variant="link" onClick={this.resetPassword}>
                      Forgot Password
                    </Button>
                    <Button
                      className="custom-button"
                      onClick={() => handleSubmit()}
                    >
                      Sign in
                    </Button>
                  </div>
                </>
              );
            }}
          </Formik>
        </Card>
      </Container>
    );
  }
}

export default Signin;
