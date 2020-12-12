import React from "react";
import "./Project.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

class Project extends React.Component {
  render() {
    return (
      <Col lg={4} md={6} xs={12}>
        <Card className="project-card">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.props.academicID}
            </Card.Subtitle>
            <Card.Text>{this.props.description}</Card.Text>
            <Link to={`project/${this.props.projectid}`}>
              <Button variant="primary">View Project</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Project;
