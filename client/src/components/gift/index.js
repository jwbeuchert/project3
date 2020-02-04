import React from "react";

const Gift = props => {
  return (
    <div className="card sub-card">
      <div className="card-body">
        <h5 className="card-title">{props.gift.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Gift Description</h6>
        <p className="card-text">{props.gift.description}</p>
        <h6 className="card-subtitle mb-2">{`Cost: ${props.gift.cost}`}</h6>
        <a href={props.gift.link} className="card-link">
          Link to gift
        </a>
      </div>
    </div>
  );
};
export default Gift;
