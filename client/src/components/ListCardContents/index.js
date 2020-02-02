import React from "react";

const ListCardContents = props => {

  return (
    <>
      <div className="card-body">
        <h5 className="card-title">{props.list.name}</h5>
      </div>
      {props.list.name === "All Gifts" ? (
        <></>
      ) : (
        <div className="delete-button">
          <button
            className="btn btn-danger btn-form"
            onClick={e => props.deleteList(e, props.list._id)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default ListCardContents;
