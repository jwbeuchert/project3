import React, { useState } from "react";

const ListForm = (props) => {
  const [listname, setListname] = useState("");

  return (
    <form className="list-form">
        <h5 className="sub-header">Create a New List</h5>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="list-name-input"
          placeholder="Enter a new list name"
          value={listname}
          onChange={e => setListname(e.target.value)}
        />
      <button className="btn btn-primary" onClick={e => { props.createList(e, listname); setListname("") } }>Add List</button>
      </div>
    </form>
  );
};

export default ListForm;
