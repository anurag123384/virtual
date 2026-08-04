import React, { useContext } from "react";
import { motion } from "framer-motion";
import { userDataContext } from "../context/userDataContext";

function Card({ image }) {
  const {
    setBackendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const isSelected = selectedImage === image;

  const handleSelect = () => {
    setSelectedImage(image);
    setBackendImage(null);
    setFrontendImage(null);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={handleSelect}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        cursor-pointer
        border-2
        bg-white/10
        backdrop-blur-xl
        transition-all
        duration-300

        w-[130px]
        h-[220px]

        sm:w-[150px]
        sm:h-[250px]

        ${
          isSelected
            ? "border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,.6)]"
            : "border-white/10 hover:border-cyan-300"
        }
      `}
    >
      <img
        src={image}
        alt="Assistant"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {isSelected && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
          ✓
        </div>
      )}
    </motion.div>
  );
}

export default Card;