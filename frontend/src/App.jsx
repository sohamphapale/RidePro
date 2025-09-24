import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import { UserDataContext } from "./context/UserContext.jsx";
const App = () => {
  const ans = useContext(UserDataContext)
  console.log(ans);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route exact path="/captain-login" element={<CaptainLogin />} />
        <Route exact path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App;
