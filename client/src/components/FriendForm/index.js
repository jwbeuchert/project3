import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import UserCard from "../UserCard";
import NoResultCard from "../NoResultCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"

const FriendForm = () => {
  const [emailSearch, setEmailSearch] = useState("");
  const [friendReturned, setFriendReturned] = useState(null);
  const { dbUser, setDbUser } = useContext(UserContext);

  const searchForFriendByEmail = e => {
    e.preventDefault();
    if (dbUser.email === emailSearch) {
      setFriendReturned("self");
    } else {
      if (dbUser.friends.length > 0) {
        let userExists = false;
        dbUser.friends.forEach(friend => {
          if (friend.email === emailSearch) {
            userExists = true;
          }
        });
        if (userExists) {
          return setFriendReturned("exists");
        } else {
          getFriendFromEmail();
        }
      } else {
        getFriendFromEmail();
      }
    }
    console.log(friendReturned);
  };

  const getFriendFromEmail = () => {
    axios
      .get("/api/user/email/", { params: { email: emailSearch } })
      .then(dbuser => {
        if (dbuser.data) {
          console.log(`set to dbuser ${dbuser.data}`);
          setFriendReturned(dbuser.data);
        } else {
          console.log(`set to invalid`);
          setFriendReturned("invalid");
        }
      });
  };

  const addFriend = () => {
    axios
      .put(`/api/user/${dbUser._id}/${friendReturned._id}`)
      .then(dbuser => {
        console.log(dbuser.data);
        setFriendReturned(null);
        setEmailSearch("");
        setDbUser(dbuser.data);
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
            onClick={e => searchForFriendByEmail(e)}
          >
            Search
          </button>
        </div>
      </form>
      {friendReturned === "self" ? (
        <NoResultCard message="You cannot add yourself!" />
      ) : friendReturned === "exists" ? (
        <NoResultCard message="Friend is already in your list!" />
      ) : friendReturned === "invalid" ? (
        <NoResultCard message="Email not found!" />
      ) : friendReturned ? (
        <>
          <UserCard user={friendReturned} addFriend={addFriend} add={true} />
        </>
      ) : null}
    </div>
  );
};

export default FriendForm;
