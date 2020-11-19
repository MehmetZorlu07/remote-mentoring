import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class AccountPage extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Col>
            <Row>Username: </Row>
            <Row>Email address: </Row>
            <Row>Information: </Row>
            <Row>Type: </Row>
          </Col>
          <Col>
            <Row>{this.props.user.name}</Row>
            <Row>{this.props.user.email}</Row>
            <Row>{this.props.user.information}</Row>
            <Row>{this.props.user.type}</Row>
          </Col>
        </Container>
        <Link to={"/edit-profile"}>
            <Button variant="primary">Edit Profile</Button>
        </Link>
      </div>

      );}
  
}

export default AccountPage;
