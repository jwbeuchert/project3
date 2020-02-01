import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import "./index.css";

const Nav = () => {
  const { isAuthenticated, logout, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <nav className="nav-container">
          <span className="d-inline-flex">
            <h3 className="userName">Welcome, {user.name}</h3>
            <button className="btn btn-primary" onClick={() => logout()}>
              Log Out
            </button>
          </span>
          <div className="nav-flex">
            <div className="nav-items">
              <Link to="/home">Home</Link>
            </div>
            <div className="nav-items">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="nav-items">
              <Link to="/mngGivers">Gift Giver List</Link>
            </div>
            <div className="nav-items">
              <Link to="/lists">My Lists</Link>
            </div>
            <div className="nav-items">
              <Link to="/give">Give Gifts</Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Nav;
