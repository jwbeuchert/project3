import React, { useContext } from "react";
import List from "../../components/List";
import ListForm from "../../components/ListForm";
import NoResultCard from "../../components/NoResultCard";
import { UserContext } from "../../utils/UserContext"
import axios from "axios";
import "./styles.css";

const GiftLists = () => {
  const { dbUser, setDbUser } = useContext(UserContext)
  
  const createList = (e, listname) => {
    e.preventDefault();
    console.log(listname);
    axios.post("/api/list/" + dbUser._id, { name: listname }).then(res => {
      console.log("List added");
      console.log(res.data.lists[0])
      setDbUser(res.data)
    });
  };

  const deleteList = (e, listid) => {
    e.preventDefault();
    console.log(listid);
    axios.delete("/api/list/" + listid + "/" + dbUser._id).then(res => {
      console.log("List deleted");
      setDbUser(res.data)
    });
  };

  return (
    <div className="sub-page-body">
      <h1 className="sub-page-header">My Lists</h1>
      <ListForm createList={createList} />
      <div className="sub-section">
        <h5 className="sub-header">List of Gift Lists</h5>
        <div className="sub-container">
          {dbUser && dbUser.lists.length > 0 ? (
            dbUser.lists.map(list => (
              <List
                key={list._id}
                list={list}
                deleteList={deleteList}
              />
            ))
          ) : (
            <NoResultCard message={"You have no lists."} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftLists;
