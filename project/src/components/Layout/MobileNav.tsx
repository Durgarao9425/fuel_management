import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Fuel, 
  Car, 
  BarChart3, 
  Settings
} from 'lucide-react';

const mobileNavItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/fuel-transactions', icon: Fuel, label: 'Fuel' },
  { path: '/vehicles', icon: Car, label: 'Vehicles' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const MobileNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;