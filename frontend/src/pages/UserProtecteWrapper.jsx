import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtecteWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserProtecteWrapper;
