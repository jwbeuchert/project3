import React from "react";
import axios from "axios";

function Gift() {

  function getGifts() {
    axios
    .get("/api/gift").then(giftsDB =>
      console.log(giftsDB.request.response)
    )
  }
  return (<h1 onClick={getGifts} >Gift</h1>)
}

export default Gift
