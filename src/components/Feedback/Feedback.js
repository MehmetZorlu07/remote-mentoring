import React from "react";
import "../Project/Project.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { FaStar } from "react-icons/fa";

class Feedback extends React.Component {
  render() {
    return (
      <Col lg={4} md={6} xs={12}>
        <Card className="project-card">
          <Card.Body>
            <Card.Title>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <FaStar
                    className="star"
                    size={20}
                    color={
                      ratingValue <= this.props.rating ? "#ffc107" : "#e4e5e9"
                    }
                  />
                );
              })}
            </Card.Title>
            <Card.Text>
              <div>{this.props.comment}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Feedback;
