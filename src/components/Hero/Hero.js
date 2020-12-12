import React from "react";
import LazyHero from "react-lazy-hero";
import HeroImage from "../../assets/hero.jpg";

const Hero = ({ name, height = "100vh" }) => {
  return (
    <div>
      <LazyHero
        imageSrc={HeroImage}
        minHeight={height}
        parallaxOffset={100}
        opacity={0}
      >
        <h1 style={{ color: "white" }}>{`Welcome ${name}`}</h1>
      </LazyHero>
    </div>
  );
};

export default Hero;
