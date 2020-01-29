import React, { Component } from "react";

class Callback extends Component {
  async componentDidMount() {
    // Handle authentication if expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      await this.props.auth.handleAuthentication();
      this.props.history.replace("/")
    } else {
      throw new Error("Invalid callback URL.");
    }
  };
  render() {
    return <h1>Loading...</h1>;
  }
}

export default Callback;
