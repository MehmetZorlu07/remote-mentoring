import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import MarkingModal from "../MarkingModal/MarkingModal";
import "./SingleProjectPage.css";

class SingleProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      projectState: "",
      projectRating: null,
      display: false,
      researchers: [],
      show: false,
      researcherIndex: 0,
      counter: 0,
      deleted: false,
    };
    this.getProject = this.getProject.bind(this);
  }

  componentDidMount() {
    let projectid = this.props.match.params.projectid;
    this.getProject(projectid.toString());
    window.scrollTo(0, 0);
  }

  getProject = (projectid) => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/project/" + projectid)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ project: data });
        if (this.props.isSignedIn) {
          this.getProjectState();
        }
      });
  };

  getProjectState = () => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/researcherProjects", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.userid,
        projectid: this.state.project.projectid,
      }),
    })
      .then((response) => response.json())
      .then((researcherProject) => {
        this.setState({ projectState: researcherProject.state });
        if (this.props.usertype === "researcher") {
          this.setState({
            projectRating: researcherProject.ratingbyresearcher,
          });
        }
        this.getAllApplications();
      });
  };

  applyProject = () => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/applyProject", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.userid,
        projectid: this.state.project.projectid,
      }),
    })
      .then((response) => response.json())
      .then((researcherProject) => {
        if (researcherProject) {
          this.setState({ projectState: "applied" });
        }
      });
  };

  deleteProject = () => {
    if (window.confirm("Are you sure about deleting this project?")) {
      fetch("https://fathomless-gorge-74945.herokuapp.com/deleteProject", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectid: this.state.project.projectid,
        }),
      })
        .then((response) => response.json())
        .then((amount) => {
          this.setState({ project: {}, deleted: true });
        });
    }
  };

  withdrawApplication = () => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/withdrawApplication", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        researcherid: this.props.userid,
        projectid: this.state.project.projectid,
      }),
    })
      .then((response) => response.json())
      .then((amount) => {
        this.getProjectState();
      });
  };

  setDisplayState = () => {
    this.setState({ display: !this.state.display });
  };

  getAllApplications = () => {
    fetch("https://fathomless-gorge-74945.herokuapp.com/allApplications", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectid: this.state.project.projectid,
      }),
    })
      .then((response) => response.json())
      .then((researchersList) => {
        if (researchersList.length > 0) {
          this.setState({
            researchers: researchersList,
            counter: researchersList.length,
          });
        }
      });
  };

  handleClose = () => this.setState({ show: false });

  changeApplicationState = (decision) => {
    fetch(
      "https://fathomless-gorge-74945.herokuapp.com/changeApplicationState",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          researcherid: this.state.researchers[this.state.researcherIndex].id,
          projectid: this.state.project.projectid,
          state: decision,
          researcheremail: this.state.researchers[this.state.researcherIndex]
            .email,
        }),
      }
    )
      .then((response) => response.json())
      .then((researcherproject) => {
        if (researcherproject) {
          this.handleClose();
          this.getAllApplications();
          this.setDisplayState();
        }
      });
  };

  renderResearcher = (researcher, index) => {
    const handleShow = (e) => {
      this.setState({ researcherIndex: e.target.getAttribute("keyprop") });
      this.setState({ show: true });
    };
    return (
      <tr key={index}>
        <td>{researcher.name}</td>
        <td>{researcher.email}</td>
        <td>{researcher.state}</td>
        <td>
          <Button
            className="custom-button"
            keyprop={index}
            onClick={handleShow}
          >
            Display
          </Button>
          <Container className="page">
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="account__label">
                    Researcher:{" "}
                    {this.state.researchers[this.state.researcherIndex].name}
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="account__label">Email: </div>
                <div className="account__value">
                  {this.state.researchers[this.state.researcherIndex].email}
                </div>
                <div className="account__label">Application State: </div>
                <div className="account__value">
                  {this.state.researchers[this.state.researcherIndex].state}
                </div>
                <div className="account__label">Information: </div>
                <div className="account__value">
                  {
                    this.state.researchers[this.state.researcherIndex]
                      .information
                  }
                </div>
                {!!(
                  this.state.researchers[this.state.researcherIndex].tags || []
                ).length && (
                  <>
                    <div className="account__label">Interests: </div>
                    <div className="single-project__tags">
                      <div className="tags">
                        {this.state.researchers[
                          this.state.researcherIndex
                        ].tags.map((tag, index) => {
                          return (
                            <div key={`tag-${index}`} className="tag">
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer className="form__footer">
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                {this.state.researchers[this.state.researcherIndex].state ===
                  "applied" && (
                  <>
                    <Button
                      variant="danger"
                      onClick={() => this.changeApplicationState("declined")}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => this.changeApplicationState("approved")}
                    >
                      Approve
                    </Button>
                  </>
                )}
                {this.state.researchers[this.state.researcherIndex].state ===
                  "approved" && (
                  <Button
                    variant="danger"
                    onClick={() => this.changeApplicationState("declined")}
                  >
                    Decline
                  </Button>
                )}
                {this.state.researchers[this.state.researcherIndex].state ===
                  "declined" && (
                  <Button
                    variant="primary"
                    onClick={() => this.changeApplicationState("approved")}
                  >
                    Approve
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </Container>
        </td>
      </tr>
    );
  };

  renderApprovedResearchers = (researcher, index) => {
    const handleShow = (e) => {
      this.setState({ researcherIndex: e.target.getAttribute("keyprop") });
      this.setState({ show: true });
    };
    if (researcher.state === "approved") {
      return (
        <tr key={index}>
          <td>{researcher.name}</td>
          <td>{researcher.email}</td>
          <td>{researcher.state}</td>
          <td>
            <Button
              className="custom-button"
              keyprop={index}
              onClick={handleShow}
            >
              Display
            </Button>
            <Container className="page">
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <div className="account__label">
                      Researcher:{" "}
                      {this.state.researchers[this.state.researcherIndex].name}
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="account__label">Email: </div>
                  <div className="account__value">
                    {this.state.researchers[this.state.researcherIndex].email}
                  </div>
                  <div className="account__label">Application State: </div>
                  <div className="account__value">
                    {this.state.researchers[this.state.researcherIndex].state}
                  </div>
                  <div className="account__label">Information: </div>
                  <div className="account__value">
                    {
                      this.state.researchers[this.state.researcherIndex]
                        .information
                    }
                  </div>
                  {!!(
                    this.state.researchers[this.state.researcherIndex].tags ||
                    []
                  ).length && (
                    <>
                      <div className="account__label">Interests: </div>
                      <div className="single-project__tags">
                        <div className="tags">
                          {this.state.researchers[
                            this.state.researcherIndex
                          ].tags.map((tag, index) => {
                            return (
                              <div key={`tag-${index}`} className="tag">
                                {tag}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer className="form__footer">
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  {this.props.usertype !== "researcher" &&
                    this.state.project.status === "completed" &&
                    this.state.researchers[this.state.researcherIndex]
                      .ratingbyacademic === null && (
                      <MarkingModal
                        researcherId={
                          this.state.researchers[this.state.researcherIndex].id
                        }
                        projectId={this.state.project.projectid}
                        userType={this.props.usertype}
                      />
                    )}
                </Modal.Footer>
              </Modal>
            </Container>
          </td>
        </tr>
      );
    }
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <h4 className="card-title">{this.state.project.name}</h4>
          <p className="page__description">
            <div>{this.state.project.description} </div>
            <br />
            {this.state.project.academicid === this.props.userid && (
              <div>
                {" "}
                <span className="account__label">Project Capacity:</span>{" "}
                {this.state.project.capacity}{" "}
              </div>
            )}
            {this.state.project.requirements !== null && !this.state.deleted && (
              <div>
                <span className="account__label">Minimum Requirements:</span>{" "}
                {this.state.project.requirements}
              </div>
            )}
            {!this.state.deleted && (
              <div>
                {" "}
                <span className="account__label">Project Status:</span>{" "}
                {this.state.project.status}{" "}
              </div>
            )}
          </p>
          {!!(this.state.project.tags || []).length && (
            <div className="single-project__tags">
              <div className="single-project__tags__label">Tags:</div>

              <div className="tags">
                {this.state.project.tags.map((tag, index) => {
                  return (
                    <div key={`tag-${index}`} className="tag">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="single-project__actions">
            {this.props.usertype === "researcher" &&
              this.state.projectState === undefined &&
              this.state.project.status === "open" &&
              this.state.counter < this.state.project.capacity && (
                <Button onClick={this.applyProject} className="custom-button">
                  Apply
                </Button>
              )}
            {this.props.usertype === "researcher" &&
              this.state.projectState === undefined &&
              this.state.counter >= this.state.project.capacity && (
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Project capacity is full.
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <Button disabled style={{ pointerEvents: "none" }}>
                      Apply
                    </Button>
                  </span>
                </OverlayTrigger>
              )}
            {this.props.usertype === "researcher" &&
              this.state.projectState === "applied" &&
              this.state.project.status === "open" && (
                <div>
                  <h5>You have applied to this project.</h5>
                  <Button
                    onClick={this.withdrawApplication}
                    className="custom-button"
                  >
                    Withdraw application
                  </Button>
                </div>
              )}
            {this.props.usertype === "researcher" &&
              this.state.projectState === "approved" &&
              this.state.project.status === "open" && (
                <h5>You have been approved to this project.</h5>
              )}
            {this.props.usertype === "researcher" &&
              this.state.projectState === "declined" &&
              this.state.project.status === "open" && (
                <h5>You have been rejected from this project.</h5>
              )}
            {this.state.project.academicid === this.props.userid && (
              <Link to={`/edit-project/${this.state.project.projectid}`}>
                <Button className="custom-button">Edit Project</Button>
              </Link>
            )}
            {this.state.project.academicid === this.props.userid &&
              this.state.counter > 0 && (
                <Button
                  onClick={this.setDisplayState}
                  className="button-yellow"
                >
                  Show Researchers{" "}
                  <Badge variant="light">
                    {this.state.project.status === "open" && this.state.counter}
                  </Badge>
                </Button>
              )}
            {this.state.project.academicid === this.props.userid &&
              this.state.counter === 0 && (
                <Button className="button-yellow" disabled>
                  No Applicants
                </Button>
              )}
            {this.state.project.academicid === this.props.userid && (
              <Button onClick={this.deleteProject} className="button-red">
                <span className="fa fa-trash" />
              </Button>
            )}
            {this.props.usertype === "researcher" &&
              this.state.project.status === "completed" &&
              this.state.projectRating === null && (
                <MarkingModal
                  researcherId={this.props.userid}
                  projectId={this.state.project.projectid}
                  userType={this.props.usertype}
                />
              )}
          </div>
          {this.state.display && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>State</th>
                  <th>Details</th>
                </tr>
              </thead>
              {this.state.project.status === "open" && (
                <tbody>
                  {this.state.researchers.map(this.renderResearcher)}
                </tbody>
              )}
              {this.state.project.status !== "open" && (
                <tbody>
                  {this.state.researchers.map(this.renderApprovedResearchers)}
                </tbody>
              )}
            </Table>
          )}
          {this.state.deleted && <h3>This project is deleted.</h3>}
        </Card>
      </Container>
    );
  }
}

export default SingleProjectPage;
