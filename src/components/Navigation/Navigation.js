import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import history from "../../history";
import "./Navigation.css";
import Logo from "../../assets/logo.png";

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
          <Link className="nav-link logo" to="/">
            <Navbar.Brand className="mr-auto">
              <img
                alt=""
                src={Logo}
                height="30"
                width="30"
                className="d-inline-block align-top"
              />{" "}
              Remote Research
            </Navbar.Brand>
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
                  className="nav-dropdown-link"
                >
                  Open Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onSelect={() => history.push("/ongoing-projects")}
                  className="nav-dropdown-link"
                >
                  Ongoing Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onSelect={() => history.push("/completed-projects")}
                  className="nav-dropdown-link"
                >
                  Completed Projects
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
                  <NavDropdown.Item
                    onSelect={() => history.push("/account")}
                    className="nav-dropdown-link"
                  >
                    Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onSelect={() => history.push("/my-projects")}
                    className="nav-dropdown-link"
                  >
                    My Projects
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onSelect={() => history.push("/my-feedbacks")}
                    className="nav-dropdown-link"
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
