import React, { useState } from "react";
import Gift from "../gift";
{props.user && props.user.gift.length > 0 ? (
  props.user.lists.map(gift => (
    <Gift
      key={gift._id}
      list={gift}
      deleteList={deleteGift}
      noGift={false}
    />
  ))
) : (
  <NoResultCard type={"gift"} />
)}

export default Gift;