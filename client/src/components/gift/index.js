import React, { useContext } from "react";
import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingUsd,
  faUndoAlt,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

import { UserContext } from "../../utils/UserContext";
import "./index.css";

const Gift = props => {
  const { dbUser, setDbUser } = useContext(UserContext);

  const isGiftedStyle = useSpring({
    backgroundColor: props.gift.isGifted ? "#9e9e9e" : "white",
    opacity: props.gift.isGifted ? 0.6 : 1
  });

  const handleDelete = () => {
    Axios.delete(`/api/gift/${props.gift._id}`).then(res => {
      console.log(res.data);
      Axios.get(`/api/user/${dbUser._id}`).then(res => setDbUser(res.data));
    });
  };

  return (
    <a.div className="card gift-card" style={isGiftedStyle}>
      <div className="gift-grid">
        <div className="gift-title">{props.gift.name}</div>
        <div className="gift-cost">{`Cost: ${props.gift.cost}`}</div>
        <div className="gift-link">
          <a target="_blank" href={props.gift.link} rel="noopener noreferrer">
            Link to Gift
          </a>
        </div>
        <div className="gift-desc">
          <h6 className="gift-desc-label">Gift Description</h6>
          <p>{props.gift.description}</p>
        </div>
      </div>
      {props.myGift && (
        <>
          <div
            className="font-awesome delete-button"
            onClick={() => handleDelete()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="add-gift-to-list-div">Add Gift to Lists</div>
        </>
      )}
      {props.gifter && (
        <div
          className={
            !props.gift.isGifted
              ? "font-awesome fa-gift-select"
              : "font-awesome fa-gift-return"
          }
          onClick={() =>
            props.handleGiftSelect(props.gift._id, props.gift.isGifted)
          }
        >
          <FontAwesomeIcon
            icon={!props.gift.isGifted ? faHandHoldingUsd : faUndoAlt}
          />
        </div>
      )}
    </a.div>
  );
};
export default Gift;
