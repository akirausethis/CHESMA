import React, { useState } from 'react';
import { login } from '../apis/authAPI';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  ChefHat,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fetchAUser = async () => {
    try {
      const response = await login(username, password);
      console.log('API Response:', response);

      if (!response.data.token) {
        alert('User not found');
      } else {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', username);
        navigate('/pantry');
      }
    } catch (error) {
      console.log(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAUser();
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-4 py-8">
      {/* ================= BACKGROUND DECORATIONS ================= */}

      {/* Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-lime-300/10 rounded-full blur-3xl"></div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      ></div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-emerald-200 animate-bounce hidden lg:block">
        <ChefHat size={72} />
      </div>

      <div className="absolute bottom-24 right-24 text-green-200 animate-pulse hidden lg:block">
        <Sparkles size={64} />
      </div>

      {/* ================= LOGIN CARD ================= */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/85 border border-white/60 shadow-2xl rounded-[32px] p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-200 mb-4">
              <ChefHat size={38} className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs leading-relaxed">
              Sign in to continue your healthy cooking journey with Chesma.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-500 pt-2">
              Don&apos;t have an account?{' '}
              <a
                href="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-700 transition"
              >
                Register Now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;