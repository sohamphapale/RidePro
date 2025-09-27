import React from "react";

import { Link } from "react-router-dom";
const CaptainHome = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link
        className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
        to="/captain-logout"
      >
        logout
      </Link>
    </div>
  );
};

export default CaptainHome;
