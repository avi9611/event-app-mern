import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData); // Assuming login returns a success status
    if (success) {
      navigate("/"); // Redirect to homepage on successful login
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Image/Pattern */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600">
        <AuthImagePattern
          title={"Welcome Back"}
          subtitle={"Log in to continue connecting with your conversations and messages."}
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Welcome Message */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="text-white w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-500">Log in to access your account</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Email</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="text-gray-400 w-5 h-5" />
                </span>
                <input
                  type="email"
                  className="input input-bordered w-full pl-12"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Password</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="text-gray-400 w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400 w-5 h-5" />
                  ) : (
                    <Eye className="text-gray-400 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </> 
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
