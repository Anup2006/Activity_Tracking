import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate,NavLink} from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

const base_uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/users`;

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/reset-password`, {
        email,
        newPassword,
        confPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset Failed!");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] via-[#E8EBF5] to-[#F5F7FA] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl text-black mb-2">Reset Password</h1>
            <p className="text-gray-500">Enter your details to reset your password</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-6 pb-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all pointer-events-none ${
                  focusedField === "email" || email
                    ? "top-2 text-xs text-indigo-600"
                    : "top-4 text-base text-gray-400"
                }`}
              >
                Email Address
              </label>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setFocusedField("newPassword")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-6 pb-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder=" "
                required
              />
              <label
                htmlFor="new-password"
                className={`absolute left-4 transition-all pointer-events-none ${
                  focusedField === "newPassword" || newPassword
                    ? "top-2 text-xs text-indigo-600"
                    : "top-4 text-base text-gray-400"
                }`}
              >
                New Password
              </label>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                id="conf-password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                onFocus={() => setFocusedField("confPassword")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-6 pb-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder=" "
                required
              />
              <label
                htmlFor="conf-password"
                className={`absolute left-4 transition-all pointer-events-none ${
                  focusedField === "confPassword" || confPassword
                    ? "top-2 text-xs text-indigo-600"
                    : "top-4 text-base text-gray-400"
                }`}
              >
                Confirm Password
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Reset Password
            </motion.button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Remembered your password?{" "}
            <NavLink to="/login" className="text-indigo-600 hover:text-indigo-700">
              Sign in
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
