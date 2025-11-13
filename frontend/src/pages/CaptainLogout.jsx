import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigeta = useNavigate();
  const onClick = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/captains/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", "");
      navigeta("/captain-login");
      return;
    }
    console.log(response.error);
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-[#111] m-10 text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
      >
        logout
      </button>
    </div>
  );
};

export default CaptainLogout;
