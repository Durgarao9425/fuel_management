import React, { useState } from "react";
import { Bell, Search, Menu, Settings, X } from "lucide-react";
import durgarao from "../../Images/durgarao.jpeg";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const user = { name: "John Doe", role: "Admin" }; // Mock user data
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);

  const handleProfile = () => {
    setDropdownOpen(false);
  };

  const handleSettings = () => {
    setDropdownOpen(false);
  };

  const presetColors = [
    'bg-green-400', 'bg-blue-400', 'bg-purple-400',
    'bg-blue-500', 'bg-yellow-400', 'bg-red-400'
  ];

  const fonts = [
    { name: 'Public Sans', sample: 'Aa', color: 'text-green-600' },
    { name: 'Inter', sample: 'Aa', color: 'text-gray-400' },
    { name: 'DM Sans', sample: 'Aa', color: 'text-gray-400' },
    { name: 'Nunito Sans', sample: 'Aa', color: 'text-gray-400' }
  ];

  return (
    <>
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

            {/* Settings Icon - Removed animation */}
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center space-x-3 relative">
              <img
                src={durgarao}
                alt={user?.name}
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen((open) => !open)}
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-40 bg-white border rounded-lg shadow-lg py-2">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleProfile()}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSettings()}
                  >
                    Settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Settings Drawer - Fixed positioning to right side */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSettingsOpen(false)}
          />
          {/* Drawer - Positioned on the right */}
          <div className="relative bg-white w-80 max-w-full h-full shadow-xl flex flex-col">
            {/* Fixed Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Presets Section */}
              <div className="mb-8">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                  Presets
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {presetColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPreset(index)}
                      className={`h-16 rounded-2xl ${color} ${
                        selectedPreset === index ? 'ring-4 ring-blue-300' : ''
                      } flex items-center justify-center relative overflow-hidden transition-all duration-200 hover:scale-105`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <div className="w-6 h-1 bg-white/60 rounded-full"></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Section */}
              <div className="mb-8">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                  Font
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-3">Family</p>
                  <div className="grid grid-cols-2 gap-4">
                    {fonts.map((font, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFont(index)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          selectedFont === index 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`text-3xl font-bold mb-2 ${font.color}`}>
                          {font.sample}
                        </div>
                        <div className="text-sm text-gray-600">
                          {font.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme Options */}
              <div className="mb-8">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                  Theme Options
                </div>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Dark Mode</h3>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Auto Theme</h3>
                    <p className="text-sm text-gray-500">Follow system preference</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Accessibility</h3>
                    <p className="text-sm text-gray-500">High contrast and large text options</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Language</h3>
                    <p className="text-sm text-gray-500">Choose your preferred language</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Notifications</h3>
                    <p className="text-sm text-gray-500">Manage notification preferences</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Privacy</h3>
                    <p className="text-sm text-gray-500">Manage your privacy settings</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">Data Export</h3>
                    <p className="text-sm text-gray-500">Export your data and settings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;