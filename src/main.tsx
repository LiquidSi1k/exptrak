import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";

const isLogin = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      {isLogin ? (
        <App />
      ) : (
        <div className="flex-center w-full h-screen border">
          <Login />
        </div>
      )}
    </>
  </React.StrictMode>
);
