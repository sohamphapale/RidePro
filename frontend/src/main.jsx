import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import PanelsContext from "./context/PanelsContext.jsx";
import CaptainPanels from "./context/CaptainPanels.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <SocketProvider>
          <CaptainContext>
            <UserContext>
              <PanelsContext>
                <CaptainPanels>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </CaptainPanels>
              </PanelsContext>
            </UserContext>
          </CaptainContext>
        </SocketProvider>
  </StrictMode>
);
