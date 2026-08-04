import { motion } from "framer-motion";

function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-4">

        <div className="flex gap-2">

          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: dot * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-cyan-400"
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;