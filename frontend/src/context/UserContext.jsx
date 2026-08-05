import React, { useEffect, useState } from "react";
import axios from "axios";
import { userDataContext } from "./userDataContext";

function UserContext({ children }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  console.log("SERVER URL:", serverUrl);

  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [chatHistory, setChatHistory] = useState([]);

  // =============================
  // Current User
  // =============================
  const handleCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/user/current`,
        {
          withCredentials: true,
        }
      );

      setUserData(data);

      if (data.history) {
        setChatHistory(data.history);
      }
    } catch (error) {
      setUserData(null);
      setChatHistory([]);
    } finally {
      setAuthLoading(false);
    }
  };

  // =============================
  // Assistant Response
  // =============================
  const getGeminiResponse = async (command) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      console.log(error);

      return {
        type: "general",
        userInput: command,
        response:
          error?.response?.data?.response ||
          error?.response?.data?.message ||
          "Assistant Error",
      };
    }
  };

  // =============================
  // Refresh User
  // =============================
  const refreshUser = async () => {
    await handleCurrentUser();
  };

  useEffect(() => {
    if (serverUrl) {
      handleCurrentUser();
    } else {
      console.error("VITE_SERVER_URL is missing!");
      setAuthLoading(false);
    }
  }, [serverUrl]);

  return (
    <userDataContext.Provider
      value={{
        serverUrl,

        userData,
        setUserData,

        authLoading,

        frontendImage,
        setFrontendImage,

        backendImage,
        setBackendImage,

        selectedImage,
        setSelectedImage,

        chatHistory,
        setChatHistory,

        refreshUser,

        getGeminiResponse,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;