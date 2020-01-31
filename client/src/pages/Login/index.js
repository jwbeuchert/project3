import React from "react";
import "./index.css";

const Login = (props) => {

  return (
    <div className="d-flex justify-content-center">
      <div className="login-container col-6 d-flex justify-content-center">
        <div className="login-contents">
          <h4>Please log into the site.</h4>
          <div className="d-flex justify-content-center">
            <button 
              className="btn btn-primary align-self-center login-btn" 
              onClick={() => props.auth.login()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
