import React, { useState } from "react";
import axios from "axios";

import UserCard from "../UserCard"

const GiveForm = props => {
  const [emailSearch, setEmailSearch] = useState("");
  const [userReturned, setUserReturned] = useState(null);

  const searchForUserByEmail = e => {
    e.preventDefault();
    axios
      .post("/api/user/email", { email: emailSearch })
      .then(dbuser => {
          if (dbuser) {
            setUserReturned(dbuser.data)
          }
        })
  };

  const addFriend = e => {
      e.preventDefault()
      axios.put("/api/user/" + props.user._id + "/" + userReturned._id)
        .then(dbuser => {
            console.log(dbuser.data)
            setUserReturned(null)
            props.updateUserInfo()
        })
  }

  return (
    <div className="sub-form">
      <form>
        <h5 className="sub-header">Search for a Friend by Email</h5>
        <div className="form-group">
          <input
            type="email"
            className="form-control form-input"
            id="email-input"
            placeholder="Enter friends email address"
            value={emailSearch}
            onChange={e => setEmailSearch(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={e => searchForUserByEmail(e)}
          >
            Search
          </button>
        </div>
      </form>
      {userReturned ? 
      ( <><UserCard user={userReturned} /> 
        <button className="btn btn-success" onClick={e => addFriend(e)}>Add Friend</button></>
      ): null}
    </div>
  );
};

export default GiveForm;
