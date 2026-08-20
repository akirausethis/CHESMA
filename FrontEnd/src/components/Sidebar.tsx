import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Camera,
  Package,
  Utensils,
  User,
  ChefHat
} from 'lucide-react';

function Sidebar() {
  const [profilePic, setProfilePic] = React.useState(localStorage.getItem('profilePic_' + (localStorage.getItem('username') || '')));

  React.useEffect(() => {
    const handleProfileUpdate = () => {
      setProfilePic(localStorage.getItem('profilePic_' + (localStorage.getItem('username') || '')));
    };
    window.addEventListener('profilePicUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profilePicUpdated', handleProfileUpdate);
  }, []);
  const username = localStorage.getItem('username') || 'Chef';

  const navItems = [
    {
      to: '/scanPage',
      label: 'AI Scan',
      icon: Camera,
    },
    {
      to: '/pantry',
      label: 'Pantry',
      icon: Package,
    },
    {
      to: '/recipes',
      label: 'Recipes',
      icon: Utensils,
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <aside className="w-64 min-h-screen fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col p-6 z-40">
      {/* ================= LOGO ================= */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200/50">
          <ChefHat size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">CHESMA</h1>
          <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Smart Kitchen</p>
        </div>
      </div>

      {/* ================= USER CARD ================= */}
      <div className="mb-8 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
        <img
          src={profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=10b981&color=ffffff&bold=true`}
          alt={username}
          className="w-10 h-10 rounded-xl shadow-sm"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Welcome Back
          </p>
          <p className="font-bold text-gray-900 text-sm truncate">
            {username}
          </p>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <div
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-600 font-bold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-500 transition-colors"} 
                  />
                  <span>{item.label}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ================= FOOTER ================= */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs font-bold text-gray-300 tracking-wider">
            CHESMA v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

