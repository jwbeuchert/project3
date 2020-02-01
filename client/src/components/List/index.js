import React from "react";
import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const List = props => {
  const selectedStyleColor = useSpring({
    backgroundColor: props.isChecked ? "#baf4d3" : "white"
  });
  const fade = useSpring({
    opacity: props.isChecked ? 1 : 0
  });

  return (
    <a.div
      className="card sub-card"
      onClick={() => props.handleListClick(props.list._id)}
      style={selectedStyleColor}
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
      <a.div
        className="font-awesome c front"
        style={fade}
      >
        <FontAwesomeIcon icon={faCheckSquare} />
      </a.div>
    </a.div>
  );
};

export default List;
