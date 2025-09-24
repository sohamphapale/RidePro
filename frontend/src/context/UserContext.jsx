import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const [user, setUser] = useState({
  email: "",
  fullName: {
    firstName: "",
    lastName: "",
  },
  password: "",
  
});

const UserContext = ({ children }) => {
  return (
    <UserDataContext.Provider value={user}>{children}</UserDataContext.Provider>
  );
};

export default UserContext;
