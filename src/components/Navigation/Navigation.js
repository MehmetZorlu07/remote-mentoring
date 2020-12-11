import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.setLoginState(false);
  }

  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          sticky="top"
          variant="dark"
        >
          <Link className="nav-link" to="/">
            <Navbar.Brand className="mr-auto">Remote Mentoring</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
              {this.props.userType === "academic" && (
                <Link className="nav-link" to="/create-project">
                  Create Project
                </Link>
              )}
              <Link className="nav-link" to="/about">
                About Us
              </Link>
              {this.props.isSignedIn && (
                <Link className="nav-link" to="/account">
                  My Account
                </Link>
              )}
              {this.props.isSignedIn && (
                <Link className="nav-link" to="/my-projects">
                  My Projects
                </Link>
              )}
              {!this.props.isSignedIn && (
                <Link className="nav-link" to="/sign-in">
                  Sign In
                </Link>
              )}
              {!this.props.isSignedIn && (
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              )}
              {this.props.isSignedIn && (
                <Link onClick={this.handleChange} className="nav-link" to="/">
                  Sign Out
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
