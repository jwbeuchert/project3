import React from "react";
import "./GiftForm.css"

const GiftForm = ({
  giftName,
  giftLink,
  giftDescription,
  giftCost,
  handleChange,
  enterGiftItem
}) => {
  return (
    <div>
      <form>
        <label forhtml="name">Enter a name of the gift</label>
        <input
          className="form-input form-control"
          id="name"
          name="name"
          value={giftName}
          onChange={e => handleChange(e)}
        />
        <label forhtml="link">
          Copy and paste the link (address bar) of the gift you want to add
        </label>
        <input
          className="form-input form-control"
          id="link"
          name="link"
          value={giftLink}
          onChange={e => handleChange(e)}
        />
        <label forhtml="cost">Cost of item</label>
        <input
          className="form-input form-control"
          id="cost"
          name="cost"
          value={giftCost}
          onChange={e => handleChange(e)}
        />
        <label forhtml="description">Paste a description if desired</label>
        <textarea
          rows="6"
          className="form-input form-control"
          id="description"
          name="description"
          value={giftDescription}
          onChange={e => handleChange(e)}
        />
        <br></br>
        <button className="btn btn-primary" onClick={e => enterGiftItem(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GiftForm;
