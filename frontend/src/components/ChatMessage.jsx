import { motion } from "framer-motion";
import { FaRobot, FaUser } from "react-icons/fa";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] flex gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-cyan-500"
              : "bg-violet-500"
          }`}
        >
          {isUser ? (
            <FaUser className="text-white" />
          ) : (
            <FaRobot className="text-white" />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`px-5 py-3 rounded-2xl shadow-lg ${
            isUser
              ? "bg-cyan-500 text-white rounded-br-md"
              : "bg-white/10 backdrop-blur-xl text-white rounded-bl-md"
          }`}
        >
          <p className="leading-7 break-words">
            {message.text}
          </p>

          <p
            className={`text-[11px] mt-2 ${
              isUser
                ? "text-cyan-100"
                : "text-gray-400"
            }`}
          >
            {message.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ChatMessage;