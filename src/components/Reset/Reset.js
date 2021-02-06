import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Invalid Email")
    .required("*Email is a required field"),
});

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: "",
    };
  }

  onSubmitEmail = () => {
    fetch("http://localhost:3000/reset", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.emailAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("We have sent you an e-mail.");
      });
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
              });
              this.onSubmitEmail();
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
                    <Form.Group controlId="emailAddress">
                      <Form.Label>
                        Enter your email address for password reset:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        name="emailAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.emailAddress && errors.emailAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.emailAddress}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                  <div className="form__footer">
                    <Button
                      className="custom-button"
                      onClick={() => handleSubmit()}
                    >
                      Submit
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

export default Reset;
