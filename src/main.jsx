import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Το basename πρέπει να ταιριάζει με το base του vite.config.js */}
    <BrowserRouter basename="/norma-site/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
