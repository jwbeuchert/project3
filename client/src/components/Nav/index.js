import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";
import "./index.css";

const Nav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <nav className="nav-container">
          <div className="nav-flex">
            <div className="nav-items">
              <Link to="/mygifts">My Gifts</Link>
            </div>
            <div className="nav-items">
              <Link to="/lists">My Lists</Link>
            </div>
            <div className="nav-items">
              <Link to="/friends">My Friends</Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};
// test
export default Nav;
