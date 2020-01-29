import React, { useState, useEffect } from "react";
import axios from "axios";

import UserCard from "../UserCard";
import NoResultCard from "../NoResultCard";

const GiveForm = props => {
  const [emailSearch, setEmailSearch] = useState("");
  const [userReturned, setUserReturned] = useState(null);

  const searchForUserByEmail = e => {
    e.preventDefault();
    if (props.user.email === emailSearch) {
      setUserReturned("self");
    } else {
      if (props.user.giftees.length > 0) {
        let userExists = false;
        props.user.giftees.forEach(giftee => {
          if (giftee.email === emailSearch) {
            userExists = true;
          }
        });
        if (userExists) {
          return setUserReturned("exists");
        } else {
          getUserFromEmail();
        }
      } else {
        getUserFromEmail();
      }
    }
  };

  const getUserFromEmail = () => {
    axios.post("/api/user/email", { email: emailSearch }).then(dbuser => {
      if (dbuser.data) {
        console.log(`set to dbuser ${dbuser.data}`)
        setUserReturned(dbuser.data);
      } else {
        console.log(`set to invalid`)
        setUserReturned("invalid");
      }
    });
  };

  const addFriend = e => {
    e.preventDefault();
    axios
      .put("/api/user/" + props.user._id + "/" + userReturned._id)
      .then(dbuser => {
        console.log(dbuser.data);
        setUserReturned(null);
        setEmailSearch("");
        props.updateUserInfo();
      });
  };

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
      {userReturned === "self" ? (
        <NoResultCard noResults="You cannot add yourself!" />
      ) : userReturned === "exists" ? (
        <NoResultCard noResults="Friend is already in your list!" />
      ) : userReturned === "invalid" ? (
        <NoResultCard noResults="Email not found!" />
      ) : userReturned ? (
        <>
          <UserCard user={userReturned} />
          <button className="btn btn-success" onClick={e => addFriend(e)}>
            Add Friend
          </button>
        </>
      ) : null}
    </div>
  );
};

export default GiveForm;
