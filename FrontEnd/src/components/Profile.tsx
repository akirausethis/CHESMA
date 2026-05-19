import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Edit3,
  LogOut,
  ChevronRight,
  ChefHat,
  Sparkles,
  Award,
} from 'lucide-react';
import { logout } from '../apis/authAPI';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const username = localStorage.getItem('username') || 'User';
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email') || 'user@example.com';
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!token) return;

    try {
      await logout(token);
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    navigate('/');
  };

  return (
    <div className="animate-fade-in pb-10 w-full px-5">
      {/* ================= HERO HEADER ================= */}
      <div className="relative mb-8 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white shadow-2xl shadow-emerald-200">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
            <ChefHat size={40} />
          </div>

          <div>
            <p className="text-emerald-100 font-medium">
              Personal Dashboard
            </p>
            <h1 className="text-4xl font-extrabold">
              {username}
            </h1>
            <p className="text-emerald-100 mt-1">
              Manage your account and culinary journey.
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
            {/* Cover */}
            <div className="h-28 bg-gradient-to-r from-emerald-500 to-green-600 relative">
              <div className="absolute inset-0 bg-white/5"></div>
            </div>

            {/* Avatar */}
            <div className="relative px-8 pb-8">
              <div className="-mt-14 relative w-fit mx-auto">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      username
                    )}&background=10b981&color=ffffff&size=300&bold=true`}
                    alt={username}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 transition">
                  <Edit3 size={16} />
                </button>
              </div>

              {/* Name */}
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {username}
                </h2>
                <p className="text-gray-500 mt-1">
                  Smart Kitchen Enthusiast
                </p>
              </div>

              {/* Badges */}
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                <Badge
                  icon={<Sparkles size={12} />}
                  text="AI Powered"
                  bg="bg-emerald-50"
                  color="text-emerald-600"
                />
                <Badge
                  icon={<Award size={12} />}
                  text="Home Chef"
                  bg="bg-yellow-50"
                  color="text-yellow-600"
                />
              </div>

              {/* Info Rows */}
              <div className="mt-6 space-y-3">
                <InfoRow
                  icon={<Mail size={18} />}
                  label="Email"
                  value={email}
                />
                <InfoRow
                  icon={<Phone size={18} />}
                  label="Phone"
                  value="+62 812 3456 7890"
                />
                <InfoRow
                  icon={<MapPin size={18} />}
                  label="Location"
                  value="Surabaya, Indonesia"
                />
              </div>
            </div>
          </div>

          {/* Logout Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-2">
            <button
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-between text-red-500 hover:bg-red-50 rounded-2xl transition font-semibold"
            >
              <span className="flex items-center gap-3">
                <LogOut size={20} />
                Log Out
              </span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-2">
          {/* Feature Banner */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1400"
              alt="Fresh Ingredients"
              className="w-full h-[520px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/20 mb-4">
                <Sparkles size={12} />
                CHESMA SMART KITCHEN
              </div>

              <h3 className="text-4xl font-extrabold text-white leading-tight mb-3">
                Cook Smarter,
                <br />
                Live Healthier.
              </h3>

              <p className="text-gray-200 max-w-xl text-lg leading-relaxed">
                Use AI-powered ingredient scanning and recipe recommendations to
                turn your pantry into delicious meals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= BADGE =================
const Badge = ({
  icon,
  text,
  bg,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  bg: string;
  color: string;
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${bg} ${color}`}
  >
    {icon}
    {text}
  </div>
);

// ================= INFO ROW =================
const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition">
    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-gray-900 font-semibold truncate">
        {value}
      </p>
    </div>
  </div>
);

export default Profile;