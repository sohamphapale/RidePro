import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userDate, setUserDate] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDate({ firstName, lastName, email, password });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen ">
      <div>
        <img className="w-16 mb-10" src="ridepro_logo.png" alt="RidePro Logo" />
        <form className="" onSubmit={handleSubmit}>
          <h3 className="text-base mb-3 font-medium">what's your Name?</h3>
          <div className="flex gap-3 mb-5">
            <input
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-lg placeholder:text-sm"
              placeholder="firstName"
            />
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-lg placeholder:text-sm"
              placeholder="LastName"
            />
          </div>

          <h3 className="text-base mb-3 font-medium">what's your email?</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-sm"
            placeholder="email@example.com"
          />
          <h3 className="text-base mb-3 font-medium">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create Account
          </button>
          <p className="text-center ">
            Already have a account'?
            <Link className="text-blue-600" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[8px] leading-tight">
          This site is protected by reCAPTACHA and{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline"> Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
