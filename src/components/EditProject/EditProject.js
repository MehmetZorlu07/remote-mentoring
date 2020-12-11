import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import history from "../../history";

class EditProject extends React.Component {
  constructor(props) {
    super();
    this.state = {
      project: {},
      title: "",
      description: "",
    };

    this.getProject = this.getProject.bind(this);
  }

  componentDidMount() {
    let projectid = this.props.match.params.projectid;
    this.getProject(projectid.toString());
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onApplyChanges = () => {
    fetch("http://localhost:3000/applyChanges", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.project.projectid,
        name: this.state.title,
        description: this.state.description,
      }),
    })
      .then((response) => response.json())
      .then((project) => {
        if (project) {
          history.push("/project/" + project.projectid);
        }
      });
  };

  getProject = (projectid) => {
    fetch("http://localhost:3000/edit-project/" + projectid)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ project: data });
        this.setState({ title: data.name });
        this.setState({ description: data.description });
      });
  };

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              defaultValue={this.state.project.name}
              onChange={this.onTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              defaultValue={this.state.project.description}
              onChange={this.onDescriptionChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={this.onApplyChanges}>
            Apply Changes
          </Button>
        </Form>
      </Container>
    );
  }
}

export default EditProject;
