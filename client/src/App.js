import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import ManageGiftList from "./ManageGiftList";
import GiftGiverList from "./GiftGiverList";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";

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
        <Nav />
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
          <Route path="/ManageGiftList" component={ManageGiftList} />
          <Route path="/GiftGiverList" component={GiftGiverList} />
        </div>
      </>
    );
  }
}

export default App;
