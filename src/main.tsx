import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import { ModeProvider } from "./context/ModeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <ProgressProvider>
          <ModeProvider>
            <App />
          </ModeProvider>
        </ProgressProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
);
