import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { NavLink } from "react-router-dom";
import "./index.css";

const Nav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <nav className="nav-container">
          <div className="nav-flex">
            <div className="nav-items">
              <NavLink to="/mygifts" activeClassName="active">My Gifts</NavLink>
            </div>
            <div className="nav-items">
              <NavLink to="/lists" activeClassName="active">My Lists</NavLink>
            </div>
            <div className="nav-items">
              <NavLink to="/friends" activeClassName="active">My Friends</NavLink>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};
export default Nav;
