import React from "react";
import Hero from "../Hero/Hero";
import Jumbotron from "react-bootstrap/Jumbotron";
import ProjectsPage from "./ProjectsPage";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Home from "../../assets/home.jpg";
import "./HomePage.css";

function HomePage({ name }) {
  return (
    <div>
      <Hero name={name} />
      <Jumbotron className="home-jumbotron-white">
        <h2 className=" home-jumbotron-title">
          Connecting young people in Africa with international academics for
          remote supervision
        </h2>
      </Jumbotron>
      <Jumbotron className="home-jumbotron-blue">
        <Row>
          <Col lg={6} md={12} xs={12}>
            <Card className="home-jumbotron-card ">
              <Card.Body className="home-jumbotron-text">
                <Card.Text>
                  <p>
                    Remote Research enables academics to propose suitable
                    research projects for young researchers to select according
                    to their skills and interests.
                  </p>
                  <p>
                    As soon as a project changes state from open to closed,
                    academics will approve the applications of those they want
                    to supervise, and then they arrange an online meeting with
                    supervisees to begin working on the project.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Card className="home-jumbotron-card">
              <Card.Img
                variant="top"
                src={Home}
                className="home-jumbotron-image"
              />
            </Card>
          </Col>
        </Row>
      </Jumbotron>
      <ProjectsPage />
    </div>
  );
}

export default HomePage;
