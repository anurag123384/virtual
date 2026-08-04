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
      <div className="w-full h-screen bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center">
        <p className="text-white text-lg font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/signup"
        element={
          !userData ? <SignUp /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/signin"
        element={
          !userData ? <SignIn /> : <Navigate to="/" replace />
        }
      />

      <Route
        path="/customize"
        element={
          userData ? (
            <Customize />
          ) : (
            <Navigate to="/signup" replace />
          )
        }
      />

      <Route
        path="/customize2"
        element={
          userData ? (
            <Customize2 />
          ) : (
            <Navigate to="/signup" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;