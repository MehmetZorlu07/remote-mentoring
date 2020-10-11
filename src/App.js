import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import AccountPage from "./components/pages/AccountPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import Footer from "./components/Footer/Footer";

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
          <Route
            path="/"
            exact
            render={() => (
              <HomePage
                title={this.state.home.title}
                subTitle={this.state.home.subTitle}
                text={this.state.home.text}
              />
            )}
          />
          <Route
            path="/about"
            exact
            render={() => <AboutPage title={this.state.about.title} />}
          />
          <Route
            path="/account"
            exact
            render={() => <AccountPage title={this.state.account.title} />}
          />
          <Route
            path="/projects"
            exact
            render={() => <ProjectsPage title={this.state.projects.title} />}
          />
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
