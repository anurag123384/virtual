import { useState } from "react";

function useAssistant(getGeminiResponse) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const speak = (text) => {
    if (!text) return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender,
        text,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleCommand = (data) => {
    if (!data) return;

    const { type, userInput } = data;

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
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            userInput
          )}`,
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
          "https://www.instagram.com",
          "_blank"
        );
        break;

      case "facebook-open":
        window.open(
          "https://www.facebook.com",
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

  const sendMessage = async (text) => {
    if (!text) return;

    addMessage("user", text);

    setTyping(true);

    try {
      const result = await getGeminiResponse(text);

      setTyping(false);

      if (!result) return;

      addMessage(
        "assistant",
        result.response || "No response."
      );

      speak(result.response);

      handleCommand(result);
    } catch (error) {
      setTyping(false);

      addMessage(
        "assistant",
        "Something went wrong."
      );
    }
  };

  return {
    messages,
    typing,
    sendMessage,
  };
}

export default useAssistant;