import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigeta = useNavigate();
  const onClick = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", "");
      navigeta("/login");
      return;
    }
    console.log(response.error);
  };
  return (
    <div className="flex h-dvh  center  items-center justify-center">
      <button
        onClick={onClick}
        className="bg-[#111] m-10 text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
      >
        logout
      </button>
    </div>
  );
};

export default UserLogout;
