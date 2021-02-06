import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  oldPassword: yup.string().required("*Current password is a required field"),
  newPassword: yup
    .string()
    .required("*New password is a required field")
    .min(6, "*Your password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("*Confirm password is a required field")
    .oneOf([yup.ref("newPassword"), null], "*Passwords must match"),
});

class EditCredentials extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  onSubmitPassword = () => {
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
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <div className="form__title">Reset Password</div>
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.setState({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
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
                    <Form.Group controlId="oldPassword">
                      <Form.Label>Enter your current password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Current Password"
                        name="oldPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.oldPassword && errors.oldPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.oldPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                      <Form.Label>Enter a new password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        name="newPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.newPassword && errors.newPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword}
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

export default EditCredentials;
