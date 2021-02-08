import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./AboutPage.css";
import Sofiat from "../../assets/sofiat.jpg";
import Mehmet from "../../assets/dispersion.jpg";
import About from "../../assets/about.JPG";

class AboutPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <h1 className="page__title">About Us</h1>
        <Jumbotron className="home-jumbotron-white">
          <h5 className=" home-jumbotron-title">
            Majority of the young researchers in developing countries are
            enthusiastic about learning; many have the desire to nurture their
            skills and explore their research interests; however, the research
            culture/environment in these countries is not up to standard. As a
            result, these young talents are underdeveloped, and not well
            equipped to tackle the problems around them.
          </h5>
        </Jumbotron>
        <Jumbotron className="home-jumbotron-blue">
          <Row>
            <Col lg={6} md={6} xs={12}>
              <Card className="home-jumbotron-card">
                <Card.Img variant="top" src={About} />
              </Card>
            </Col>
            <Col lg={6} md={12} xs={12}>
              <Card className="home-jumbotron-card ">
                <Card.Body className="home-jumbotron-text">
                  <Card.Title>
                    <h1 className="page__title jumbotron-title">Aims</h1>
                  </Card.Title>
                  <Card.Text>
                    <p>
                      Connecting young people in Africa with international
                      academics for remote supervision, so that they can learn,
                      explore and develop their passion for research.
                    </p>
                    <p>
                      Creating opportunities for young people to gain skills and
                      confidence in science, technology and research.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
        <Container className="page">
          <Row>
            <Col lg={6} md={6} xs={12}>
              <Card className="about-card">
                <Card.Body>
                  <Card.Title>Academics</Card.Title>
                  <Card.Text>
                    <p>
                      What we expect from international academics:
                      <ul>
                        <li>
                          Propose a broadly scientific research project suitable
                          for a BSc, MSc, or PhD candidate, with goals
                          achievable within 1 to 3 months.
                        </li>
                        <li>
                          Projects might be within the realms of computing,
                          mathematics, data analysis, engineering, machine
                          learning, and other related STEM subjects.
                        </li>
                        <li>
                          Projects must suit remote style supervision and should
                          ideally not require that the supervisee have access to
                          lab equipments (beyond a laptop, internet access,
                          research papers or books).
                        </li>
                        <li>
                          Arrange to meet with supervisee virtually, at least
                          once a week, to provide guidance on project and
                          monitor progress.
                        </li>
                        <li>
                          Give feedback to supervisees on their performance at
                          the end of the project, via the platform’s rating
                          system.
                        </li>
                      </ul>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <Card className="about-card">
                <Card.Body>
                  <Card.Title>Researchers</Card.Title>
                  <Card.Text>
                    <p>
                      Eligibility and what we expect from young researchers:
                      <ul>
                        <li>
                          Be resident in a developing country (maybe add a link
                          to eligible countries?).
                        </li>
                        <li>
                          Have a good background in your subject area, evidenced
                          by your academic qualification(s).
                        </li>
                        <li>Have access to a working laptop and internet.</li>
                        <li>
                          Be available to meet with the supervisor as planned,
                          throughout the project phase.
                        </li>
                        <li>
                          Be respectful of the supervisor’s time and commitment.
                        </li>
                        <li>Be proactive and highly motivated.</li>
                        <li>Be able to communicate fluently in English.</li>
                      </ul>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Jumbotron className="custom-jumbotron">
          <h1 className="page__title jumbotron-title">Who are we?</h1>
          <Row>
            <Col lg={6} md={6} xs={12}>
              <Card className="jumbotron-card">
                <Card.Img
                  variant="top"
                  src={Sofiat}
                  className="jumbotron-image"
                />
                <Card.Body>
                  <Card.Title>Dr. Sofiat Olaosebikan</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <Card className="jumbotron-card">
                <Card.Img variant="top" src={Mehmet} />
                <Card.Body>
                  <Card.Title>Mehmet Zorlu</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
      </>
    );
  }
}

export default AboutPage;
