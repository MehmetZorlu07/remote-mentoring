import React from "react";
import "./ProjectsPage.css";
import Project from "../Project/Project";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProjects: [],
      projects: [],
      search: "",
    };
    this.getProjects = this.getProjects.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ allProjects: data, projects: data });
      });
  };

  render() {
    const projectsList = [];
    for (const project of this.state.projects) {
      projectsList.push(
        <Project
          key={project.projectid}
          projectid={project.projectid}
          name={project.name}
          description={project.description}
          requirements={project.requirements}
          tags={project.tags}
        />
      );
    }

    var finalList = [];

    if (projectsList.length >= 3) {
      finalList = projectsList.slice(0, 3);
    }

    return (
      <Container className="page">
        <h1 className="page__title">
          Have you checked out these research projects?
        </h1>
        <Row>
          {finalList.length ? finalList : <Col xs={12}>No projects found</Col>}
        </Row>
      </Container>
    );
  }
}

export default ProjectsPage;
