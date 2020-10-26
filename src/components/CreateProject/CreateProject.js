import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CreateProject() {
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <div className="form-group">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea className="form-control" id="projectDescription" rows="5" />
        </div>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;
