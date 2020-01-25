import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Container, Row, Col } from "reactstrap";
import Xmas from "../src/components/Images/mistletoe.jpg";
import Birthday from "../src/components/Images/birthday.jpeg";
import Wedding from "../src/components/Images/rings.jpeg";
import Chat from "../src/components/chat";

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <>
        <div>
          {/* Only show login when user not authenticated */}
          {isAuthenticated() ? (
            // If authenticated show Profile page
            <Link to="/Profile" id="LoggedIn">
              View My Profile
            </Link>
          ) : (
            <button onClick={login}>Log In</button>
          )}
        </div>
        <hr></hr>
        <br></br>
        <div className="row">
          <div className="col-md-12">
            <img src={Xmas} id="pic1" alt="mistletoe"></img>
            <h1>Christmas Wish List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <img src={Birthday} id="pic2" alt="birthday"></img>
            <h1>Birthday Wish list</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <img src={Wedding} id="pic3" alt="rings"></img>
            <h1>Wedding Wish list</h1>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
