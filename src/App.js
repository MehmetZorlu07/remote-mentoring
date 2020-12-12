import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "./history";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import AccountPage from "./components/pages/AccountPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import MyProjects from "./components/MyProjects/MyProjects";
import Register from "./components/Register/Register";
import SignIn from "./components/Signin/Signin";
import SingleProjectPage from "./components/pages/SingleProjectPage";
import CreateProject from "./components/CreateProject/CreateProject";
import EditProject from "./components/EditProject/EditProject";
import EditProfile from "./components/EditProfile/EditProfile";
import Reset from "./components/Reset/Reset";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = {
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    information: "",
    joined: "",
    type: "",
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
        type: data.type,
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
      <React.Fragment>
        <Router history={history}>
          <Navigation
            isSignedIn={this.state.isSignedIn}
            setLoginState={this.handleLoginChange}
            userType={this.state.user.type}
          />
          <Route
            path={"/"}
            exact
            render={() => (
              <HomePage
                name={this.state.user.name}
                isSignedIn={this.state.isSignedIn}
              />
            )}
          />
          <Route path="/about" exact render={() => <AboutPage />} />
          <Route
            path="/account"
            exact
            render={() =>
              this.state.isSignedIn ? (
                <AccountPage user={this.state.user} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
          />
          <Route path="/projects" exact render={() => <ProjectsPage />} />
          <Route
            path="/my-projects"
            exact
            render={() =>
              this.state.isSignedIn ? (
                <MyProjects user={this.state.user} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
          />
          <Route
            path="/create-project"
            exact
            render={() =>
              this.state.user.type === "academic" ? (
                <CreateProject academicid={this.state.user.id} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
          />
          <Route
            exact
            path="/edit-project/:projectid"
            render={(props) =>
              this.state.user.type === "academic" ? (
                <EditProject {...props} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
          />
          <Route
            path="/edit-profile"
            exact
            render={() =>
              this.state.isSignedIn ? (
                <EditProfile user={this.state.user} loadUser={this.loadUser} />
              ) : (
                <Redirect to="/sign-in" />
              )
            }
          />
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
          <Route path="/reset" exact render={() => <Reset />} />
          <Route
            path="/register"
            exact
            render={() => (
              <Register
                loadUser={this.loadUser}
                setLoginState={this.handleLoginChange}
              />
            )}
          />
          <Route
            exact
            path="/project/:projectid"
            render={(props) => (
              <SingleProjectPage
                {...props}
                userid={this.state.user.id}
                isSignedIn={this.state.isSignedIn}
                usertype={this.state.user.type}
              />
            )}
          />
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
