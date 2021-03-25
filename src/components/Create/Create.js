import React, { useState, useContext } from "react";
import "./Create.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const Create = () => {

  // State
  const [dogname, setDogname] = useState("");
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [ownername, setOwnername] = useState("");
  const [ownercontact, setOwnercontact] = useState("");
  const [url, setUrl] = useState("");
  const [friends, setFriends] = useState([]);
  const [users, setUser] = useContext(UserContext);

  // Fetch Dog Image Via 3rd party api - randomly
  if (!url) {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.message);
      })
      .catch(console.log);
  }

  // Initialise History
  const history = useHistory();

  // Assign Values of form data
  const updatedogname = (e) => {
    setDogname(e.target.value);
  };

  const updateage = (e) => {
    setAge(e.target.value);
  };
  const updatenickname = (e) => {
    setNickname(e.target.value);
  };
  const updatebio = (e) => {
    setBio(e.target.value);
  };
  const updateownername = (e) => {
    setOwnername(e.target.value);
  };
  const updateownercontact = (e) => {
    setOwnercontact(e.target.value);
  };

  // Add User Function
  const addUser = (e) => {
    e.preventDefault();

    // Get List of users from Local storage
    let listOfUsers = JSON.parse(localStorage.getItem("users"));

    if (!listOfUsers) {
      listOfUsers = [];
    }

    // Payload - New Form Data
    let payload = {
      id: listOfUsers && listOfUsers.length ? listOfUsers.length + 1 : 1,
      dogname: dogname,
      age: age,
      nickname: nickname,
      bio: bio,
      ownername: ownername,
      ownercontact: ownercontact,
      url: url,
      present: false,
      friends: friends
    };

    // Update new user to Local storage by Array Push
    listOfUsers.push(payload);
    localStorage.setItem("users", JSON.stringify(listOfUsers));

    // Set Payload to State
    setUser(listOfUsers);

    // Clear the current form after new data added
    payload = {
      id: "",
      dogname: "",
      age: "",
      nickname: "",
      bio: "",
      ownername: "",
      ownercontact: ""
    };

    // Redirect to Users list after add user
    history.push("/");
  };

  return (
    <div className="create">
      <div className="col-md-3">
        <img src={url} className="image" />
      </div>
      <div className="col-md-6">
        <h4>CREATE / ADD DOG</h4>
        <Form onSubmit={addUser}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="dogname"
              value={dogname}
              onChange={updatedogname}
              placeholder="Enter dogname"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nick Name</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              value={nickname}
              onChange={updatenickname}
              placeholder="Enter the nickmame"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={age}
              onChange={updateage}
              placeholder="Enter age"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              value={bio}
              onChange={updatebio}
              placeholder="Enter the interest of the pet"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner Name</Form.Label>
            <Form.Control
              type="text"
              name="ownername"
              value={ownername}
              onChange={updateownername}
              placeholder="Enter Owner Name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner Contact</Form.Label>
            <Form.Control
              type="text"
              name="ownercontact"
              value={ownercontact}
              onChange={updateownercontact}
              placeholder="Enter Owner Contact"
              required
            />
          </Form.Group>
          <Button className="action_btn" variant="primary" type="submit">
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

export default Create;
