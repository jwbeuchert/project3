import auth0 from "auth0-js";

// Declare Auth class to handle authentication
export default class Auth {
  constructor(history) {
    // Pass in React Router History
    this.history = history;
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
}
