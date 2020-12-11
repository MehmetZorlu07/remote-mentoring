import React from "react";
import "./MyProjects.css";
import Project from "../Project/Project";

class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      ids: [],
    };
    this.getProjects = this.getProjects.bind(this);
    this.getAllResearcherProjects = this.getAllResearcherProjects.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: data });
        if (this.props.user.type === "researcher") {
          this.getAllResearcherProjects();
        }
      });
  };

  getAllResearcherProjects = () => {
    fetch("http://localhost:3000/allResearcherProjects", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.user.id,
      }),
    })
      .then((response) => response.json())
      .then((researcherProjects) => {
        this.setState({ ids: researcherProjects });
      });
  };

  render() {
    const projectsList = [];
    const idList = [];
    if (this.props.user.type === "researcher") {
      for (const projectID of this.state.ids) {
        idList.push(projectID.projectid);
      }
      for (const project of this.state.projects) {
        if (idList.includes(project.projectid)) {
          projectsList.push(
            <Project
              key={project.projectid}
              projectid={project.projectid}
              name={project.name}
              description={project.description}
              academicID={project.academicID}
            />
          );
        }
      }
    } else {
      for (const project of this.state.projects) {
        if (this.props.user.id === project.academicid) {
          projectsList.push(
            <Project
              key={project.projectid}
              projectid={project.projectid}
              name={project.name}
              description={project.description}
              academicID={project.academicID}
            />
          );
        }
      }
    }

    return <div className="grid-container">{projectsList}</div>;
  }
}

export default MyProjects;
