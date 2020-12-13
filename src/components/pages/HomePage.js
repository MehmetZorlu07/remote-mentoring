import React from "react";
import Hero from "../Hero/Hero";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

function HomePage({ name }) {
  return (
    <div>
      <Hero name={name} />
      <Jumbotron>
        <h1>Research Categories</h1>
        <p>Checkout these project categories below that might interest you!</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default HomePage;
