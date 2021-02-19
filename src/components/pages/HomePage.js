import React from "react";
import Hero from "../Hero/Hero";
import ProjectsPage from "./ProjectsPage";
import Home from "../../assets/home.jpg";
import "./HomePage.css";

function HomePage({ name }) {
  return (
    <div>
      <Hero name={name} />
      <h2 className="title">
        Connecting young people in Africa with international academics for
        remote supervision
      </h2>

      <div className="wrapper wrapper_layout">
        <div className="wrapper_text">
          <p>
            Remote Research enables academics to propose suitable research
            projects for young researchers to select according to their skills
            and interests.
          </p>
          <p>
            As soon as a project changes state from open to closed, academics
            will approve the applications of those they want to supervise, and
            then they arrange an online meeting with supervisees to begin
            working on the project.
          </p>
        </div>
        <div>
          <img
            src={Home}
            alt="Researchers with an academic"
            className="custom-img"
          />
        </div>
      </div>
      <ProjectsPage />
    </div>
  );
}

export default HomePage;
