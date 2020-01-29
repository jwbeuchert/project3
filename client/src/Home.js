import React, { Component } from "react";
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

class Home extends Component {
  state = {
    link: "",
    description: "",
    giftList: []
  };

  componentDidMount = () => {
    // API request
    console.log("Home props: ", this.props);
    axios.get(`/api/gift?userEmail=${this.props.user.email}`).then(res => {
      this.setState({
        giftList: res.data
      });
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
      description: this.state.description,
      userEmail: this.props.user.email,
      name: "zeke"
    };
    axios.post("/api/gift", newItem).then(res => {
      console.log(res);
      // put axios post data
      const newList = this.state.giftList;
      newList.push(res.data);
      this.setState({
        giftList: newList
      });
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <>

        <div className="sub-page-body">
          <h1 className="sub-page-header">Add To List</h1>
          <div className="sub-section">
            <button onClick={this.enterGiftItem}>Enter Gift Link</button>
            <form>
              <input
                className="form-input2"
                id="giftItems"
                name="link"
                value={this.state.link}
                onChange={this.handleChange}
              ></input>
            </form>


            <button onClick={this.enterGiftItem}>Enter Description</button>
            <form>
              <input
                className="form-input2"
                id="giftDescription"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              ></input>
            </form>
          </div>

          <div className="sub-section">
            <h5 className="sub-header">Gift List</h5>
            <div className="sub-container">
              <div className="card" id="card1">
                <div className="card-body">
                  {this.state.giftList.map(item => {
                    return <div>{item.link}</div>;
                  })}
                  {this.state.giftList.map(item => {
                    return <div>{item.description}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
