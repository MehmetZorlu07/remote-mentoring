import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import AccountPage from "./components/pages/AccountPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import SignInPage from "./components/pages/SignInPage";
import RegisterPage from "./components/pages/RegisterPage";
import Footer from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "/",
    };
  }

  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navigation />
          <Route path={this.state.route} exact render={() => <HomePage />} />
          <Route path="/about" exact render={() => <AboutPage />} />
          <Route path="/account" exact render={() => <AccountPage />} />
          <Route path="/projects" exact render={() => <ProjectsPage />} />
          <Route path="/sign-in" exact render={() => <SignInPage />} />
          <Route path="/register" exact render={() => <RegisterPage />} />
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
