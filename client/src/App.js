import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import ManageGiftList from "./ManageGiftList";
import GiftGiverList from "./GiftGiverList";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    // ES6 class constructors MUST call super if they are subclasses. Thus, you have to call super() as long as you have a constructor.
    // Call super(props) only if you want to access this.props inside the constructor. React automatically set it for you if you want to access it anywhere else. The effect of passing props when calling super() allows you to access this.props in the constructor:
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Header />
        <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            render={props => <Profile auth={this.auth} {...props} />}
          />
          <Route
            path="/mngList"
            render={props => <ManageGiftList auth={this.auth} {...props} />}
          />
          <Route
            path="/mngGivers"
            render={props => <GiftGiverList auth={this.auth} {...props} />}
          />
        </div>
      </>
    );
  }
}

export default App;
