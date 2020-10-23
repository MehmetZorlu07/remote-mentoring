import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import AccountPage from "./components/pages/AccountPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import Register from "./components/Register/Register";
import SignIn from "./components/Signin/Signin";
import Footer from "./components/Footer/Footer";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const initialState = {
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    information: "",
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.state = initialState;
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

  handleLoginChange = (data) => {
    if (data) {
      this.setState({
        isSignedIn: data,
      });
    } else {
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Container className="p-0" fluid={true}>
            <Navigation
              isSignedIn={this.state.isSignedIn}
              setLoginState={this.handleLoginChange}
            />
            <Route
              path={"/"}
              exact
              render={() => <HomePage name={this.state.user.name} />}
            />
            <Route path="/about" exact render={() => <AboutPage />} />
            <Route path="/account" exact render={() => <AccountPage />} />
            <Route path="/projects" exact render={() => <ProjectsPage />} />
            <Route
              path="/sign-in"
              exact
              render={() => (
                <SignIn
                  loadUser={this.loadUser}
                  setLoginState={this.handleLoginChange}
                />
              )}
            />
            <Route
              path="/register"
              exact
              render={() => <Register loadUser={this.loadUser} />}
            />
            <Footer />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
