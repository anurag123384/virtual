import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { userDataContext } from "../context/userDataContext";

import Card from "../components/Card";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";

function Customize() {
  const navigate = useNavigate();

  const inputImage = useRef();

  const {
    backendImage,
    setBackendImage,

    frontendImage,
    setFrontendImage,

    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);

    setFrontendImage(URL.createObjectURL(file));

    setSelectedImage("input");
  };

  const handleNext = () => {
    navigate("/customize2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020024] via-[#090979] to-black overflow-x-hidden">

      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-white hover:text-cyan-400 duration-300"
      >
        <MdOutlineKeyboardBackspace size={35} />
      </button>

      <div className="max-w-7xl mx-auto py-12 px-6">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-5xl font-bold text-white"
        >
          Choose Your
          <span className="text-cyan-400">
            {" "}
            AI Assistant
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="text-center text-gray-400 mt-4 text-lg"
        >
          Select an avatar or upload your own image.
        </motion.p>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 mt-14">
                    {images.map((img, index) => (
          <Card key={index} image={img} />
        ))}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => inputImage.current.click()}
          className={`rounded-3xl overflow-hidden border-2 cursor-pointer flex items-center justify-center
          h-[260px] bg-white/10 backdrop-blur-xl transition-all
          ${
            selectedImage === "input"
              ? "border-cyan-400 shadow-2xl shadow-cyan-500/40"
              : "border-white/10"
          }`}
        >
          {!frontendImage ? (
            <div className="flex flex-col items-center gap-4 text-white">
              <LuImagePlus size={50} />
              <p>Upload Image</p>
            </div>
          ) : (
            <img
              src={frontendImage}
              className="w-full h-full object-cover"
              alt="preview"
            />
          )}
        </motion.div>

        <input
          ref={inputImage}
          hidden
          type="file"
          accept="image/*"
          onChange={handleImage}
        />
      </div>

      <div className="flex justify-center mt-16">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: .95 }}
          disabled={!selectedImage}
          onClick={handleNext}
          className={`px-14 py-4 rounded-full text-xl font-bold duration-300
          ${
            selectedImage
              ? "bg-cyan-500 hover:bg-cyan-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue →
        </motion.button>

      </div>

    </div>

  </div>
  );
}

export default Customize;