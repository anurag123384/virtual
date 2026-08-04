import { motion } from "framer-motion";

function VoiceWave({ active }) {
  return (
    <div className="flex items-end justify-center gap-2 h-16">

      {[...Array(7)].map((_, index) => (
        <motion.div
          key={index}
          animate={
            active
              ? {
                  height: [12, 45, 20, 55, 15],
                }
              : {
                  height: 12,
                }
          }
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: index * 0.08,
          }}
          className="w-2 rounded-full bg-cyan-400"
        />
      ))}

    </div>
  );
}

export default VoiceWave;