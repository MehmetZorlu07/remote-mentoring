import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import AccountPage from "./components/pages/AccountPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import Register from "./components/Register/Register";
import SignIn from "./components/Signin/Signin";
import Footer from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      route: "/",
      user: {
        id: "",
        name: "",
        email: "",
        information: "",
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        information: data.information,
        joined: data.joined,
      },
    });
  };

  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navigation />
          <Route
            path={this.state.route}
            exact
            render={() => <HomePage name={this.state.user.name} />}
          />
          <Route path="/about" exact render={() => <AboutPage />} />
          <Route path="/account" exact render={() => <AccountPage />} />
          <Route path="/projects" exact render={() => <ProjectsPage />} />
          <Route
            path="/sign-in"
            exact
            render={() => <SignIn loadUser={this.loadUser} />}
          />
          <Route
            path="/register"
            exact
            render={() => <Register loadUser={this.loadUser} />}
          />
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
