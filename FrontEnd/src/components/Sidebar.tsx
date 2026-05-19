import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Camera,
  Package,
  Utensils,
  User,
  ChefHat,
  Sparkles,
} from 'lucide-react';

function Sidebar() {
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
    <aside className="w-64 min-h-screen fixed left-0 top-0 bg-white/95 backdrop-blur-xl border-r border-gray-100 shadow-2xl shadow-emerald-100/40 flex flex-col p-6">
      {/* ================= LOGO ================= */}
      <div className="mb-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-5 text-white shadow-xl shadow-emerald-200">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-6 -mb-6"></div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/20 shadow-lg">
              <ChefHat size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                CHESMA
              </h1>
              <p className="text-emerald-100 text-xs font-medium tracking-wide">
                Smart Kitchen Assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= USER CARD ================= */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-emerald-50 border border-emerald-100">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              username
            )}&background=10b981&color=ffffff&bold=true`}
            alt={username}
            className="w-12 h-12 rounded-2xl shadow-md"
          />

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Welcome Back
            </p>
            <p className="font-bold text-gray-900 truncate">
              {username}
            </p>
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <div
                  className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200'
                      : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  {/* Active Glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-white/5"></div>
                  )}

                  {/* Icon */}
                  <div
                    className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center transition ${
                      isActive
                        ? 'bg-white/20 backdrop-blur border border-white/10'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-emerald-600'
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Label */}
                  <div className="relative z-10 flex-1">
                    <span className="font-semibold">
                      {item.label}
                    </span>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <Sparkles
                      size={16}
                      className="relative z-10 opacity-90"
                    />
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ================= FOOTER ================= */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs font-bold text-gray-400 tracking-wider">
            CHESMA v1.0
          </p>
          <p className="text-[10px] text-gray-300 mt-1">
            AI-Powered Smart Kitchen
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;