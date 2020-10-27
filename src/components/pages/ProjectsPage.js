import React from "react";
import "./ProjectsPage.css";
import Project from "../Project/Project";

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
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
        this.setState({ projects: data });
      });
  };

  render() {
    const projectsList = [];
    for (const project of this.state.projects) {
      projectsList.push(
        <Project
          key={project.id}
          name={project.name}
          description={project.description}
          academicID={project.academicID}
        />
      );
    }

    return <div className="container">{projectsList}</div>;
  }
}

export default ProjectsPage;
