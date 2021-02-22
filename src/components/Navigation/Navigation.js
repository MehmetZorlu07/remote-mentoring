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
          <Nav.Link className="nav-link logo" to="/" eventKey="1" as={Link}>
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
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {this.props.isSignedIn && this.props.userType === "admin" && (
                <Nav.Link className="nav-link" to="/admin-page" eventKey="2">
                  Admin
                </Nav.Link>
              )}
              <Nav.Link className="nav-link" to="/" eventKey="3" as={Link}>
                Home
              </Nav.Link>
              <NavDropdown
                title="Projects"
                show={this.state.showProjects}
                onMouseEnter={this.showProjectsDropdown}
                onMouseLeave={this.hideProjectsDropdown}
                id="default-cursor"
              >
                <NavDropdown.Item
                  onSelect={() => history.push("/open-projects")}
                  className="nav-dropdown-link"
                  eventKey="4"
                  as={Link}
                >
                  Open Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onSelect={() => history.push("/ongoing-projects")}
                  className="nav-dropdown-link"
                  eventKey="5"
                  as={Link}
                >
                  Ongoing Projects
                </NavDropdown.Item>
                <NavDropdown.Item
                  onSelect={() => history.push("/completed-projects")}
                  className="nav-dropdown-link"
                  eventKey="6"
                  as={Link}
                >
                  Completed Projects
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-link" to="/about" eventKey="7" as={Link}>
                About Us
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                to="/contact-us"
                eventKey="8"
                as={Link}
              >
                Contact Us
              </Nav.Link>
              {(this.props.userType === "academic" ||
                this.props.userType === "admin") && (
                <Nav.Link
                  className="nav-link"
                  to="/create-project"
                  eventKey="9"
                  as={Link}
                >
                  Create Project
                </Nav.Link>
              )}
              {this.props.isSignedIn && (
                <NavDropdown
                  title="My Account"
                  id="default-cursor"
                  show={this.state.showAccount}
                  onMouseEnter={this.showAccountDropdown}
                  onMouseLeave={this.hideAccountDropdown}
                >
                  <NavDropdown.Item
                    onSelect={() => history.push("/account")}
                    className="nav-dropdown-link"
                    eventKey="10"
                    as={Link}
                  >
                    Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onSelect={() => history.push("/my-projects")}
                    className="nav-dropdown-link"
                    eventKey="11"
                    as={Link}
                  >
                    My Projects
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onSelect={() => history.push("/my-feedbacks")}
                    className="nav-dropdown-link"
                    eventKey="12"
                    as={Link}
                  >
                    My Feedbacks
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!this.props.isSignedIn && (
                <Nav.Link
                  className="nav-link"
                  to="/sign-in"
                  eventKey="13"
                  as={Link}
                >
                  Sign In
                </Nav.Link>
              )}
              {!this.props.isSignedIn && (
                <Nav.Link
                  className="nav-link"
                  to="/register"
                  eventKey="14"
                  as={Link}
                >
                  Register
                </Nav.Link>
              )}
              {this.props.isSignedIn && (
                <Nav.Link
                  onClick={this.handleChange}
                  className="nav-link"
                  to="/"
                  eventKey="15"
                  as={Link}
                >
                  Sign Out
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
