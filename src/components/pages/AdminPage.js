import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./AccountPage.css";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProjects: [],
      academics: 0,
      researchers: 0,
    };
    this.getProjects = this.getProjects.bind(this);
    this.getAcademics = this.getAcademics.bind(this);
    this.getResearchers = this.getResearchers.bind(this);
  }

  componentDidMount() {
    this.getProjects();
    this.getAcademics();
    this.getResearchers();
  }

  getProjects = () => {
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ allProjects: data });
      });
  };

  getAcademics = () => {
    fetch("http://localhost:3000/academics")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ academics: data });
      });
  };

  getResearchers = () => {
    fetch("http://localhost:3000/researchers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ researchers: data });
      });
  };

  render() {
    return (
      <Container className="page">
        <Card className="account">
          <div className="page__title">Application Statistics</div>
          <div className="account__label">Admin: </div>
          <div className="account__value">{this.props.user.name}</div>
          <div className="account__label">Number of Projects: </div>
          <div className="account__value">{this.state.allProjects.length}</div>
          <div className="account__label">Number of Academics: </div>
          <div className="account__value">{this.state.academics}</div>
          <div className="account__label">Number of Researchers: </div>
          <div className="account__value">{this.state.researchers}</div>
        </Card>
      </Container>
    );
  }
}

export default AdminPage;
