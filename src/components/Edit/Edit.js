import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import "./Edit.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Multiselect } from "multiselect-react-dropdown";

const Edit = () => {
  const [users, setUser] = useContext(UserContext);
  const { id } = useParams();
  const user = users.filter((user) => user.id == id);

  // Set State
  const [dogname, setDogname] = useState(user[0].dogname);
  const [nickname, setNickname] = useState(user[0].nickname);
  const [age, setAge] = useState(user[0].age);
  const [bio, setBio] = useState(user[0].bio);
  const [ownername, setOwnername] = useState(user[0].ownername);
  const [ownercontact, setOwnercontact] = useState(user[0].ownercontact);
  const [url, setUrl] = useState(user[0].url);
  const [friends, setFriends] = useState(user[0].friends);
  
  // Initialise History
  const history = useHistory();

  // Get Updated values from form data
  const editdogname = (e) => {
    setDogname(e.target.value);
    const edited_name = dogname;
    user[0].age = edited_name;
  };

  const editAge = (e) => {
    setAge(e.target.value);
    const edited_age = age;
    user[0].age = edited_age;
  };
  const editNickname = (e) => {
    setNickname(e.target.value);
    const edited_nickname = nickname;
    user[0].nickname = edited_nickname;
  };
  const editBio = (e) => {
    setBio(e.target.value);
    const edited_bio = bio;
    user[0].bio = edited_bio;
  };
  const editOwnername = (e) => {
    setOwnername(e.target.value);
    const edited_ownername = ownername;
    user[0].ownername = edited_ownername;
  };
  const editOwnercontact = (e) => {
    setOwnercontact(e.target.value);
    const edited_ownercontact = ownercontact;
    user[0].ownercontact = edited_ownercontact;
  };
  const handleChange = (e) => {
    var ans = Array.isArray(e) ? e.map(x => x.id) : [];
    setFriends(ans);    
    console.log('ans', ans)
    const edited_friends = friends;
    user[0].friends = edited_friends;
  }

   // Update User Function
   const updateUser = (e) => {
    e.preventDefault();

    // Get List of users from Local storage
    let listOfUsers = JSON.parse(localStorage.getItem("users"));

    if (!listOfUsers) {
      listOfUsers = [];
    }

    // Assign new values to respective object
    var objIndex = listOfUsers.findIndex((obj => obj.id == id));
    listOfUsers[objIndex].dogname = dogname;
    listOfUsers[objIndex].nickname = nickname;
    listOfUsers[objIndex].age = age;
    listOfUsers[objIndex].bio = bio;
    listOfUsers[objIndex].ownername = ownername;
    listOfUsers[objIndex].ownercontact = ownercontact;
    listOfUsers[objIndex].url = url;
    listOfUsers[objIndex].friends = friends;

    // Update local Storage
    localStorage.setItem("users", JSON.stringify(listOfUsers));

    // Set Payload to State
    setUser(listOfUsers);

    // Redirect to Users list after add user
    history.push("/");
  };

  const changeUrl = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.message);
      })
      .catch(console.log);
  };

  
  // Friends Load
  var findFriends = JSON.parse(localStorage.getItem("users"));
  if(friends){
    var currentFriends = findFriends.filter(item => friends.includes(item.id));
    var RemainingFriends = findFriends.filter(item => ![parseFloat(id)].includes(item.id));
  }else{
    var currentFriends = [];
    var RemainingFriends = findFriends.filter(item => ![parseFloat(id)].includes(item.id));
  }
  console.log('findFriends', findFriends)
  console.log('currentFriends', currentFriends)
  // Friends Load

  return (
    <div className="edit">
      <div className="col-md-3">
        <img src={url} className="image" onClick={changeUrl}/>
      </div>
      <div className="col-md-6">
        <h4>EDIT PROFILE</h4>
        <Form onSubmit={updateUser}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="dogname"
              value={dogname}
              onChange={editdogname}
              placeholder="Enter dogname"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nick Name</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              value={nickname}
              onChange={editNickname}
              placeholder="Enter the nickmame"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={age}
              onChange={editAge}
              placeholder="Enter age"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              value={bio}
              onChange={editBio}
              placeholder="Enter the interest of the pet"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner Name</Form.Label>
            <Form.Control
              type="text"
              name="ownername"
              value={ownername}
              onChange={editOwnername}
              placeholder="Enter Owner Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner Contact</Form.Label>
            <Form.Control
              type="text"
              name="ownercontact"
              value={ownercontact}
              onChange={editOwnercontact}
              placeholder="Enter Owner Contact"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Friends</Form.Label>
            <Multiselect
              options={RemainingFriends}
              selectedValues={currentFriends}
              displayValue="dogname"
              placeholder="Select Friends"
              onSelect={handleChange}
              onRemove  ={handleChange}
            />
          </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
        </Form>
      </div>
      <div className="col-md-3">
        <Link to="/">
          <FaArrowCircleLeft /> Go to Users
        </Link>
      </div>
    </div>
  );
};

export default Edit;
