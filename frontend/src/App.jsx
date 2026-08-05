import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";

import { userDataContext } from "./context/userDataContext";

function App() {
  const { userData, authLoading } = useContext(userDataContext);

  if (authLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData ? <Home /> : <Navigate to="/signin" replace />
        }
      />

      <Route
        path="/signin"
        element={
          userData ? <Navigate to="/" replace /> : <SignIn />
        }
      />

      <Route
        path="/signup"
        element={
          userData ? <Navigate to="/" replace /> : <SignUp />
        }
      />

      <Route
        path="/customize"
        element={
          userData ? (
            <Customize />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />

      <Route
        path="/customize2"
        element={
          userData ? (
            <Customize2 />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;