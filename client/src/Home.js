import React, { useState, useContext } from "react";
import { UserContext } from "./utils/UserContext";
import axios from "axios";

const giftLinks = [
  {
    Image: ""
  },
  {
    link: ""
  },
  {
    description: ""
  }
];

const Home = () => {
  const { dbUser, setDbUser } = useContext(UserContext);
  const [gift, setGift] = useState({
    name: "",
    link: "",
    description: "",
    cost: ""
  });

  const handleChange = event => {
    setGift({
      [event.target.name]: event.target.value
    });
  };

  const enterGiftItem = () => {
    // axios.post("/api/gift", gift).then(res => {
    //   console.log(res);
    // });
  };

  return (
    <>
      <div>{dbUser && dbUser._id}</div>
      <div className="sub-page-body">
        <h1 className="sub-page-header">Add To List</h1>
        <div className="sub-section">
          <h5>
            Copy and paste the link (address bar) of the gift you want to add
          </h5>
          <form>
            <input
              className="form-input2"
              id="giftItems"
              name="link"
              value={gift.link}
              onChange={handleChange}
            ></input>
          </form>

          <h5>Copy and paste the description if desired</h5>
          <form>
            <input
              className="form-input2"
              id="giftDescription"
              name="description"
              value={gift.description}
              onChange={handleChange}
            ></input>
          </form>
          <button onClick={enterGiftItem}>Enter Gift Link</button>
        </div>

        <div className="sub-section">
          <h5 className="sub-header">Gift List</h5>
          <div className="sub-container">
            <div className="card" id="card1">
              <div className="card-body">
                {dbUser &&
                  dbUser.lists.map(list =>
                    list.gifts.map(gift => <h1>{gift.name}</h1>)
                  )}
                {/* {.map(item => {
                    return <div>{item.link}</div>;
                  })}
                  {this.state.giftList.map(item => {
                    return <div>{item.description}</div>; */}
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
