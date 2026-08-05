import { FaPlus, FaTrash, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

function Sidebar({ clearChat }) {
  return (
    <div className="w-[280px] min-h-screen bg-[#0B1120] border-r border-white/10 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <FaRobot className="text-white text-2xl" />
          </div>

          <div>
            <h1 className="text-white text-2xl font-bold">
              SHIFRA AI
            </h1>

            <p className="text-gray-400 text-sm">
              Personal Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 p-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={clearChat}
          className="w-full h-14 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold flex items-center justify-center gap-3"
        >
          <FaPlus />
          New Chat
        </motion.button>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={clearChat}
          className="w-full h-14 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-3"
        >
          <FaTrash />
          Clear Chat
        </motion.button>
      </div>

    </div>
  );
}

export default Sidebar;