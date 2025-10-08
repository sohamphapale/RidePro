import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import UserProtecteWrapper from "./pages/UserProtecteWrapper.jsx";
import UserLogout from "./pages/userLogout.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
import CaptainProtecteWrapper from "./pages/CaptainProtecteWrapper.jsx";
import Home from "./pages/home/Home.jsx";
import "remixicon/fonts/remixicon.css";
import CaptainHome from "./pages/captainPanels/CaptainHome.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route exact path="/captain-login" element={<CaptainLogin />} />
        <Route exact path="/captain-signup" element={<CaptainSignup />} />
        <Route exact path="/captain-logout" element={<CaptainLogout />} />
        <Route
          exact
          path="/home"
          element={
            <UserProtecteWrapper>
              <Home />
            </UserProtecteWrapper>
          }
        />
        <Route
          exact
          path="/captain-home"
          element={
            <CaptainProtecteWrapper>
              <CaptainHome />
            </CaptainProtecteWrapper>
          }
        />
        <Route exact path="/logout" element={<UserLogout />} />
      </Routes>
    </div>
  );
};

export default App;
