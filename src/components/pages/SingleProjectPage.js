import React from "react";
import Button from "react-bootstrap/Button";

class SingleProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      projectState: "",
    };
    this.getProject = this.getProject.bind(this);
  }

  componentDidMount() {
    let projectid = this.props.match.params.projectid;
    this.getProject(projectid.toString());
  }

  getProject = (projectid) => {
    fetch("http://localhost:3000/project/" + projectid)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ project: data });
        if (this.props.isSignedIn) {
          this.getState();
        }
      });
  };

  getState = () => {
    fetch("http://localhost:3000/researcherProjects", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.userid,
        projectid: this.state.project.projectid,
      }),
    })
      .then((response) => response.json())
      .then((researcherProject) => {
        return researcherProject.state;
      });
  };

  applyProject = () => {
    fetch("http://localhost:3000/applyProject", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.userid,
        projectid: this.state.project.projectid,
      }),
    })
      .then((response) => response.json())
      .then((researcherProject) => {
        if (researcherProject) {
          console.log("success");
        }
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.project.name}</h1>
        <p>
          {this.state.project.description} {this.state.project.academicID}
        </p>
        {this.props.usertype === "researcher" && this.getState !== "applied" && (
          <Button onClick={this.applyProject} variant="primary">
            Apply
          </Button>
        )}
      </div>
    );
  }
}

export default SingleProjectPage;
