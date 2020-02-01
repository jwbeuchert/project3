import React, { useContext } from "react";
import NoResultCard from "../../components/NoResultCard";
import UserCard from "../../components/UserCard";
import { UserContext } from "../../utils/UserContext";

const GiveGiftsPage = () => {
  const { dbUser } = useContext(UserContext);

  return (
    <div className="sub-page-body">
      <div className="sub-section">
        <h1 className="sub-page-header">Give Gifts</h1>
      </div>
      <div className="sub-section">
        <h5 className="sub-header">Friend Lists/Gifts</h5>
        <div className="sub-container">
          {dbUser && dbUser.friends.length > 0 ? (
            dbUser.friends.map(friend => {
              return <UserCard key={friend._id} user={friend} />;
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

export default GiveGiftsPage;