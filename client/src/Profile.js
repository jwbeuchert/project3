import React, { Component } from "react";

class Profile extends Component {
  state = {
    profile: null,
    error: ""
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  }

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <div className="sub-page-body">
        <div className="sub-section">
          <h5 className="sub-header">User Profile</h5>
          <hr></hr>
          <div className="sub-container">
            <>
              <br></br>
              <br></br>
              <div>
                {/* <h1>User from Auth0</h1> */}
                <p>
                  {profile.nickname}
                  <img
                    style={{ maxWidth: 50, maxHeight: 50 }}
                    src={profile.picture}
                    alt="Profile pic"
                  />
                </p>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
                <h1>User in DB</h1>
                <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
