import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

function AssistantAvatar({ assistantName }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full blur-3xl bg-cyan-500 opacity-40"></div>

        <div
          className="
          relative
          w-56
          h-56
          rounded-full
          bg-gradient-to-br
          from-cyan-400
          to-blue-700
          flex
          items-center
          justify-center
          shadow-2xl
          shadow-cyan-500/50
        "
        >
          <FaRobot
            size={90}
            className="text-white"
          />
        </div>
      </motion.div>

      <div className="text-center">

        <h2 className="text-white text-3xl font-bold">
          {assistantName || "Assistant"}
        </h2>

        <div className="flex items-center justify-center gap-2 mt-2">

          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

          <p className="text-green-300">
            Online
          </p>

        </div>

      </div>

    </div>
  );
}

export default AssistantAvatar;