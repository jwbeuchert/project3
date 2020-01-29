import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Nav = props => {

  useEffect(() => {

  }, [])

  return (
    <nav className="nav-container">
      <div className="nav-flex">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/mngGivers">Gift Giver List</Link>
          </li>
          <li>
            <Link to="/lists">My Lists</Link>
          </li>
          <li>
            <Link to="/give">Give Gifts</Link>
          </li>
        </ul>
        <button className="btn btn-primary" onClick={() => props.auth.logout()}>
          {"Log Out"}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
