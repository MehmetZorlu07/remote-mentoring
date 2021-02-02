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
            <Card.Text>
              <div>{this.props.description}</div>
              <div>Minimum Requirements: {this.props.requirements}</div>
            </Card.Text>
            {!!(this.props.tags || []).length && (
              <div className="single-project__tags">
                <div className="tags">
                  {this.props.tags.map((tag, index) => {
                    return (
                      <div key={`tag-${index}`} className="tag">
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <Link to={`project/${this.props.projectid}`}>
              <Button className="custom-button">View Project</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Project;
