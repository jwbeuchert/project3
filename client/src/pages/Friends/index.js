import React, { useContext } from "react";
import NoResultCard from "../../components/NoResultCard";
import UserCard from "../../components/UserCard";
import FriendForm from "../../components/FriendForm";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";

const Friends = () => {
  const { dbUser, setDbUser } = useContext(UserContext);

  const removeFriend = friendId => {
    axios.delete(`/api/user/${dbUser._id}/${friendId}`).then(dbUser => {
      console.log(dbUser);
      setDbUser(dbUser.data);
    });
  };

  return (
    <div className="content-grid">
      <div className="section page-title">Manage Friends</div>
      <div className="content-sidebar">
        <div className="section">
          <div className="sub-header">Add a Friend</div>
          <FriendForm />
        </div>
      </div>
      <div className="section">
        <div className="sub-header">List of Friends</div>
        <div className="content-main main-flex">
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
