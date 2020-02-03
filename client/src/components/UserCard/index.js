import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserPlus, faGifts } from "@fortawesome/free-solid-svg-icons";

const UserCard = props => {
  return (
    <div className="card sub-card">
      <div className="card-body">
        <h5 className="card-title">{props.user.email}</h5>
      </div>
      {props.remove && (
        <div className="font-awesome delete-button">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => props.removeFriend(props.user._id)}
          />
        </div>
      )}
      {props.add && (
        <div className="font-awesome fa-friend-add-div">
          <FontAwesomeIcon
            icon={faUserPlus}
            onClick={() => props.addFriend()}
          />
        </div>
      )}
      {props.giftee && (
        <div className="font-awesome fa-friend-add-div">
        <FontAwesomeIcon
          icon={faGifts}
          onClick={() => props.addFriend()}
        />
      </div>
      )}

    </div>
  );
};

export default UserCard;
