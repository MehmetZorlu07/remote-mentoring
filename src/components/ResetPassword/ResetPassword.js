import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  password: yup
    .string()
    .required("*Password is a required field")
    .min(6, "*Your password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("*Confirm password is a required field")
    .oneOf([yup.ref("password"), null], "*Passwords must match"),
});

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
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.setState({
                password: values.password,
                confirmPassword: values.confirmPassword,
              });
              this.onSubmitPassword();
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
                    <Form.Group controlId="password">
                      <Form.Label>Enter a new password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm the new password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                  <div className="form__footer">
                    <Button
                      className="custom-button"
                      onClick={() => handleSubmit()}
                    >
                      Reset
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

export default ResetPassword;
