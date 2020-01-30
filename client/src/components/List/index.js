import React from "react";

const List = props => {
  return (
    <div className="card sub-card">
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
    </div>
  );
};

export default List;
