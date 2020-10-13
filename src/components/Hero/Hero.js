import React from "react";
import LazyHero from "react-lazy-hero";
import HeroImage from "../../assets/hero.jpg";

function Hero() {
  return (
    <div>
      <LazyHero imageSrc={HeroImage} minHeight="75vh" parallaxOffset={100} opacity={0}>
        <h1 style={{ color: 'white' }}>Welcome</h1>
      </LazyHero>
    </div>
  );
}

export default Hero;
