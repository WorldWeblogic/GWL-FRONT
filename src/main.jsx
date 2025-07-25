import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvier } from "./contexts/auth.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(

    <AuthProvier>
        <StrictMode>
            <ToastContainer />
            <App />
        </StrictMode>
    </AuthProvier>
)
