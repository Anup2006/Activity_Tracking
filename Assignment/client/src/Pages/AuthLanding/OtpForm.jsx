import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

export default function OtpForm({
  email,
  otp,
  setOtp,
  handleVerifyOtp,
  handleResendOtp,
  onBack,
}) {
  const { loading, resending } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] via-[#E8EBF5] to-[#F5F7FA] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-700 mb-6 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-black mb-1">
            Verify Your Email
          </h2>
          <p className="text-gray-500 text-sm">
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center space-x-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={otp[i] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setOtp((prev) => prev.substring(0, i) + val + prev.substring(i + 1));
                if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
              }}
              id={`otp-${i}`}
              className="w-12 h-14 text-center border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOtp}
          disabled={loading || otp.length !== 6}
          className="w-full py-3 mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg font-semibold disabled:opacity-50 transition-all"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            className="text-indigo-600 hover:underline font-medium disabled:opacity-50"
          >
            {resending ? "Resending..." : "Didn't receive the code? Resend"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
