import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import axios from "axios";
import history from "./utils/history";
import Home from "./Home";
import Profile from "./Profile";
import GiftLists from "./pages/GiftLists";
import GiftGiverList from "./GiftGiverList";
import GiveGifts from "./pages/GiveGifts";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Header from "./components/Header";
import "./App.css";

class App extends Component {
  constructor(props) {
    // ES6 class constructors MUST call super if they are subclasses. Thus, you have to call super() as long as you have a constructor.
    // Call super(props) only if you want to access this.props inside the constructor. React automatically set it for you if you want to access it anywhere else. The effect of passing props when calling super() allows you to access this.props in the constructor:
    super(props);
    this.auth = new Auth(history);
    this.state = { user: null, loaded: false };
    this.getOrCreateDBUser = this.getOrCreateDBUser.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentDidMount() {
    console.log("did mount");
    console.log(`LOCAL STORAGE TOKEN: ${localStorage.getItem("access_token")}`);
    if (this.auth.authResult) {
      console.log(`AUTH STORAGE TOKEN: ${this.auth.authResult.accessToken}`);
    } else {
      console.log("no auth result");
    }
    console.log(
      this.auth.userProfile
        ? `DID MOUNT auth profile: ${this.auth.userProfile.email}`
        : "no auth userProfile"
    );
      setTimeout(() => {
        if (this.auth.isAuthenticated()) {
          this.updateUserInfo();
        }
      }, 500);
    }

  updateUserInfo() {
    let userEmail = null;
    if (this.auth.userProfile) {
      userEmail = this.auth.userProfile.email
    } else if (localStorage.getItem("userProfile")) {
      userEmail = localStorage.getItem("userProfile").email
    }
      axios
        .post("/api/user", { email: userEmail })
        .then(dbUser => {
          this.setState({ user: dbUser.data });
          console.log("DBCALL");
          console.log(localStorage.getItem("access_token"));
          console.log(
            `This app state user: ${JSON.stringify(this.state.user)}`
          );
        });
    }

  render() {

    const { isAuthenticated } = this.auth;
    return (
      <Router history={history}>
        <Header />
        {isAuthenticated() ? (
          <Nav auth={this.auth} user={this.state.user} />
        ) : (
          <></>
        )}
        <Route
          path="/"
          exact
          render={props =>
            !isAuthenticated() ? (
              <Login auth={this.auth} />
            ) : (
              <Home auth={this.auth} {...props} />
            )
          }
        />
        <Route
          path="/profile"
          render={props =>
            isAuthenticated() ? (
              <Profile auth={this.auth} user={this.state.user} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/lists"
          render={props => (
            <GiftLists
              user={this.state.user}
              updateUserInfo={this.updateUserInfo}
            />
          )}
        />
        <Route
          path="/give"
          render={props => (
            <GiveGifts
              user={this.state.user}
              updateUserInfo={this.updateUserInfo}
            />
          )}
        />
        <Route
          path="/mngGivers"
          render={props => <GiftGiverList auth={this.auth} {...props} />}
        />
        <Route
          path="/login"
          render={props => <Login auth={this.auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => <Callback auth={this.auth} {...props} />}
        />
      </Router>
    );
  }
}

export default App;
