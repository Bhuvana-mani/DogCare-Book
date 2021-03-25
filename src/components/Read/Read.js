import React, { useState } from "react";
import "./Read.css";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowCircleLeft, FaEdit, FaWindowClose } from "react-icons/fa";
import { MixedCheckbox, useMixedCheckbox } from "@reach/checkbox";
import "@reach/checkbox/styles.css";

const Read = () => {

  // State
  const [users, setUser] = useContext(UserContext);

  // Get ID from url
  const { id } = useParams();

  // Array filter to get user data
  const user = users.filter((user) => user.id == id);

  const [present, setPresent] = React.useState(user[0].present);
  
  const updatePresent = () => {

    setPresent(!present);
    // Get List of users from Local storage
    let listOfUsers = JSON.parse(localStorage.getItem("users"));
    
    if (!listOfUsers) {
      listOfUsers = [];
    }
    console.log('present', !present)
    // Assign new values to respective object
    var objIndex = listOfUsers.findIndex((obj => obj.id == id));
    listOfUsers[objIndex].present = !present;

    // Update local Storage
    localStorage.setItem("users", JSON.stringify(listOfUsers));
    
    // Set Payload to State
    setUser(listOfUsers);
  }

  // Friends Load
  var findFriends = JSON.parse(localStorage.getItem("users"));
  var friends = user[0].friends;
  if(friends){
    var filteredFriends = findFriends.filter(item => friends.includes(item.id));
  }else{
    var filteredFriends = [];
  }
  // Friends Load
  
  // Remove Friends
  function removeItem (array, value) {
    var i = 0;
    while (i < array.length) {
        if(array[i] === value) {
            array.splice(i, 1);
        } else {
            ++i;
        }
    }
    return array;
}

  function triggerDelete(friend_id){
    var friends = user[0].friends;
    console.log('friends',friends)
    removeItem(friends, friend_id)
   
    // Get List of users from Local storage
    let listOfUsers = JSON.parse(localStorage.getItem("users"));
    
    if (!listOfUsers) {
      listOfUsers = [];
    }
    
    // Assign new values to respective object
    var objIndex = listOfUsers.findIndex((obj => obj.id == id));
    listOfUsers[objIndex].friends = friends;

    // Update local Storage
    localStorage.setItem("users", JSON.stringify(listOfUsers));
    
    // Set Payload to State
    setUser(listOfUsers);

  }
  
  // Remove Friends
  return (
    <div className="read">
      <div className="col-md-3">
        <img src={user[0].url} className="image" />
      </div>
      <div className="col-md-6">
        <h4>DOG PROFILE</h4>

        <p>
          <b>Name:</b> {user[0].dogname}
          <label className="present-label">
            <MixedCheckbox
              value={present}
              checked={present}
              onChange={(event) => {
                // setPresent(!event.target.checked);
                updatePresent();
              }}
            /> Present
          </label>
        </p>

        <p>
          <b>Nick Name:</b> {user[0].nickname}
        </p>
        <p>
          <b>Age:</b> {user[0].age}
        </p>
        <p>
          <b>Bio:</b> {user[0].bio}
        </p>
        <p>
          <b>Owner Name:</b> {user[0].ownername}
        </p>
        <p>
          <b>Owner Contact:</b> {user[0].ownercontact}
        </p>
        <div>
          <b>Friends:</b>
          <br></br>
          <ul>
            { (filteredFriends && filteredFriends.length) ? filteredFriends.map((item, i) => {  
              return (
                
                  <li key={i} className="friend">
                    <Link to={"/read/" + item.id} className={(item.present === true) ? 'green' : 'red' } >{item.dogname}</Link>
                      <FaWindowClose color="red" onClick={(e)=>{
                          e.stopPropagation();
                          e.preventDefault();
                          triggerDelete(item.id);
                      }}/>
                  </li>
                
              ) 
            }) : <li>No friends Available</li> }
          </ul>
        </div>
      </div>
      <div className="col-md-3">
        <Link to="/">
          <FaArrowCircleLeft /> Go to Users
        </Link>
        <br></br>       
        <br></br>    
        <Link to={"/edit/" + user[0].id}>   
          <Button variant="primary">
            <FaEdit /> &nbsp; Edit 
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Read;
