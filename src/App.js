import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "./history";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import AccountPage from "./components/pages/AccountPage";
import OpenProjects from "./components/pages/OpenProjects";
import ClosedProjects from "./components/pages/ClosedProjects";
import OngoingProjects from "./components/pages/OngoingProjects";
import MyProjects from "./components/MyProjects/MyProjects";
import Register from "./components/Register/Register";
import SignIn from "./components/Signin/Signin";
import SingleProjectPage from "./components/pages/SingleProjectPage";
import CreateProject from "./components/CreateProject/CreateProject";
import EditProject from "./components/EditProject/EditProject";
import EditProfile from "./components/EditProfile/EditProfile";
import Reset from "./components/Reset/Reset";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EditCredentials from "./components/EditCredentials/EditCredentials";
import ContactPage from "./components/pages/ContactPage";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

const initialState = {
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    information: "",
    joined: "",
    type: "",
    tags: [],
  },
};

class App extends Component {
  constructor() {
    super();
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
              .then((res) => res.json())
              .then((user) => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.handleLoginChange(true);
                  history.push("/");
                }
              });
          }
        })
        .catch(console.log);
    }
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
        tags: data.tags,
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
          <div className="page__container">
            <div className="content__wrap">
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
              <Route
                path={"/reset-password/:token"}
                exact
                render={(props) => <ResetPassword {...props} />}
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
              <Route
                path="/open-projects"
                exact
                render={() => <OpenProjects />}
              />
              <Route
                path="/ongoing-projects"
                exact
                render={() => <OngoingProjects />}
              />
              <Route
                path="/closed-projects"
                exact
                render={() => <ClosedProjects />}
              />
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
                    <EditProfile
                      user={this.state.user}
                      loadUser={this.loadUser}
                    />
                  ) : (
                    <Redirect to="/sign-in" />
                  )
                }
              />
              <Route
                path="/edit-credentials"
                exact
                render={() =>
                  this.state.isSignedIn ? (
                    <EditCredentials user={this.state.user} />
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
              <Route path="/contact-us" exact render={() => <ContactPage />} />
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
            </div>
            <Footer />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
