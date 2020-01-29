import auth0 from "auth0-js";
import axios from "axios";

// Declare Auth class to handle authentication
export default class Auth {
  constructor(history) {
    // Pass in React Router History
    this.history = history;
    // Initialize instance variable
    this.userProfile = null;
    this.authResult = null;
    // Instantiate auth0 WebAuth
    this.auth0 = new auth0.WebAuth({
      // Declare values
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      // Response type we want back
      // Give JOT to authenticate user at login and access token so user can make API calls
      responseType: "token id_token",
      // Specify permissions using openid for authentication
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.authResult = authResult
          this.userProfile = authResult.idTokenPayload;
          axios
            .post("/api/user", { email: this.userProfile.email })
            .then(dbUser => {
              this.setSession(authResult);
              resolve();
            });
        } else if (err) {
          reject(err);
        }
      });
    });
  };

  setSession = authResult => {
    // set time access token expires
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("userProfile", authResult.idTokenPayload);
    localStorage.setItem("expires_at", expiresAt);
    console.log(`SET SESSION Token: ${authResult.accessToken}`);
  };

  // Verify is authenticated
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_AUTH0_URL
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return (this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      console.log(`getProfile: ${JSON.stringify(this.userProfile, null, 2)}`)
    });
  };
}
