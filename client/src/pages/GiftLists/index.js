import React, { useState, useContext } from "react";
import { useSpring, animated as a} from "react-spring"
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import List from "../../components/List";
import ListForm from "../../components/ListForm";
import AnimatedCards from "../../components/AnimatedCards";
import NoResultCard from "../../components/NoResultCard";
import "./styles.css";

const GiftLists = () => {
  const { dbUser, setDbUser } = useContext(UserContext);
  const [listChecked, setListChecked] = useState(false);
  
  const createList = (e, listname) => {
    e.preventDefault();
    console.log(listname);
    axios.post("/api/list/" + dbUser._id, { name: listname }).then(res => {
      console.log("List added");
      console.log(res.data.lists[0]);
      setDbUser(res.data);
    });
  };

  const deleteList = (e, listid) => {
    e.preventDefault();
    console.log(listid);
    axios.delete("/api/list/" + listid + "/" + dbUser._id).then(res => {
      console.log("List deleted");
      setDbUser(res.data);
    });
  };

  const handleListClick = listId => {
    if (listId === listChecked) {
      return setListChecked(null);
    }
    return setListChecked(listId);
  };

  return (
    <div className="sub-page-body">
      <div className="sub-section">
        <h1 className="sub-page-header">My Lists</h1>
      </div>
      <div className="sub-section">
        <ListForm createList={createList} />
      </div>
      <div className="sub-section">
        <h5 className="sub-header">List of Gift Lists</h5>
        <div className="sub-container">
          {dbUser && dbUser.lists.length > 0 ? (
            dbUser.lists.map(list => (
              <List
                key={list._id}
                list={list}
                deleteList={deleteList}
                handleListClick={handleListClick}
                isChecked={listChecked === list._id ? true : false}
              />
            ))
          ) : (
            <NoResultCard message={"You have no lists."} />
          )}
        </div>
      </div>
      {listChecked && (
        <AnimatedCards title="Add Friends to Your List" user={dbUser} />
      )}
    </div>
  );
};

export default GiftLists;
