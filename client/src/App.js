import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import axios from "axios";
import { UserContext } from "./utils/UserContext";
import MyGifts from "./pages/MyGifts";
import GiftLists from "./pages/GiftLists";
import Friends from "./pages/Friends";
import GiveGift from "./pages/GiveGift";
import Nav from "./components/Nav";
import Header from "./components/Header";
import LoginStatus from "./components/LoginStatus"
import Login from "./pages/Login"
import "./App.css";

function App() {
  const { loading, isAuthenticated, user } = useAuth0();
  const [dbUser, setDbUser] = useState(null);
  const providerUser = useMemo(() => ({ dbUser, setDbUser }), [
    dbUser,
    setDbUser
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      axios.post("/api/user", { email: user.email }).then(res => {
        setDbUser(res.data);
      });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="main-header">
        <Header />
        <Nav />
        <LoginStatus />
      </div>
      <Switch>
        <UserContext.Provider value={providerUser}>
          {!isAuthenticated ? (
                    <Login />
          ) : (
            <>
              <Route path="/" exact component={MyGifts} />
              <Route path="/mygifts" exact component={MyGifts} />
              <Route path="/friends" exact component={Friends} />
              <Route path="/lists" exact component={GiftLists} />
              <Route path="/give" exact component={GiveGift} />
            </>
          )}
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
