import React from "react";

class SingleProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
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
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.project.name}</h1>
        <p>
          {this.state.project.description} {this.state.project.academicID}
        </p>
      </div>
    );
  }
}

export default SingleProjectPage;
