import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import axios from "axios"
import history from "./utils/history";
import Home from "./Home";
import Profile from "./Profile";
import ListPage from "./pages/ListPage";
import GiftGiverList from "./GiftGiverList";
import GiveGifts from "./pages/GiveGifts";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    // ES6 class constructors MUST call super if they are subclasses. Thus, you have to call super() as long as you have a constructor.
    // Call super(props) only if you want to access this.props inside the constructor. React automatically set it for you if you want to access it anywhere else. The effect of passing props when calling super() allows you to access this.props in the constructor:
    super(props);
    this.auth = new Auth(history);
    this.state = { user: null };
    this.getOrCreateDBUser = this.getOrCreateDBUser.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentDidMount() {
    console.log("did mount");
    setTimeout(() => {
    if (this.auth.isAuthenticated()) {
      this.getOrCreateDBUser()
    }
    }, 500)
  }

  getOrCreateDBUser() {
    this.auth.getProfile((profile, error) => {
      console.log(this.auth.isAuthenticated());
      console.log(localStorage.getItem("access_token"));
      console.log(profile)
      if (!error) {
        axios.post("/api/user", 
        { email: profile.email })
        .then(dbUser => this.setState({user: dbUser.data}))
      }
    });
  }

  updateUserInfo() {
    axios.post("/api/user", 
    { email: this.state.user.email })
    .then(dbUser => this.setState({user: dbUser.data}))
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <Nav auth={this.auth} user={this.state.user}/>
        <Route
          path="/"
          exact
          render={props =>
            !this.auth.isAuthenticated() ? (
              <Login auth={this.auth} />
            ) : (
              <>
                <Home auth={this.auth} {...props} />
              </>
            )
          }
        />
        <Route
          path="/profile"
          render={props =>
            this.auth.isAuthenticated() ? (
              <Profile auth={this.auth} user={this.state.user} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/lists"
          render={props => <ListPage user={this.state.user} updateUserInfo={this.updateUserInfo} />}
        />
        <Route
          path="/mngGivers"
          render={props => <GiftGiverList auth={this.auth} {...props} />}
        />
        <Route
          path="/give"
          render={props => <GiveGifts user={this.state.user} />}
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
