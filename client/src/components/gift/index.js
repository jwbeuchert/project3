import React from "react";
import { useSpring, animated as a } from "react-spring"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd, faUndoAlt } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

const Gift = props => {
  const isGiftedStyle = useSpring({
    backgroundColor: props.gift.isGifted ? "#9e9e9e" : "white", opacity: props.gift.isGifted ? .6 : 1
  })

  return (
    <a.div
      className="card gift-card"
      style={isGiftedStyle}
    >
      <div className="gift-grid">
        <div className="gift-title">{props.gift.name}</div>
        <div className="gift-cost">{`Cost: ${props.gift.cost}`}</div>
        <div className="gift-link">
          <a href={props.gift.link}>Link to Gift</a>
        </div>
        <div className="gift-desc">
          <h6 className="gift-desc-label">Gift Description</h6>
          <p>{props.gift.description}</p>
        </div>
      </div>
      {props.gifter && (
        <div
          className={
            !props.gift.isGifted
              ? "font-awesome fa-gift-select"
              : "font-awesome fa-gift-return"
          }
          onClick={() =>
            props.handleGiftSelect(props.gift._id, props.gift.isGifted)
          }
        >
          <FontAwesomeIcon
            icon={!props.gift.isGifted ? faHandHoldingUsd : faUndoAlt}
          />
        </div>
      )}
    </a.div>
  );
};
export default Gift;
