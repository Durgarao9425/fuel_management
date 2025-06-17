import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Fuel,
  Car,
  CreditCard,
  BookOpen,
  BarChart3,
  Package,
  Bell,
  Receipt,
  Clock,
  Settings,
  Gauge,
} from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/users", icon: Users, label: "User Management" },
  { path: "/fuel-transactions", icon: Fuel, label: "Fuel Transactions" },
  { path: "/vehicles", icon: Car, label: "Vehicles & Drivers" },
  { path: "/financial", icon: CreditCard, label: "Financial" },
  { path: "/customers", icon: BookOpen, label: "Customers" },
  { path: "/reports", icon: BarChart3, label: "Reports" },
  { path: "/inventory", icon: Package, label: "Inventory" },
  { path: "/notifications", icon: Bell, label: "Notifications" },
  { path: "/expenses", icon: Receipt, label: "Expenses" },
  { path: "/payroll", icon: Clock, label: "Payroll" },
  { path: "/nosils", icon: Gauge, label: "Nosil Management" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Modal */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col">
            <button
              className="self-end mb-4 text-gray-500"
              onClick={() => setMobileSidebarOpen(false)}
            >
              ✕
            </button>
            <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6 custom-scrollbar">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Layout;
