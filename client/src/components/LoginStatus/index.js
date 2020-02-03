import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import "./index.css";

export const LoginStatus = () => {
  const { logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div className="login-status">
          <div className="user-name">{user.name}</div>
          <button className="btn btn-primary" onClick={() => logout()}>
            Log Out
          </button>
        </div>
      )}
    </>
  );
};

export default LoginStatus;
