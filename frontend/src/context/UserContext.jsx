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

  const [userRideDetails, setUserRideDetails] = useState({});
  
  const [setPickup, setSetPickup] = useState("");

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        setPickup,
        setSetPickup,
        userRideDetails,
        setUserRideDetails,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
