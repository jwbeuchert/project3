import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import ListPage from "./pages/ListPage";
import GiftGiverList from "./GiftGiverList";
import GiveGifts from "./pages/GiveGifts";
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
            render={props =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/lists"
            render={props => <ListPage auth={this.auth} {...props} />}
          />
          <Route
            path="/mngGivers"
            render={props => <GiftGiverList auth={this.auth} {...props} />}
          />
          <Route path="/give" render={props => <GiveGifts />} />
        </div>
      </>
    );
  }
}

export default App;
