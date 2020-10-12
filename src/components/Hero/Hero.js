import React from "react";
import LazyHero from "react-lazy-hero";
import HeroImage from "../../assets/hero.jpg";

function Hero() {
  return (
    <div>
      <LazyHero imageSrc={HeroImage}>
        <h1>Welcome</h1>
      </LazyHero>
    </div>
  );
}

export default Hero;
