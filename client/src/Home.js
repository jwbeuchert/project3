import React, { Component } from "react";
import Xmas from "../src/components/Images/mistletoe.jpg";
import Birthday from "../src/components/Images/birthday.jpeg";
import Wedding from "../src/components/Images/rings.jpeg";

class Home extends Component {
  render() {
    return (
      <>
        {/* <div> */}
        <div>
          <button onClick={this.props.auth.login}>Log In</button>
        </div>
        <hr></hr>
        <br></br>
        <div class="row">
          <div class="col-md-12">
            <img src={Xmas} id="pic1" alt="mistletoe"></img>
            <h1>Christmas Wish List</h1>
          </div>
        </div>
        <br></br>
        <div class="row">
          <div class="col-md-12">
            <img src={Birthday} id="pic2" alt="birthday"></img>
            <h1>Birthday Wish list</h1>
          </div>
        </div>
        <br></br>
        <div class="row">
          <div class="col-md-12">
            <img src={Wedding} id="pic3" alt="rings"></img>
            <h1>Wedding Wish list</h1>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default Home;
