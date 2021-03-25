import React, { useContext } from "react";
import "./Home.css";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

import {
  FaPlusCircle,
  FaWindowClose,
} from "react-icons/fa";

const Home = () => {

  // State
  const [users, setUser] = useContext(UserContext);

  return (
    <div className="home col-md-6">
      <h4>USERS</h4>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th> Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length
            ? users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <Link to={"/read/" + user.id} className={(user.present === true) ? 'green' : 'red' }>{user.dogname}</Link>
                  </td>
                  <td>
                    <Link to={"/delete/" + user.id}>
                      <FaWindowClose color="red" />
                    </Link>
                  </td>
                </tr>
              ))
            : <tr>
                <td colSpan="3">No Users Found</td>
              </tr>}
        </tbody>
      </Table>

      <Link to="/create">
        <Button className="create__btn" variant="primary">
          Create New Dog <FaPlusCircle />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
