import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { userDataContext } from "../context/userDataContext";

function SignIn() {
  const navigate = useNavigate();

  const { serverUrl, setUserData } = useContext(userDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (!data.success) {
        toast.error(data.message || "Login Failed");
        setLoading(false);
        return;
      }

      // Save only user object
      setUserData(data.user);

      toast.success("Login Successful 🎉");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020024] via-[#090979] to-black flex justify-center items-center px-5">

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
      >
        <h1 className="text-4xl text-center text-white font-bold">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-8 bg-white/10 rounded-xl px-5 py-4 outline-none text-white placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-5 bg-white/10 rounded-xl px-5 py-4 outline-none text-white placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 transition duration-300 rounded-xl py-4 text-white font-bold disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>

    </div>
  );
}

export default SignIn;