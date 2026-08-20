import React, { useState } from 'react';
import { login } from '../apis/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  ChefHat,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const fetchAUser = async () => {
    try {
      setErrorMsg('');
      const response = await login(username, password);
      console.log('API Response:', response);

      if (!response.data.token) {
        setErrorMsg('User not found or incorrect credentials.');
      } else {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', username);
        navigate('/pantry');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data?.errorMessage || 'Login failed. Please check your credentials.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAUser();
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* ================= LEFT SECTION (BRANDING) ================= */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-green-900 overflow-hidden items-center justify-center p-12">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-white max-w-xl">
          <Link to="/" className="inline-flex w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl items-center justify-center mb-8 border border-white/20 shadow-xl hover:bg-white/20 transition-colors">
             <ChefHat size={40} className="text-white" />
          </Link>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">Turn your pantry into a <br/><span className="text-lime-300">5-star restaurant.</span></h1>
          <p className="text-lg text-emerald-50/80 mb-12 leading-relaxed">Join thousands of home chefs who are cooking smarter, wasting less food, and eating better every day with AI-powered recipes.</p>
          
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-fit">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-700 flex items-center justify-center text-emerald-900 font-bold text-xs">SJ</div>
              <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-emerald-700 flex items-center justify-center text-emerald-900 font-bold text-xs">DC</div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-emerald-700 flex items-center justify-center text-emerald-900 font-bold text-xs">EW</div>
            </div>
            <p className="text-sm font-medium text-emerald-50">Loved by <span className="font-bold text-white">10,000+</span> home chefs.</p>
          </div>
        </div>
        
        {/* Floating elements */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-1/4 right-24 text-lime-300/60">
          <Sparkles size={56} />
        </motion.div>
      </div>

      {/* ================= RIGHT SECTION (FORM) ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 relative min-h-screen lg:min-h-0">
        {/* Mobile-only background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white -z-10 lg:hidden"></div>
        
        <div className="w-full max-w-md relative z-10">
          
          {/* Mobile Header Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-200">
              <ChefHat size={32} className="text-white" />
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Sign in to continue your healthy cooking journey.
            </p>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setErrorMsg('')}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-sm w-full relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner border border-red-100">
                    <AlertCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Alert</h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">{errorMsg}</p>
                  <button 
                    onClick={() => setErrorMsg('')}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Okay
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-500 pt-4">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700 transition">
                Create one now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
