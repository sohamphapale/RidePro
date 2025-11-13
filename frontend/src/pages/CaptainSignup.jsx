import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const num = "1";
  const navigate = useNavigate();
  const [email, setEmail] = useState(`${num}test_captain@gmail.com`);
  const [password, setPassword] = useState("ABC123");
  const [firstName, setFirstName] = useState(`${num}test_captain_firstname`);
  const [lastName, setLastName] = useState(`${num}test_captain_lastname`);

  const [vehicleColor, setVehicleColor] = useState("red");
  const [vehiclePlate, setVehiclePlate] = useState("MH 02 AB 1234");
  const [vehicleCapacity, setVehicaleCapacity] = useState("4");
  const [vehicleType, setVehicleType] = useState("car");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicles: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicaleCapacity("");
    setVehicleType("");
  };

  //   {
  //     "fullname": {
  //         "firstname": "1test_captain_firstname",
  //         "lastname": "1test_captain_lastname"
  //     },
  //     "email": "1test_captain@gmail.com",
  //     "password": "1test_captain_password",
  //     "vehicles": {
  //         "color": "red",
  //         "plate": "MH 02 AB 1234",
  //         "capacity": "4",
  //         "vehicleType": "car"
  //     }
  // }

  return (
    <div className="p-7 flex flex-col justify-between h-screen ">
      <div>
        <img className="w-16 mb-10" src="ridepro_logo.png" alt="RidePro Logo" />
        <form className="" onSubmit={handleSubmit}>
          <h3 className="text-xl mb-3 font-medium">Captain 🧑‍✈️</h3>
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
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicaleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="moto">moto</option>
            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create Captaine Account
          </button>
          <p className="text-center ">
            Already have a account'?
            <Link className="text-blue-600" to="/captain-login">
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

export default CaptainSignup;
