import React from "react";
import { useState, useEffect } from "react";
import List from "../../components/List";
import ListForm from "../../components/ListForm";
import axios from "axios";
import "./styles.css"

const ListPage = props => {
  const [user, setUser] = useState(null);
  const userId = "5e2b6805dc115962947de9b1";

  useEffect(() => getUser(), []);

  const getUser = () => {
    axios.get("/api/user/" + userId).then(user => {
      setUser(user.data);
    });
  };

  const createList = (e, listname) => {
    e.preventDefault();
    console.log(listname);
    axios.post("/api/list/" + userId, { name: listname }).then(res => {
      console.log("List added");
      getUser();
    });
  };

  return (
    <div className="list-page-body">
      <h1>My Lists</h1>
      <ListForm createList={createList} />
      <div className="lists-section">
        <h5>List of Gift Lists</h5>
        <div class="list-container">
      {user && user.lists.length > 0 ? (
        user.lists.map(list => <List key={list._id} listname={list.name} />)
      ) : (
        <List key="nolist" listname="No lists to display." />
      )}
      </div>
      </div>
    </div>
  );
};

export default ListPage;
