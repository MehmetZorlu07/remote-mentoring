import React from "react";
import "./ProjectsPage.css";
import Feedback from "../Feedback/Feedback";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class MyFeedbacks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
    };
    this.getResearcherFeedbacks = this.getResearcherFeedbacks.bind(this);
    this.getAcademicFeedbacks = this.getAcademicFeedbacks.bind(this);
  }

  componentDidMount() {
    if (this.props.user.type === "researcher") {
      this.getResearcherFeedbacks();
    } else {
      this.getAcademicFeedbacks();
    }
  }

  getResearcherFeedbacks = () => {
    fetch("http://localhost:3000/allResearcherReviews", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.user.id,
      }),
    })
      .then((response) => response.json())
      .then((feedbacksList) => {
        if (feedbacksList !== "not found") {
          this.setState({
            feedbacks: feedbacksList,
          });
        }
      });
  };

  getAcademicFeedbacks = () => {
    fetch("http://localhost:3000/allAcademicReviews", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        academicid: this.props.user.id,
      }),
    })
      .then((response) => response.json())
      .then((feedbacksList) => {
        if (feedbacksList !== "not found") {
          this.setState({
            feedbacks: feedbacksList,
          });
        }
      });
  };

  render() {
    const feedbacksList = [];
    for (const feedback of this.state.feedbacks) {
      if (this.props.user.type === "researcher") {
        feedbacksList.push(
          <Feedback
            rating={feedback.ratingbyacademic}
            comment={feedback.commentbyacademic}
          />
        );
      } else {
        feedbacksList.push(
          <Feedback
            rating={feedback.ratingbyresearcher}
            comment={feedback.commentbyresearcher}
          />
        );
      }
    }

    return (
      <Container className="page">
        <h1 className="page__title">My Feedbacks</h1>
        <Row>
          {feedbacksList.length ? (
            feedbacksList
          ) : (
            <Col xs={12}>No feedbacks found</Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default MyFeedbacks;
