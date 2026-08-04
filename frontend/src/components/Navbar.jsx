import { FaRobot } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function Navbar({ onLogout }) {
  return (
    <nav className="w-full h-20 backdrop-blur-xl bg-white/10 border-b border-white/10 flex items-center justify-between px-8">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-cyan-500 flex justify-center items-center text-white text-xl shadow-lg shadow-cyan-500/40">
          <FaRobot />
        </div>

        <div>
          <h1 className="text-white text-2xl font-bold">
            SHIFRA AI
          </h1>

          <p className="text-gray-300 text-sm">
            Personal Voice Assistant
          </p>
        </div>

      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 duration-300 text-white px-6 py-3 rounded-xl"
      >
        <MdLogout size={22} />
        Logout
      </button>

    </nav>
  );
}

export default Navbar;