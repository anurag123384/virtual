import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { motion } from "framer-motion";

function ChatInput({
  onSend,
  onMicClick,
  listening = false,
  disabled = false,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const text = message.trim();

    if (!text) return;

    onSend(text);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3">

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onMicClick}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition ${
          listening
            ? "bg-red-500 animate-pulse"
            : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      >
        <FaMicrophone size={22} />
      </motion.button>

      <input
        type="text"
        placeholder="Ask your assistant anything..."
        value={message}
        disabled={disabled}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-lg"
      />

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleSubmit}
        disabled={disabled}
        className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center text-white"
      >
        <FiSend size={24} />
      </motion.button>
    </div>
  );
}

export default ChatInput;