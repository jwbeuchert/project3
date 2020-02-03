import React, { useContext } from "react";
import NoResultCard from "../../components/NoResultCard";
import UserCard from "../../components/UserCard";
import FriendForm from "../../components/FriendForm";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";

const Friends = () => {
  const { dbUser, setDbUser } = useContext(UserContext);

  const removeFriend = friendId => {
    axios.delete(`/api/user/${dbUser._id}/${friendId}`)
      .then(dbUser => {
        console.log(dbUser)
        setDbUser(dbUser.data)
      })
  };

  return (
    <div className="sub-page-body">
      <div className="sub-section">
        <h1 className="sub-page-header">Manage Friends</h1>
      </div>
      <div className="sub-section">
        <FriendForm />
      </div>
      <div className="sub-section">
        <h5 className="sub-header">List of Friends</h5>
        <div className="sub-container">
          {dbUser && dbUser.friends.length > 0 ? (
            dbUser.friends.map(friend => {
              return (
                <UserCard
                  key={friend._id}
                  user={friend}
                  removeFriend={removeFriend}
                  remove={true}
                  giftee={true}
                />
              );
            })
          ) : (
            <NoResultCard
              key="none"
              message={"You haven't added any friends!"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
