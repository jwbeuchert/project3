import React from "react";
import UserCard from "../../components/UserCard";

export default function AnimatedCards(props) {
  return (
    <div className="sub-section add-friend-to-list">
      <h5 classname="sub-header">{props.title}</h5>
      <div className="sub-container">
        {props.user &&
          props.user.friends.map(friend => <UserCard user={friend} />)}
      </div>
    </div>
  );
}
