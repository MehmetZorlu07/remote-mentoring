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
    this.state = {
      showProjects: false,
      showAccount: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.setLoginState(false);
  }

  showProjectsDropdown = (e) => {
    this.setState({ showProjects: true });
  };

  hideProjectsDropdown = (e) => {
    this.setState({ showProjects: false });
  };

  showAccountDropdown = (e) => {
    this.setState({ showAccount: true });
  };

  hideAccountDropdown = (e) => {
    this.setState({ showAccount: false });
  };

  render() {
    return (
      <div className="nav_bar">
        <Navbar
          collapseOnSelect
          expand="lg"
          fixed="top"
          variant="dark"
          className="nav_bar_color"
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
              <NavDropdown
                title="Projects"
                id="basic-nav-dropdown"
                show={this.state.showProjects}
                onMouseEnter={this.showProjectsDropdown}
                onMouseLeave={this.hideProjectsDropdown}
              >
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
              <Link className="nav-link" to="/about">
                About Us
              </Link>
              <Link className="nav-link" to="/contact-us">
                Contact Us
              </Link>
              {(this.props.userType === "academic" ||
                this.props.userType === "admin") && (
                <Link className="nav-link" to="/create-project">
                  Create Project
                </Link>
              )}
              {this.props.isSignedIn && (
                <NavDropdown
                  title="My Account"
                  id="basic-nav-dropdown"
                  show={this.state.showAccount}
                  onMouseEnter={this.showAccountDropdown}
                  onMouseLeave={this.hideAccountDropdown}
                >
                  <NavDropdown.Item onSelect={() => history.push("/account")}>
                    Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onSelect={() => history.push("/my-projects")}
                  >
                    My Projects
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onSelect={() => history.push("/my-feedbacks")}
                  >
                    My Feedbacks
                  </NavDropdown.Item>
                </NavDropdown>
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
