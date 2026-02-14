import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { LayoutDashboard, History, BarChart3, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../redux/authSlice.js';

const navItems = [
  { path: '/', label: 'Daily Log', icon: LayoutDashboard },
  { path: '/history', label: 'History', icon: History },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Dashboard({ children }) {
  const location = useLocation();

  const {user,token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logged out successfully");
    await dispatch(logoutUser())
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white shadow-[0_0_30px_rgb(0,0,0,0.06)] flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">HabitFlow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.fullname?.charAt(0).toUpperCase() || "U"}
                  className="rounded-full w-12 h-12"
                />
              ) : (
                <span>{user?.fullname?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate">{user?.fullname}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}        
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-500 rounded-xl transition-all"
          >
            <button
              onClick={handleLogout}
              className="block py-3 px-5 w-full flex flex-row gap-2 text-left rounded-lg "
            >
              <LogOut className="w-4 h-4 mt-1" />
              Logout
            </button>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
