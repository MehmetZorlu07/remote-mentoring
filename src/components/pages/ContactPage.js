import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

class ContactPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
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

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onSubmitForm = () => {
    if (this.state.isVerified) {
      fetch("http://localhost:3000/contact-page", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          description: this.state.description,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          alert("Thank you for getting touch with us!");
        });
    } else {
      alert("Please verify that you are a human.");
    }
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <div className="form__title">Contact Us</div>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Enter your name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={this.onNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter an e-mail address:</Form.Label>
              <Form.Control
                type="text"
                placeholder="E-mail address"
                onChange={this.onEmailChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Enter a message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                onChange={this.onDescriptionChange}
              />
            </Form.Group>
            <Recaptcha
              sitekey="6Lef8ysaAAAAAKgqpcxRCpPqvo-TeWFrJaAZmbqI"
              render="explicit"
              onloadCallback={this.recaptchaLoaded}
              verifyCallback={this.verifyCallback}
            />
            <div className="form__footer">
              <Button variant="primary" onClick={this.onSubmitForm}>
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default ContactPage;
