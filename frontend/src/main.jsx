import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import PanelsContext from "./context/PanelsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <PanelsContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PanelsContext>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
