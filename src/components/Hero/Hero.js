import React from "react";

const Hero = (props) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const style = {
    position: "fixed",
    top: 0,
    left: 0,
    "min-width": "100%",
    "min-height": "100%",
  };

  return (
    <div style={style}>
      <img
        src={`https://unsplash.it/${width}/${height}?image=${props.number}`}
        style={style}
      />
    </div>
  );
};

export default Hero;
