import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";

import Gift from "../../components/gift";
import AnimatedCards from "../../components/AnimatedCards";
import ListCardContents from "../../components/ListCardContents";
import GiftForm from "../../components/GiftForm";

const MyGifts = () => {
  const { dbUser, setDbUser } = useContext(UserContext);
  const [giftName, setGiftName] = useState("");
  const [giftDescription, setGiftDescription] = useState("");
  const [giftLink, setGiftLink] = useState("");
  const [giftCost, setGiftCost] = useState("");
  const [giftSelected, setGiftSelected] = useState(null);
  const [listsSelected, setListsSelected] = useState([]);

  useEffect(() => {
    if (giftSelected) {
      axios.get(`/api/gift/${giftSelected}`).then(dbGift => {
        let newArray = [];
        dbGift.data.lists.forEach(list => {
          newArray.push(list);
        });
        setListsSelected(newArray);
      });
    } else {
      setListsSelected([]);
    }
  }, [giftSelected, dbUser]);

  const handleChange = e => {
    if (e.target.name === "name") {
      setGiftName(e.target.value);
    } else if (e.target.name === "description") {
      setGiftDescription(e.target.value);
    } else if (e.target.name === "link") {
      setGiftLink(e.target.value);
    } else if (e.target.name === "cost") {
      setGiftCost(e.target.value);
    }
  };

  const enterGiftItem = e => {
    e.preventDefault();
    let allGift = dbUser.lists.filter(el => el.name === "All Gifts");
    let allGiftId = allGift[0]._id;
    let gift = {
      name: giftName,
      description: giftDescription,
      link: giftLink,
      cost: giftCost
    };
    if (!/^https?:\/\//.test(giftLink)) {
      gift.link = `https://${giftLink}`;
    }

    setGiftName("");
    setGiftLink("");
    setGiftDescription("");
    setGiftCost("");

    axios.post(`/api/gift/${allGiftId}`, gift).then(res => {
      axios.get(`/api/user/${dbUser._id}`).then(res => {
        setDbUser(res.data);
      });
    });
  };

  const selectGift = giftId => {
    if (giftSelected === giftId) {
      setGiftSelected(null);
    } else {
      setGiftSelected(giftId);
    }
  };

  const findListsSelectedState = id => {
    return listsSelected.includes(id);
  };

  const handleSelect = listId => {
    if (!findListsSelectedState(listId)) {
      axios.put(`/api/gift/${giftSelected}/${listId}`).then(resList => {
        axios.get(`/api/user/${dbUser._id}`).then(resUser => {
          setDbUser(resUser.data);
        });
      });
    } else {
      axios.delete(`/api/gift/${giftSelected}/${listId}`).then(resList => {
        axios.get(`/api/user/${dbUser._id}`).then(resUser => {
          setDbUser(resUser.data);
        });
      });
    }
  };

  return (
    <>
      <div className="content-grid">
        <div className="section page-title">Manage Your Gifts</div>
        <div className="content-sidebar">
          <div className="section">
            <div className="sub-header">Add a Gift</div>
            <GiftForm
              giftName={giftName}
              giftLink={giftLink}
              giftDescription={giftDescription}
              giftCost={giftCost}
              handleChange={handleChange}
              enterGiftItem={enterGiftItem}
            />
          </div>
        </div>
        <div className="content-main section">
          <div className="sub-header">Manage Your Gifts</div>
          <div className="main-flex">
            {dbUser &&
              dbUser.lists.map(list => {
                return (
                  <div key={list._id} className="gift-section">
                    {list.name === "All Gifts" &&
                      list.gifts.map(gift => (
                        <>
                          <div
                            key={gift._id}
                            onClick={() => selectGift(gift._id)}
                          >
                            <Gift gift={gift} myGift={true} />
                          </div>
                          <div
                            className="section main-flex"
                            style={
                              giftSelected === gift._id
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            Click on a list to add a gift.
                            <div className="main-flex">
                              {dbUser &&
                                dbUser.lists.map(list => (
                                  <>
                                    {list.name !== "All Gifts" && (
                                      <AnimatedCards
                                        key={list._id}
                                        item={list}
                                        myGift={true}
                                        handleSelect={handleSelect}
                                        isChecked={findListsSelectedState(
                                          list._id
                                        )}
                                        cardBody={
                                          <ListCardContents
                                            key={list._id}
                                            list={list}
                                            myGift={true}
                                          />
                                        }
                                      />
                                    )}
                                  </>
                                ))}
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGifts;
