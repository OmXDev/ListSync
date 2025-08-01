import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import axios from "axios";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem("authUser")) || null;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {}, // No body needed
      { withCredentials: true } // Needed if using cookies
    );

    // Remove all localStorage tokens/user info
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authUser");

    // Redirect to login
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Avatar */}
        <div className="relative w-8 h-8">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-700 text-white flex items-center justify-center font-semibold text-xs uppercase border border-slate-600">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{authUser?.fullname?.charAt(0) || "A"}</span>
            )}
          </div>
        </div>

        {/* Full Name */}
        <span className="text-sm font-medium hidden sm:block">
          {authUser?.fullname || "Admin"}
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md py-2 z-10">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
