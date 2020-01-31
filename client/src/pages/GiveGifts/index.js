import React from "react";
import NoResultCard from "../../components/NoResultCard";
import UserCard from "../../components/UserCard";
import GiveForm from "../../components/GiveForm";

const GiveGiftsPage = props => {

  return (
    <div className="sub-page-body">
      <h1 className="sub-page-header">Give Gifts</h1>
      <GiveForm user={props.user} updateUserInfo={props.updateUserInfo} />
      <div className="sub-section">
        <h5 className="sub-header">List of Friends</h5>
        <div className="sub-container">
          {props.user && props.user.giftees.length > 0 ? (
            props.user.giftees.map(giftee => {
              return <UserCard key={giftee._id} user={giftee} />;
            })
          ) : (
            <NoResultCard key="none" type={"friends"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GiveGiftsPage;
