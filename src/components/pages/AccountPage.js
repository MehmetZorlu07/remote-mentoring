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
          <div className="account__label">Type: </div>
          <div className="account__value">{this.props.user.type}</div>
          <div className="account__label">Information: </div>
          <div className="account__value">{this.props.user.information}</div>
          {!!(this.props.user.tags || []).length && (
            <>
              <div className="account__label">Interests: </div>
              <div className="single-project__tags">
                <div className="tags">
                  {this.props.user.tags.map((tag, index) => {
                    return (
                      <div key={`tag-${index}`} className="tag">
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <div className="single-project__actions">
            <Link to={"/edit-profile"}>
              <Button variant="primary" className="custom-button">
                Edit Profile
              </Button>
            </Link>
            <Link to={"/edit-credentials"}>
              <Button className="button-yellow">Reset Password</Button>
            </Link>
          </div>
        </Card>
      </Container>
    );
  }
}

export default AccountPage;
