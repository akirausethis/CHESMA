import React from 'react';
import { User, Mail, Phone, MapPin, Edit3, Settings, LogOut, Heart, Target, ShieldAlert, ChevronRight } from 'lucide-react';
import { logout } from '../apis/authAPI';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const navigate = useNavigate();

  const handleLogout = async () =>{
    if(!token) return;
    await logout(token);
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/')
  }
  return (
    <div className="animate-fade-in pb-10 w-full px-5">
      
      {/* --- HEADER --- */}
      <h2 className="text-3xl font-bold text-brand-dark mb-8">My Chef Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* === KOLOM KIRI: Identitas Utama === */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* 1. Profile Card */}
          <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-50 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-primary to-brand-dark opacity-90"></div>
            
            <div className="relative z-10 mt-8 mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden mx-auto">
                <img src="https://i.pravatar.cc/300?img=11" alt="Kenny" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-brand-primary transition">
                <Edit3 size={16} />
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-brand-dark">Chef {username}</h3>
            <p className="text-sm text-gray-500 mb-6">Master Home Cook</p>
            
            <div className="w-full space-y-4 text-left">
              <InfoRow icon={<Mail size={18}/>} label="Email" value={email} />
              <InfoRow icon={<Phone size={18}/>} label="Phone" value="+62 812 3456 7890" />
              <InfoRow icon={<MapPin size={18}/>} label="Location" value="Surabaya, Indonesia" />
            </div>

            {/* <button className="mt-8 w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Settings size={18} /> Edit Profile
            </button> */}
          </div>

          {/* 2. Account Actions */}
          <div className="bg-white p-2 rounded-3xl shadow-soft border border-gray-50">
            <button onClick={handleLogout} className="w-full p-4 flex items-center justify-between text-red-500 hover:bg-red-50 rounded-2xl transition font-medium">
              <span className="flex items-center gap-3"><LogOut size={20}/> Log Out</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" alt="Vegetables" className="w-full h-full object-cover rounded-3xl" />


      
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
    <div className="text-gray-400">{icon}</div>
    <div className="flex-1">
      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-gray-800 font-medium truncate">{value}</p>
    </div>
  </div>
);


export default Profile;