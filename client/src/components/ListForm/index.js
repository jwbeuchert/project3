import React, { useState } from "react";
import "./ListForm.css"

const ListForm = props => {
  const [listname, setListname] = useState("");

  return (
    <div>
      <form>
        <input
          type="text"
          className="form-control form-input"
          id="list-name-input"
          placeholder="Enter a new list name"
          value={listname}
          onChange={e => setListname(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={e => {
            props.createList(e, listname);
            setListname("");
          }}
        >
          Add List
        </button>
      </form>
    </div>
  );
};

export default ListForm;
