import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Container, Row, Col } from "reactstrap";
import Xmas from "../src/components/Images/mistletoe.jpg";
import Birthday from "../src/components/Images/birthday.jpeg";
import Wedding from "../src/components/Images/rings.jpeg";

// https://reactstrap.github.io/components/layout/
// const container = (props) => {
//   <Container>
//     <Row>
//       <Col>.col</Col>
//     </Row>
//     <row>
//       <Col>.col</Col>
//     </row>
//     <row>
//       <Col>.col</Col>
//     </row>
//   </Container>
// }

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <>
        <div>
          {/* Only show login when user not authenticated */}
          {isAuthenticated() ? (
            // If authenticated show Profile page
            <Link to="/Profile" id="LoggedIn">
              View My Profile
            </Link>
          ) : (
            <button onClick={login}>Log In</button>
          )}
        </div>
        <hr></hr>
        <br></br>
        <div nameclass="row">
          <div nameclass="col-md-12">
            <img src={Xmas} id="pic1" alt="mistletoe"></img>
            <h1>Christmas Wish List</h1>
          </div>
        </div>
        <div nameclass="row">
          <div nameclass="col-md-12">
            <img src={Birthday} id="pic2" alt="birthday"></img>
            <h1>Birthday Wish list</h1>
          </div>
        </div>
        <div nameclass="row">
          <div nameclass="col-md-12">
            <img src={Wedding} id="pic3" alt="rings"></img>
            <h1>Wedding Wish list</h1>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
