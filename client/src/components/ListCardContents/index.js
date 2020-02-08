import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const ListCardContents = props => {

  return (
    <>
      <div className="card-body">
        <h5 className="card-title">{props.list.name}</h5>
      </div>
      {props.list.name === "All Gifts" || props.myGift ? (
        <></>
      ) : (
        <div className="font-awesome delete-button">
          <FontAwesomeIcon
            className="fa-times"
            icon={faTimes}
            onClick={() => props.deleteList(props.list._id)}
          />
        </div>
      )}
    </>
  );
};

export default ListCardContents;
