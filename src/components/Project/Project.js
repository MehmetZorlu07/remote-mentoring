import React from "react";
import "./Project.css";

class Project extends React.Component {
  render() {
    return (
      <div>
        <div className="card">
          <h2>{this.props.name}</h2>
          <p>{this.props.description}</p>
          <p>{this.props.academicID}</p>
          <p>Tags: Mathematics, Binomial</p>
        </div>
      </div>
    );
  }
}

export default Project;
