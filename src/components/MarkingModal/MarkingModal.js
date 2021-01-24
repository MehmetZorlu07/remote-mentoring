import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaStar } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import "./MarkingModal.css";

class MarkingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      rating: null,
      comment: null,
    };
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  onRatingChange = (event) => {
    this.setState({ rating: parseInt(event.target.value) });
  };

  onCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  onSubmit = () => {
    fetch("http://localhost:3000/submit-researcher-rating", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.researcherId,
        projectid: this.props.projectId,
        rating: this.state.rating,
        comment: this.state.comment,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          this.handleClose();
          alert("Thank you for your feedback!");
        }
      });
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Rate Project
        </Button>

        <Container className="page">
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="account__label">Rate your experience</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicText">
                  <Form.Label className="account__label">Rating:</Form.Label>
                  <div className="account__value">
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <label>
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={this.onRatingChange}
                          />
                          <FaStar
                            className="star"
                            size={20}
                            color={
                              ratingValue <= this.state.rating
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicText">
                  <Form.Label className="account__label">Comment:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write a message..."
                    onChange={this.onCommentChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.onSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default MarkingModal;
