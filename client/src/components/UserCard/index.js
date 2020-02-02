import React from "react";

const UserCard = props => {
  return (
    <div className="card sub-card">
      <div className="card-body">
        <h5 className="card-title">{props.user.email}</h5>
      </div>
      {props.remove && (
        <div className="delete-button">
          <button
            className="btn btn-danger btn-form"
            onClick={e => props.removeFriend(props.user._id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
