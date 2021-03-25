import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  
  // Get List of users from Local storage
  let listOfUsers = JSON.parse(localStorage.getItem('users'));
  
  // Set List of users to state
    const [users, setUsers] = useState(listOfUsers);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};
