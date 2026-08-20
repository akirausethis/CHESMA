import React, { useState } from 'react';
import { register } from '../apis/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  User,
  Lock,
  ChefHat,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const fetchAUser = async () => {
    try {
      setErrorMsg('');
      const response = await register(username, email, password);
      console.log('API Response:', response);

      if (!response.data.token) {
        setErrorMsg(response.data?.errorMessage || 'Registration failed. Please try again.');
      } else {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscription', 'free');
        navigate('/pantry');
      }
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.response?.data?.errorMessage || 'Registration failed. Please try again.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }

    if (!agreement) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

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
          <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">Cook smarter, <br/><span className="text-lime-300">not harder.</span></h1>
          <p className="text-lg text-emerald-50/80 mb-12 leading-relaxed">Create your free account today and discover how AI can transform the ingredients you already have into delicious meals.</p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <CheckCircle className="text-lime-300" />
              </div>
              <div>
                <h4 className="font-bold text-white">Smart Pantry</h4>
                <p className="text-emerald-100 text-sm">Track your ingredients easily.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Sparkles className="text-lime-300" />
              </div>
              <div>
                <h4 className="font-bold text-white">AI Recipes</h4>
                <p className="text-emerald-100 text-sm">Generate meals from what you have.</p>
              </div>
            </div>
          </div>
        </div>
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
              Create Account
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Join Chesma and start your healthy cooking journey today.
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
          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Username
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <CheckCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Agreement */}
            <label className="flex items-start gap-3 mt-2 py-2">
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                className="mt-1 accent-emerald-500 cursor-pointer w-4 h-4"
              />
              <span className="text-sm text-gray-500 leading-relaxed cursor-pointer select-none">
                I agree to the <a href="#" className="font-semibold text-gray-700 hover:text-emerald-600">Terms of Service</a> and <a href="#" className="font-semibold text-gray-700 hover:text-emerald-600">Privacy Policy</a>.
              </span>
            </label>

            {/* Register Button */}
            <button
              type="submit"
              disabled={!agreement}
              className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-500 pt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition">
                Sign in now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;


