import React from "react";

const Gift = props => {
  return (
    <div class="card sub-card">
      <div class="card-body">
        <h5 class="card-title">{props.gift.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Gift Description</h6>
        <p class="card-text">{prop.gift.description}</p>
        <h6 class="card-subtitle mb-2">{`Cost: ${props.gift.cost}`}</h6>
        <a href={props.gift.link} class="card-link">
          Link to gift
        </a>
      </div>
    </div>
  );
};
export default Gift;
