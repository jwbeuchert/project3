import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import NoResultCard from "../../components/NoResultCard";
import Gift from "../../components/gift";
import { UserContext } from "../../utils/UserContext";

const GiveGift = props => {
  const { dbUser } = useContext(UserContext);
  const [dbFriend, setDbFriend] = useState(null);
  const [viewableLists, setViewableLists] = useState([]);
  const [hasGifts, setHasGifts] = useState(false);
  const { friendId } = props.location.state;

  useEffect(() => {
    axios.get(`/api/user/${friendId}`).then(res => {
      setDbFriend(res.data);
      res.data.lists.forEach(list => {
        if (list.gifts.length > 0) {
          return setHasGifts(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    let newArray = [];
    if (dbFriend) {
      dbFriend.lists.forEach(list => {
        if (list.gifts.length > 0) {
          list.gifters.forEach(gifter => {
            if (gifter._id === dbUser._id) {
              newArray = newArray.concat(list);
            }
          });
        }
      });
      setViewableLists(newArray);
    }
  }, [dbFriend]);

  return (
    <div className="sub-page-body">
      <div className="sub-section">
        <h1 className="sub-page-header">
          Gifts - {dbFriend && dbFriend.email}
        </h1>
      </div>
      <div className="sub-section">
        <h5 className="sub-header">
          Lists of Gifts
        </h5>
        <div className="sub-container">
          {dbFriend && !hasGifts ? (
            <NoResultCard message="Your friend hasn't added any gifts." />
          ) : viewableLists.length < 1 ? (
            <NoResultCard message="Your friend hasn't added you to any lists." />
          ) : (
            <>
              {viewableLists.map(list => {
                return (
                  <div key={list._id} className="sub-section">
                    <h5 className="sub-container">
                      {list.name}
                    </h5>
                    {list.gifts.map(gift => (
                      <Gift key={gift._id} gift={gift} />
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiveGift;
