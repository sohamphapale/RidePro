import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [userDate, setUserDate] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        setUserDate({email, password})
        setemail('');
        setpassword('');
        
    };

  return (
    <div className="p-7 flex flex-col justify-between h-screen ">
      <div >
        <img className="w-16 mb-10" src="ridepro_logo.png" alt="RidePro Logo" />
        <form className="" onSubmit={handleSubmit}>
          <h3 className="text-lg mb-3 font-medium">what's your email?</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-3 font-medium">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center ">New here? <Link className='text-blue-600' to="/signup">Create an account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login' className="  bg-[#10b461] flex  items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
