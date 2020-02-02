import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const AnimatedCards = props => {
  const selectedStyleColor = useSpring({
    backgroundColor: props.isChecked ? "#baf4d3" : "white"
  });
  const fade = useSpring({
    opacity: props.isChecked ? 1 : 0
  });

  return (
    <a.div
      className="card sub-card"
      onClick={() => props.handleClick(props.type, props.item._id)}
      style={selectedStyleColor}
    >
      {props.cardBody}
      <a.div className="font-awesome c front" style={fade}>
        <FontAwesomeIcon icon={faCheckSquare} />
      </a.div>
    </a.div>
  );
};

export default AnimatedCards;
