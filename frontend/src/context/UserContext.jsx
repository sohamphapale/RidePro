import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      LastName: "",
    },
  });
  const [setPickup, setSetPickup] = useState("");

  return (
    <UserDataContext.Provider
      value={{ user, setUser, setPickup, setSetPickup }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
