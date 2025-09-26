import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import Home from "./pages/Home.jsx";
import UserProtecteWrapper from "./pages/UserProtecteWrapper.jsx";
import UserLogout from "./pages/userLogout.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route exact path="/captain-login" element={<CaptainLogin />} />
        <Route exact path="/captain-signup" element={<CaptainSignup />} />
        <Route
          exact
          path="/home"
          element={
            <UserProtecteWrapper>
              <Home />
            </UserProtecteWrapper>
          }
        />
        <Route exact path="/logout" element={<UserLogout />} />
      </Routes>
    </div>
  );
};

export default App;
