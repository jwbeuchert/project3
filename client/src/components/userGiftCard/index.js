import React from "react";

const UserCard = props => {
  return (
    <div className="card sub-card">
      <div className="card-body">
        <h5 className="card-title">{props.gift.name}</h5>
      </div>
    </div>
  );
};

export default UserCard;
