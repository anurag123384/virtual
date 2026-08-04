import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AssistantAvatar from "../components/AssistantAvatar";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import VoiceWave from "../components/VoiceWave";

import { userDataContext } from "../context/userDataContext";

function Home() {
  const navigate = useNavigate();

  const {
    userData,
    setUserData,
    serverUrl,
    getGeminiResponse,
  } = useContext(userDataContext);

  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const lastSpokenRef = useRef("");

  const speak = (text) => {
    if (!text) return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    lastSpokenRef.current = text;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    addMessage("user", text);

    setTyping(true);

    try {
      const result = await getGeminiResponse(text);

      setTyping(false);

      if (!result) return;

      addMessage("assistant", result.response);

      speak(result.response);

      handleCommand(result);

    } catch (error) {
      console.log(error);

      setTyping(false);

      addMessage(
        "assistant",
        "Sorry, something went wrong."
      );
    }
  };

  const handleCommand = ({ type, userInput }) => {
    switch (type) {
      case "google-search":
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank"
        );
        break;

      case "youtube-search":
      case "youtube-play":
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
          "_blank"
        );
        break;

      case "calculator-open":
        window.open(
          "https://www.google.com/search?q=calculator",
          "_blank"
        );
        break;

      case "instagram-open":
        window.open(
          "https://instagram.com",
          "_blank"
        );
        break;

      case "facebook-open":
        window.open(
          "https://facebook.com",
          "_blank"
        );
        break;

      case "weather-show":
        window.open(
          "https://www.google.com/search?q=weather",
          "_blank"
        );
        break;

      default:
        break;
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleLogout = async () => {
    try {
      await axios.get(
        `${serverUrl}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );

      setUserData(null);

      navigate("/signin");

    } catch (error) {
      console.log(error);
    }
  };
    // ------------------------
  // Speech Recognition
  // ------------------------

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (error) => {
      console.log(error);
      setListening(false);
    };

    recognition.onresult = async (event) => {
      const transcript =
        event.results?.[0]?.[0]?.transcript?.trim();

      if (!transcript) return;

      if (
        lastSpokenRef.current &&
        transcript.toLowerCase() ===
          lastSpokenRef.current.toLowerCase()
      ) {
        return;
      }

      addMessage("user", transcript);

      setTyping(true);

      try {
        const result =
          await getGeminiResponse(transcript);

        setTyping(false);

        if (!result) return;

        addMessage(
          "assistant",
          result.response
        );

        speak(result.response);

        handleCommand(result);

      } catch (error) {
        console.log(error);

        setTyping(false);

        addMessage(
          "assistant",
          "Sorry, something went wrong."
        );
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };

  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  if (!userData) {
    navigate("/signin");
    return null;
  }

  const assistantName =
    userData.assistantName || "Assistant";

  const assistantImage =
    userData.assistantImage || "";
      return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#020024] via-[#090979] to-black">

      {/* Sidebar */}
      <Sidebar clearChat={clearChat} />

      {/* Main Section */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar onLogout={handleLogout} />

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">

          <div className="grid lg:grid-cols-[340px_1fr] gap-6 h-full">

            {/* Left Panel */}

            <div
              className="
              rounded-3xl
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              flex
              flex-col
              justify-center
              items-center
              p-8
              "
            >

              <AssistantAvatar
                assistantName={assistantName}
                assistantImage={assistantImage}
              />

              <div className="mt-8">
                <VoiceWave active={listening} />
              </div>

              <button
                onClick={startListening}
                className="
                mt-10
                px-8
                py-4
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                font-semibold
                duration-300
                "
              >
                {listening
                  ? "Listening..."
                  : "Start Voice"}
              </button>

            </div>

            {/* Right Panel */}

            <div className="flex flex-col h-full gap-5 overflow-hidden">

              <ChatBox
                messages={messages}
                typing={typing}
              />

              <ChatInput
                onSend={handleSend}
                onMicClick={startListening}
                listening={listening}
                disabled={typing}
              />

            </div>

          </div>

        </div>

      </div>
          </div>
  );
}

export default Home;