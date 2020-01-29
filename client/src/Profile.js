import React, { Component } from "react";
import auth from "./Auth/Auth"

class Profile extends Component {

  render() {
    return (
      <>
        <br></br>
        <br></br>
        {auth.userProfile ? (
        <div>
          <h1>User from Auth0</h1>
          <p>
            {auth.userProfile.nickname}
            <img
              style={{ maxWidth: 50, maxHeight: 50 }}
              src={auth.userProfile.picture}
              alt="Profile pic"
            />
          </p>
          <pre>{JSON.stringify(auth.userProfile, null, 2)}</pre>
          </div>
          ) : <div>No this.auth.userProfile</div> }
          <h1>User in DB</h1>
          <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
      </>
    );
  }
}

export default Profile;
