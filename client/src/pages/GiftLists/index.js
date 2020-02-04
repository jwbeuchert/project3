import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import ListCardContents from "../../components/ListCardContents";
import ListForm from "../../components/ListForm";
import AnimatedCards from "../../components/AnimatedCards";
import NoResultCard from "../../components/NoResultCard";
import FriendCardContents from "../../components/FriendCardContents";

const GiftLists = () => {
  const { dbUser, setDbUser } = useContext(UserContext);
  const [listChecked, setListChecked] = useState(null);
  const [friendsChecked, setFriendsChecked] = useState([]);

  // marks friends as checked when a list is clicked
  useEffect(() => {
    if (listChecked) {
      axios.get(`/api/list/${listChecked}`).then(dbList => {
        let newArray = [];
        dbList.data.gifters.forEach(gifter => {
          newArray.push(gifter);
        });
        setFriendsChecked(newArray);
      });
    } else {
      setFriendsChecked([]);
    }
  }, [listChecked]);

  const createList = (e, listname) => {
    e.preventDefault();
    axios.post(`/api/list/${dbUser._id}`, { name: listname }).then(res => {
      setDbUser(res.data);
    });
  };

  const deleteList = (listid) => {
    setListChecked(null)
    axios.delete(`/api/list/${listid}/${dbUser._id}`).then(res => {
      console.log(JSON.stringify(res.data))
      setDbUser(res.data);
    });
  };

  const addFriendToList = friendId => {
    axios
      .put(`/api/list/add-gifter/${listChecked}/${friendId}`)
      .then(dbList => dbList);
  };

  const removeFriendFromList = friendId => {
    axios
      .put(`/api/list/remove-gifter/${listChecked}/${friendId}`)
      .then(dbList => dbList);
  };

  const findFriendCheckedState = id => {
    return friendsChecked.includes(id);
  };

  const handleClick = (cardType, itemId) => {
    if (cardType === "list") {
      if (itemId === listChecked) {
        return setListChecked(null);
      }
      return setListChecked(itemId);
    } else if (cardType === "friend" && listChecked) {
      if (findFriendCheckedState(itemId)) {
        setFriendsChecked(friendsChecked.filter(id => id !== itemId));
        return removeFriendFromList(itemId);
      }
      let newArray = friendsChecked.concat(itemId);
      setFriendsChecked(newArray);
      return addFriendToList(itemId);
    }
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
              <AnimatedCards
                key={list._id}
                item={list}
                type={"list"}
                handleClick={handleClick}
                isChecked={listChecked === list._id ? true : false}
                cardBody={
                  <ListCardContents list={list} deleteList={deleteList} />
                }
              />
            ))
          ) : (
            <NoResultCard message={"You have no lists."} />
          )}
        </div>
      </div>
      {listChecked && (
        <div className="sub-section">
          <h5 className="sub-header">Add Friends to Selected Gift List</h5>
          <div className="sub-container">
            {dbUser && dbUser.friends.length > 0 ? (
              dbUser.friends.map(friend => (
                <AnimatedCards
                  key={friend._id}
                  item={friend}
                  type={"friend"}
                  handleClick={handleClick}
                  isChecked={findFriendCheckedState(friend._id)}
                  cardBody={<FriendCardContents user={friend} />}
                />
              ))
            ) : (
              <NoResultCard message={"You haven't added any friends."} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftLists;
