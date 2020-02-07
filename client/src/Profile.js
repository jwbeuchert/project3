import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import Chat from "./components/chat";
import ChatMessages from "./components/Messages";


const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="sub-page-body">
        <div className="sub-section">
          <img
            style={{ maxWidth: 100, maxHeight: 100 }}
            src={user.picture}
            alt="Profile"
          />

          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <code>{JSON.stringify(user, null, 2)}</code>
        </div>
      </div>
    </>
  );
};

export default Profile;
