import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

function ChatBox({ messages, typing }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div
      className="
        w-full
        h-[500px]
        overflow-y-auto
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        p-6
        flex
        flex-col
        gap-5
        shadow-2xl
      "
    >
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col justify-center items-center h-full"
        >
          <h2 className="text-3xl text-white font-bold">
            👋 Welcome
          </h2>

          <p className="text-gray-400 mt-3 text-center">
            Start talking with your AI Assistant.
          </p>
        </motion.div>
      )}

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {typing && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatBox;