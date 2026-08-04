import React, { useState, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { userDataContext } from "../context/userDataContext";

function Customize2() {
  const {
    userData,
    backendImage,
    selectedImage,
    serverUrl,
    setUserData,
  } = useContext(userDataContext);

  const navigate = useNavigate();

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );

  const [loading, setLoading] = useState(false);

  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  const handleUpdateAssistant = async () => {
    if (!assistantName.trim()) {
      alert("Please enter assistant name");
      return;
    }

    if (!selectedImage && !backendImage) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const { data } = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      setUserData(data);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020024] via-[#090979] to-black flex justify-center items-center px-6">

      <button
        onClick={() => navigate("/customize")}
        className="absolute top-8 left-8 text-white hover:text-cyan-400 duration-300"
      >
        <MdOutlineKeyboardBackspace size={35} />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-10"
      >
        <h1 className="text-4xl text-center font-bold text-white">
          Assistant Name
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Give your AI Assistant a unique name.
        </p>

        <input
          type="text"
          placeholder="Example: Shifra"
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
          className="w-full mt-10 bg-white/10 border border-white/20 rounded-xl px-5 py-4 outline-none text-white placeholder:text-gray-400"
        />

        <button
          disabled={loading}
          onClick={handleUpdateAssistant}
          className="w-full mt-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 duration-300 text-white font-bold disabled:opacity-50"
        >
          {loading ? "Creating Assistant..." : "Create Assistant"}
        </button>
      </motion.div>

    </div>
  );
}

export default Customize2;