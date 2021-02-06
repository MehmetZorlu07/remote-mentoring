import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("*Name is a required field"),
  emailAddress: yup
    .string()
    .email("Invalid Email")
    .required("*Email is a required field"),
  description: yup.string().required("*Description is a required field"),
});

class ContactPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      emailAddress: "",
      description: "",
      isVerified: false,
    };
  }

  recaptchaLoaded = () => {
    console.log("captcha loaded");
  };

  verifyCallback = (response) => {
    if (response) {
      this.setState({ isVerified: true });
    }
  };

  onSubmitForm = () => {
    if (this.state.isVerified) {
      fetch("http://localhost:3000/contact-page", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.emailAddress,
          description: this.state.description,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          alert("Thank you for getting touch with us!");
        });
    } else {
      alert("Please verify that you are not a bot.");
    }
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <div className="form__title">Contact Us</div>
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.setState({
                name: values.name,
                emailAddress: values.emailAddress,
                description: values.description,
              });
              this.onSubmitForm();
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
                    <Form.Group controlId="name">
                      <Form.Label className="form__label">
                        Enter your name:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
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
                    <Form.Group controlId="description">
                      <Form.Label>Enter a message:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && errors.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Recaptcha
                      sitekey="6Lef8ysaAAAAAKgqpcxRCpPqvo-TeWFrJaAZmbqI"
                      render="explicit"
                      onloadCallback={this.recaptchaLoaded}
                      verifyCallback={this.verifyCallback}
                    />
                  </Form>
                  <div className="form__footer">
                    <Button
                      onClick={() => handleSubmit()}
                      className="custom-button"
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

export default ContactPage;
