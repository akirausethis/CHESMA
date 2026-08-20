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
  const [profilePic, setProfilePic] = React.useState(localStorage.getItem('profilePic_' + (localStorage.getItem('username') || '')));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('profilePic_' + (localStorage.getItem('username') || ''), base64String);
        setProfilePic(base64String);
        window.dispatchEvent(new Event('profilePicUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };
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
    localStorage.removeItem('profilePic');
    window.dispatchEvent(new Event('profilePicUpdated'));

    navigate('/');
  };

  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* ================= HERO HEADER ================= */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Personal Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Manage your account and culinary journey.
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            {/* Cover */}
            <div className="h-24 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>

            {/* Avatar */}
            <div className="relative px-6 pb-6">
              <div className="-mt-12 relative w-fit mx-auto">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
                  <img
                    src={profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=10b981&color=ffffff&size=300&bold=true`}
                    alt={username}
                    className="w-full h-full object-cover"
                  />
                </div>

                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-200 transition-colors cursor-pointer"><input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <Edit3 size={14} />
                </label>
              </div>

              {/* Name */}
              <div className="text-center mt-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {username}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
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
                  bg="bg-blue-50"
                  color="text-blue-600"
                />
              </div>

              {/* Info Rows */}
              <div className="mt-6 space-y-2">
                <InfoRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value={email}
                />
                <InfoRow
                  icon={<Phone size={16} />}
                  label="Phone"
                  value="+62 812 3456 7890"
                />
                <InfoRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value="Surabaya, Indonesia"
                />
              </div>
            </div>
          </div>

          {/* Logout Card */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-2">
            <button
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-between text-red-500 hover:bg-red-50 rounded-xl transition font-bold text-sm"
            >
              <span className="flex items-center gap-3">
                <LogOut size={18} />
                Sign Out
              </span>
              <ChevronRight size={18} className="text-red-300" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-2">
          {/* Feature Banner */}
          <div className="relative overflow-hidden rounded-[2rem] shadow-sm border border-gray-100 h-full min-h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1400"
              alt="Fresh Ingredients"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[10px] uppercase tracking-widest font-bold border border-white/20 mb-4">
                <ChefHat size={12} />
                Chesma Smart Kitchen
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                Cook Smarter,<br />Live Healthier.
              </h3>

              <p className="text-gray-200 max-w-lg text-base md:text-lg leading-relaxed">
                Use AI-powered ingredient scanning and recipe recommendations to
                turn your pantry into delicious meals every single day.
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
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border border-white/50 ${bg} ${color}`}
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
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-gray-900 font-bold text-sm truncate mt-0.5">
        {value}
      </p>
    </div>
  </div>
);

export default Profile;


