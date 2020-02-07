import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import NoResultCard from "../../components/NoResultCard";
import Gift from "../../components/gift";
import Chat from "../../components/chat";
import ChatMessages from "../../components/Messages";

import "./GiveGift.css"

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

  const handleGiftSelect = (giftId, isGifted) => {
    axios.put(`/api/gift/${giftId}`, { isGifted: !isGifted }).then(res => {
      axios.get(`/api/user/${dbFriend._id}`).then(res => setDbFriend(res.data));
    });
  };

  return (
    <div className="content-grid">
      <div className="section page-title">
        Gifts - {dbFriend && dbFriend.email}
      </div>
      <div className="section content-main">
        <div className="sub-header">Lists of Gifts</div>
        {dbFriend && !hasGifts ? (
          <div className="main-flex">
            <NoResultCard message="Your friend hasn't added any gifts." />
          </div>
        ) : viewableLists.length < 1 ? (
          <div className="main-flex">
            <NoResultCard message="Your friend hasn't added you to any lists." />
          </div>
        ) : (
          <>
            {viewableLists.map(list => {
              return (
                <>
                <div key={list._id} className="gift-section">
                  <div className="list-header">{list.name}</div>
                  <div className="gift-page-flex">
                    <div className="gift-list-div">
                      {list.gifts.map(gift => (
                        <Gift
                          key={gift._id}
                          gift={gift}
                          gifter={true}
                          handleGiftSelect={handleGiftSelect}
                        />
                      ))}
                    </div>
                  </div>
                  <ChatMessages listId={list._id} />
                  <Chat listId={list._id} />  
                </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default GiveGift;
