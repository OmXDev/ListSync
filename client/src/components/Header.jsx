import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import ProfileDropdown from "../ui/PorfileDropDown";

export default function Header() {
  const navigate = useNavigate();

  // Mock logout logic (replace with real auth logout)
  const logout = () => {
    localStorage.removeItem("token");
    // optionally clear context/auth state
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-5">
      <div className="flex items-center justify-between">

        {/* Logo or Page Title (optional) */}
        <div className="text-xl font-semibold text-gray-800">Dashboard</div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ProfileDropdown/>
        </div>
      </div>
    </header>
  );
}
