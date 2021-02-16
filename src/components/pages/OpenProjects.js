import React from "react";
import "./ProjectsPage.css";
import Project from "../Project/Project";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class OpenProjects extends React.Component {
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

  onSearchChange = (e) => {
    let text = e.target.value;
    this.setState({
      projects: this.state.allProjects.filter((project) => {
        return project.name.toLowerCase().includes(text.toLowerCase());
      }),
    });
  };

  getProjects = () => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/projects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ allProjects: data, projects: data });
      });
  };

  render() {
    const projectsList = [];
    for (const project of this.state.projects) {
      if (project.status === "open") {
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
    }

    return (
      <Container className="page">
        <h1 className="page__title">Open Projects</h1>
        <input
          placeholder="Search projects"
          onChange={this.onSearchChange}
          className="form-control project__search"
        />
        <Row>
          {projectsList.length ? (
            projectsList
          ) : (
            <Col xs={12}>No projects found</Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default OpenProjects;
