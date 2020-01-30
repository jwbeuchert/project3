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
  const [gift, setGift] = useState({ link: "", description: "" });

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
          <button onClick={enterGiftItem}>Enter Gift Link</button>
          <form>
            <input
              className="form-input2"
              id="giftItems"
              name="link"
              value={gift.link}
              onChange={handleChange}
            ></input>
          </form>

          <button onClick={enterGiftItem}>Enter Description</button>
          <form>
            <input
              className="form-input2"
              id="giftDescription"
              name="description"
              value={gift.description}
              onChange={handleChange}
            ></input>
          </form>
        </div>

        <div className="sub-section">
          <h5 className="sub-header">Gift List</h5>
          <div className="sub-container">
            <div className="card" id="card1">
              <div className="card-body">
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
