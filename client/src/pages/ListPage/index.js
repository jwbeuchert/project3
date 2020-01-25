import React from "react";
import { useState, useEffect } from "react";
import List from "../../components/List";
import ListForm from "../../components/ListForm";
import axios from "axios";
import "./styles.css"

const ListPage = props => {
  const [user, setUser] = useState(null);
  const userId = "5e2c67ad71d4cc3c202d7318";

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

  const deleteList = (e, listid) => {
    e.preventDefault()
    console.log(listid)
    axios.delete("/api/list/" + listid + "/" + user._id).then(res => {
      console.log("List deleted")
      getUser()
    })
  }

  return (
    <div className="list-page-body">
      <h1>My Lists</h1>
      <ListForm createList={createList} />
      <div className="lists-section">
        <h5>List of Gift Lists</h5>
        <div className="list-container">
      {user && user.lists.length > 0 ? (
        user.lists.map(list => <List key={list._id} list={list} deleteList={deleteList} noList={false} />)
      ) : (
        <List key="nolist" list={{name: "No lists to display."}} noList={true} />
      )}
      </div>
      </div>
    </div>
  );
};

export default ListPage;
