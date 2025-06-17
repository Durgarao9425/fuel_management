import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={
                user?.avatar ||
                "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
              }
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
