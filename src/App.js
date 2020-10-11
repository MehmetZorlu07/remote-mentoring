import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Remote Mentoring",
      headerLinks: [
        { title: "Home", path: "/" },
        { title: "Projects", path: "/projects" },
        { title: "About Us", path: "/about" },
        { title: "My Account", path: "/account" },
      ],
      home: {
        title: "Welcome",
        subTitle: "We help researchers",
        text: "Checkout the projects below",
      },
      projects: {
        title: "Projects",
      },
      about: {
        title: "About Us",
      },
      account: {
        title: "My Account",
      },
    };
  }

  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navigation />
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
