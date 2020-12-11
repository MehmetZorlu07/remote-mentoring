import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class AccountPage extends React.Component {
  render() {
    return (
      <Container>
        <Col>
          <Row>Username: {this.props.user.name}</Row>
          <Row>Email address: {this.props.user.email}</Row>
          <Row>Information: {this.props.user.information}</Row>
          <Row>Type: {this.props.user.type}</Row>
        </Col>
        <Link to={"/edit-profile"}>
          <Button variant="primary">Edit Profile</Button>
        </Link>
      </Container>
    );
  }
}

export default AccountPage;
