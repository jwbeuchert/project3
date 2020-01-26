import React, { Component, useReducer } from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  console.log(`NAV: ${props.user}`)
  return (
    <nav>
      {!props.auth.isAuthenticated() ? (
        <></>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/lists">My Lists</Link>
          </li>
          <li>
            <Link to="/mngGivers">Gift Giver List</Link>
          </li>
          <li>
            <Link to="/give">Give Gifts</Link>
          </li>
          <button className="btn btn-primary" onClick={() => props.auth.logout()}>
            {"Log Out"}
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
