  
import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import axios from "axios";
import history from "./utils/history";
import { UserContext } from "./utils/UserContext";
import Home from "./Home";
import Profile from "./Profile";
import GiftLists from "./pages/GiftLists";
import GiftGiverList from "./GiftGiverList";
import GiveGifts from "./pages/GiveGifts";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Header from "./components/Header";
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
      axios.post("/api/user", { "email": user.email }).then(res => {
        setDbUser(res.data);
      });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router history={history}>
      <Header />
      <Nav />
      <Switch>
        <UserContext.Provider value={providerUser}>
          {isAuthenticated && (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/give" exact component={GiveGifts} />
              <Route path="/lists" exact component={GiftLists} />
            </>
          )}
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;