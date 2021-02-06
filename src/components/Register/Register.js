import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("*Name is a required field"),
  emailAddress: yup
    .string()
    .email("Invalid Email")
    .required("*Email is a required field"),
  password: yup
    .string()
    .required("*Password is a required field")
    .min(6, "*Your password must be at least 6 characters"),
  information: yup.string().required("*Details is a required field"),
});

class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      emailAddress: "",
      password: "",
      name: "",
      information: "",
      type: "researcher",
    };
  }

  onSubmitRegister = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.emailAddress,
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
      <Container className="page">
        <Card className="form">
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.setState({
                name: values.name,
                emailAddress: values.emailAddress,
                password: values.password,
                information: values.information,
                type: values.type,
              });
              this.onSubmitRegister();
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
                    <div className="form__title">Register</div>
                    <Form.Group controlId="name">
                      <Form.Label>Enter your name:</Form.Label>
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
                    <Form.Group controlId="formBasicEmail">
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
                      <Form.Label>Enter a password:</Form.Label>
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

                    <Form.Group controlId="information">
                      <Form.Label>Tell us about yourself:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="information"
                        placeholder="Ex: I love solving Maths problems! "
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.information && errors.information}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.information}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="type">
                      <Form.Label>
                        Are you a researcher or an academic?
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="type"
                        defaultValue="researcher"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.type && errors.type}
                      >
                        <option>researcher</option>
                        <option>academic</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                  <div className="form__footer">
                    <Button
                      className="custom-button"
                      onClick={() => handleSubmit()}
                    >
                      Register
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

export default Register;
