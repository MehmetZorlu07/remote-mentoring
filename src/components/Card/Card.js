import React from "react";

import CardInfo from "../Cardinfo/Cardinfo";

function Card(props) {
  return (
    <div
      className="d-inline-block g-card"
      onClick={(e) => props.click(props.item)}
    >
      <img
        className="g-card-image"
        src={props.item.imgSrc}
        alt={props.item.imgSrc}
      />
      {props.item.selected && (
        <CardInfo title={props.item.title} link={props.item.link} />
      )}
    </div>
  );
}

export default Card;
