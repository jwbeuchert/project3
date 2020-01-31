import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const List = props => {
  let isCheckedStyle = props.isChecked ? {backgroundColor: "#baf4d3"} : null
  return (
    <div
      className="card sub-card"
      onClick={() => props.handleListClick(props.list._id)}
      style={isCheckedStyle}
    >
      <div className="card-body">
        <h5 className="card-title">{props.list.name}</h5>
      </div>
      {props.list.name === "All Gifts" ? (
        <></>
      ) : (
        <div className="del-list">
          <button
            className="btn btn-danger btn-form"
            onClick={e => props.deleteList(e, props.list._id)}
          >
            Delete
          </button>
        </div>
      )}
      {props.isChecked && (
        <div className="font-awesome">
          <FontAwesomeIcon icon={faCheckSquare} />
        </div>
      )}
    </div>
  );
};

export default List;
