import React from "react";
import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faUserPlus,
  faUserMinus,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";

const AnimatedCards = props => {
  const selectedStyleColor = useSpring({
    backgroundColor: props.isChecked ? "#baf4d3" : "white"
  });
  const fade = useSpring({
    opacity: props.isChecked ? 1 : 0
  });

  return (
    <a.div className="card sub-card" style={selectedStyleColor}>
      {props.type === "list" && (
        <div
          className="font-awesome fa-list-div"
          onClick={() => props.handleClick(props.type, props.item._id)}
        >
          <FontAwesomeIcon className="fa-address-card" icon={faAddressCard} />
        </div>
      )}
      {props.type === "friend" && (
        <div
          className={
            !props.isChecked
              ? "font-awesome fa-friend-add-div"
              : "font-awesome fa-friend-minus-div"
          }
          onClick={() => props.handleClick(props.type, props.item._id)}
        >
          <FontAwesomeIcon icon={!props.isChecked ? faUserPlus : faUserMinus} />
        </div>
      )}
      {props.cardBody}
      <a.div className="font-awesome fa-check-div" style={fade}>
        <FontAwesomeIcon icon={faCheckSquare} />
      </a.div>
    </a.div>
  );
};

export default AnimatedCards;
