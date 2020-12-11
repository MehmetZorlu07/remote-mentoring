import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import history from "../../history";

class CreateProject extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      description: "",
    };
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onCreateProject = () => {
    fetch("http://localhost:3000/createProject", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.title,
        description: this.state.description,
        academicid: this.props.academicid,
      }),
    })
      .then((response) => response.json())
      .then((project) => {
        if (project) {
          history.push("/project/" + project.projectid);
        }
      });
  };

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              placeholder="Enter a title"
              onChange={this.onTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter a description"
              onChange={this.onDescriptionChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={this.onCreateProject}>
            Create Project
          </Button>
        </Form>
      </Container>
    );
  }
}

export default CreateProject;
