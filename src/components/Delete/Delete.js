import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./Delete.css";

const Delete = () => {
  const [users, setUser] = useContext(UserContext);
  const { id } = useParams();

  const deleteUser = (id) => {

    // Get List of users from Local storage
    let listOfUsers = JSON.parse(localStorage.getItem("users"));

    // If Users is Null - Set as Array
    if (!listOfUsers) {
      listOfUsers = [];
    }

    // Filter and remove user from user list
    const users = listOfUsers.filter((user) => user.id != id);

    // Update Local Storage
    localStorage.setItem("users", JSON.stringify(users));

    // Update State of users
    setUser(users);
  };

  return (
    <div>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to="/">
            <Button className="delete__btn" variant="info">
              Cancel
            </Button>
            <Button onClick={() => deleteUser(id)} variant="danger">
              Delete
            </Button>
          </Link>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default Delete;
