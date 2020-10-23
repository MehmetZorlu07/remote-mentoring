import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

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
              <Link className="nav-link" to="/about">
                About Us
              </Link>
              {this.props.isSignedIn && (
                <Link className="nav-link" to="/account">
                  My Account
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
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
