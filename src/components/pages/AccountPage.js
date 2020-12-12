import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./AccountPage.css";

class AccountPage extends React.Component {
  render() {
    return (
      <Container className="page">
        <Card className="account">
          <div className="page__title">Account Details</div>
          <div className="account__label">Username: </div>
          <div className="account__value">{this.props.user.name}</div>
          <div className="account__label">Email: </div>
          <div className="account__value">{this.props.user.email}</div>
          <div className="account__label">Information: </div>
          <div className="account__value">{this.props.user.type}</div>
          <div className="account__label">Type: </div>
          <div className="account__value">{this.props.user.information}</div>
          <Link to={"/edit-profile"}>
            <Button variant="primary">Edit Profile</Button>
          </Link>
        </Card>
      </Container>
    );
  }
}

export default AccountPage;
