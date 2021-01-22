import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import history from "../../history";
import "./Navigation.css";

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
      <div className="nav_bar">
        <Navbar
          collapseOnSelect
          expand="lg"
          fixed="top"
          variant="light"
          className="nav_color"
        >
          <Link className="nav-link" to="/">
            <Navbar.Brand className="mr-auto">Remote Mentoring</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {this.props.isSignedIn && this.props.userType === "admin" && (
                <Link className="nav-link" to="/admin-page">
                  Admin
                </Link>
              )}
              <NavDropdown title="Projects" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onSelect={() => history.push("/open-projects")}
                >
                  Open Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onSelect={() => history.push("/ongoing-projects")}
                >
                  Ongoing Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onSelect={() => history.push("/closed-projects")}
                >
                  Closed Projects
                </NavDropdown.Item>
              </NavDropdown>

              {(this.props.userType === "academic" ||
                this.props.userType === "admin") && (
                <Link className="nav-link" to="/create-project">
                  Create Project
                </Link>
              )}
              <Link className="nav-link" to="/about">
                About Us
              </Link>
              <Link className="nav-link" to="/contact-us">
                Contact Us
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
