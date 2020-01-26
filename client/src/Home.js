import React, { Component } from "react";
import { Link } from "react-router-dom";
import Xmas from "../src/components/Images/mistletoe.jpg";
import Birthday from "../src/components/Images/birthday.jpeg";
import Wedding from "../src/components/Images/rings.jpeg";

const giftLinks = [
  {
    link: "abc"
  },
  {
    link: "123"
  },
  {
    link: "c2a"
  }
];

class Home extends Component {
  state = {
    link: "",
    description: "",
    giftList: []
  };

  componentDidMount = () => {
    // API request
    // axios.get
    // .then.response
    // followed by
    this.setState({
      giftList: giftLinks
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  enterGiftItem = () => {
    const newItem = {
      link: this.state.link,
      description: this.state.description
    };
    console.log(newItem);
    // put axios post data
    const newList = this.state.giftList;
    newList.push(newItem);
    this.setState({
      giftList: newList
    });
  };

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

        <div>
          <button onClick={this.enterGiftItem}>Enter Gift Item</button>
          <form>
            <input
              id="giftItems"
              name="link"
              value={this.state.link}
              onChange={this.handleChange}
            ></input>

            <button onClick={this.enterGiftItem}>Enter Description</button>
            <input
              id="giftDescription"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            ></input>
          </form>
        </div>

        {this.state.giftList.map(item => {
          return <div>{item.link}</div>;
        })}

        <div className="row">
          <div className="col-md-12">
            <h1>Will need to move this file to pages?</h1>
          </div>
          <div className="col-md-12">
            <h1>Add to Nav Edit List Edit Friends See Friends</h1>
          </div>
          <div className="col-md-12">
            <h1>
              Set up an page in components for gift and description to populate
              and edit?
            </h1>
          </div>
          <div className="col-md-12">
            <h1>Creat A Form for new gift</h1>
          </div>
          <div className="col-md-12">
            <h1>Creat a Form for description</h1>
          </div>
          <div className="col-md-12">
            <h1>Create a Container for gifts to populate</h1>
          </div>
          <div className="col-md-12">
            <h1>In GiftFriend create 2 containers for gift and chat</h1>
          </div>
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
