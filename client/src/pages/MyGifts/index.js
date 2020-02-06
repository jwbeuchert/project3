import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";

import Gift from "../../components/gift";
import AnimatedCards from "../../components/AnimatedCards";
import ListCardContents from "../../components/ListCardContents";

const MyGifts = () => {
  const { dbUser, setDbUser } = useContext(UserContext);
  const [giftName, setGiftName] = useState("");
  const [giftDescription, setGiftDescription] = useState("");
  const [giftLink, setGiftLink] = useState("");
  const [giftCost, setGiftCost] = useState("");
  const [isGiftAddHidden, setIsGiftAddHidden] = useState(false);
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
      <div className="sub-page-body">
        <div className="sub-section">
          <h1 className="sub-page-header">Manage Your Gifts</h1>
        </div>
      </div>
      <div className="mygift-grid">
        <div className="mygifts-sidebar">
          <div className="sub-page-body mygift-form">
            <div className="sub-section">
              <div
                onClick={() => {
                  setIsGiftAddHidden(!isGiftAddHidden);
                }}
              >
                <h5 className="sub-header">Add a Gift</h5>
              </div>
              <div
                style={
                  isGiftAddHidden ? { display: "none" } : { display: "block" }
                }
              >
                <h6>Enter a name of the gift</h6>
                <form>
                  <input
                    className="mygifts-form-input form-control"
                    id="name"
                    name="name"
                    value={giftName}
                    onChange={e => handleChange(e)}
                  />
                  <h6>
                    Copy and paste the link (address bar) of the gift you want
                    to add
                  </h6>
                  <input
                    className="mygifts-form-input form-control"
                    id="link"
                    name="link"
                    value={giftLink}
                    onChange={e => handleChange(e)}
                  />

                  <h6>Paste a description if desired</h6>
                  <input
                    className="mygifts-form-input form-control"
                    id="description"
                    name="description"
                    value={giftDescription}
                    onChange={e => handleChange(e)}
                  />

                  <h6>Cost of item</h6>
                  <input
                    className="mygifts-form-input form-control"
                    id="cost"
                    name="cost"
                    value={giftCost}
                    onChange={e => handleChange(e)}
                  />
                  <br></br>
                  <button
                    className="btn btn-primary"
                    onClick={e => enterGiftItem(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="sub-page-body mygift-gifts">
          <div className="sub-section">
            <h5 className="sub-header">Manage Your Gifts</h5>
            <div className="sub-container">
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
                              className="sub-page-body mygift-lists"
                              style={
                                giftSelected === gift._id
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <div className="sub-section">
                                <div className="mygift-lists">
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
                            </div>
                          </>
                        ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGifts;
