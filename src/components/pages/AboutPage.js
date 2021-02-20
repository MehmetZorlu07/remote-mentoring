import React from "react";
import Container from "react-bootstrap/Container";
import "./AboutPage.css";
import About from "../../assets/about.JPG";

class AboutPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Container className="page">
        <h1 className="page__title">About Us</h1>
        <div className="wrapper wrapper_layout">
          <div className="wrapper_text">
            <h2 className="wrapper_title">Aims</h2>
            <p>
              Connecting young people in Africa with international academics for
              remote supervision, so that they can learn, explore and develop
              their passion for research.
            </p>
            <p>
              Creating opportunities for young people to gain skills and
              confidence in science, technology and research.
            </p>
          </div>
          <div>
            <img
              src={About}
              alt="Researchers with an academic"
              className="custom-img"
            />
          </div>
        </div>
        <h4>
          Majority of the young researchers in developing countries are
          enthusiastic about learning; many have the desire to nurture their
          skills and explore their research interests; however, the research
          culture/environment in these countries is not up to standard. As a
          result, these young talents are underdeveloped, and not well equipped
          to tackle the problems around them.
        </h4>

        <div className="wrapper wrapper_layout wrapper_align">
          <div className="wrapper_text">
            <h2 className="wrapper_title">Academics</h2>
            <p>
              What we expect from international academics:
              <ul>
                <li>
                  Propose a broadly scientific research project suitable for a
                  BSc, MSc, or PhD candidate, with goals achievable within 1 to
                  3 months.
                </li>
                <li>
                  Projects might be within the realms of computing, mathematics,
                  data analysis, engineering, machine learning, and other
                  related STEM subjects.
                </li>
                <li>
                  Projects must suit remote style supervision and should ideally
                  not require that the supervisee have access to lab equipments
                  (beyond a laptop, internet access, research papers or books).
                </li>
                <li>
                  Arrange to meet with supervisee virtually, at least once a
                  week, to provide guidance on project and monitor progress.
                </li>
                <li>
                  Give feedback to supervisees on their performance at the end
                  of the project, via the platform’s rating system.
                </li>
              </ul>
            </p>
          </div>
          <div className="wrapper_text">
            <h2 className="wrapper_title">Researchers</h2>
            <p>
              Eligibility and what we expect from young researchers:
              <ul>
                <li>
                  Be resident in a developing country (maybe add a link to
                  eligible countries?).
                </li>
                <li>
                  Have a good background in your subject area, evidenced by your
                  academic qualification(s).
                </li>
                <li>Have access to a working laptop and internet.</li>
                <li>
                  Be available to meet with the supervisor as planned,
                  throughout the project phase.
                </li>
                <li>Be respectful of the supervisor’s time and commitment.</li>
                <li>Be proactive and highly motivated.</li>
                <li>Be able to communicate fluently in English.</li>
              </ul>
            </p>
          </div>
        </div>
      </Container>
    );
  }
}

export default AboutPage;
