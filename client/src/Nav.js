import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/mngList">Manage Gift List</Link>
          </li>
          <li>
            <Link to="/mngGivers">Gift Giver List</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
