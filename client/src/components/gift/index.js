import React from "react";
import "./index.css"

const Gift = props => {
  return (
    <div className="card gift-card">
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
    </div>
  );
};
export default Gift;
