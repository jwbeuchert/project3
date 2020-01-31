import React, { useState, useContext } from "react";
import { UserContext } from "./utils/UserContext";
import axios from "axios";

const Home = () => {
  const { dbUser, setDbUser } = useContext(UserContext);
  const [giftName, setGiftName] = useState("");
  const [giftDescription, setGiftDescription] = useState("");
  const [giftLink, setGiftLink] = useState("");
  const [giftCost, setGiftCost] = useState(0);

  const handleChange = e => {
    if (e.target.name === "name") {
      setGiftName(e.target.value);
    } else if (e.target.name === "description") {
      setGiftDescription(e.target.value);
    } else if (e.target.name === "link") {
      setGiftLink(e.target.value);
    }
  };

  const enterGiftItem = e => {
    e.preventDefault();
    let allGift = dbUser.lists.filter(el => el.name === "All Gifts");
    let allGiftId = allGift[0]._id;
    console.log(allGiftId);
    let gift = { name: giftName, description: giftDescription, link: giftLink };
    console.log(gift);

    axios.post("/api/gift/" + allGiftId, gift).then(res => {
      console.log(res);
    });
  };

  return (
    <>
      <div>{dbUser && dbUser._id}</div>
      <div className="sub-page-body">
        <h1 className="sub-page-header">Add To List</h1>
        <div className="sub-section">
          {dbUser &&
            dbUser.lists.map(list =>
              list.gifts.map(gift => <h1>{gift.name} q</h1>)
            )}
          <form>
            <input
              className="form-input2"
              id="link"
              name="link"
              value={giftLink}
              onChange={e => handleChange(e)}
            ></input>
            <input
              className="form-input2"
              id="description"
              name="description"
              value={giftDescription}
              onChange={e => handleChange(e)}
            ></input>
            <input
              className="form-input2"
              id="name"
              name="name"
              value={giftName}
              onChange={e => handleChange(e)}
            ></input>
            <button onClick={e => enterGiftItem(e)}>Enter Gift Link</button>
          </form>
        </div>

        <div className="sub-section">
          <h5 className="sub-header">Gift List</h5>
          <div className="sub-container">
            <div className="card" id="card1">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
