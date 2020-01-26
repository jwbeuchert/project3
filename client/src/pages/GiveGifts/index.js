import React, { useState, useEffect } from "react";
import axios from "axios";
import NoResultCard from "../../components/NoResultCard";
import User from "../../components/UserCard";

const GifterPage = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const currentUserId = "5e2cd1091aeaaf862c991b6d";

  const getUser = () => {
    axios
      .get("/api/user/" + currentUserId)
      .then(dbUser => {
          setUser(dbUser.data)
        });
  };

  useEffect(() => getUser(), []);

  return (
    <div>
      {user && user.giftees.length > 0 ? (
        user.giftees.map(giftee => {
            console.log(giftee)
          return <User key={giftee._id} giftee={giftee} />;
        })
      ) : (
        <NoResultCard key="none" type={"giftees"} />
      )}
    </div>
  );
};

export default GifterPage;
