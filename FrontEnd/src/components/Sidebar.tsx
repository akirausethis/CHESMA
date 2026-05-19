import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Camera, Package, Utensils, User } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white min-h-screen fixed shadow-soft flex flex-col p-6 transition-all">
      
      {/* --- 1. LOGO AREA --- */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-green-200">
          S
        </div>
        <h1 className="text-xl font-bold text-brand-dark tracking-tight">SmartChef</h1>
      </div>

      {/* --- 2. MAIN NAVIGATION --- */}
      <nav className="space-y-6 flex-1">
        {/* Home */}
        {/* <NavLink to="/home" className={`flex flex-col items-center gap-2 cursor-pointer transition group`}>
          {({isActive})=>(
            <div 
              className={`flex flex-col items-center gap-2 cursor-pointer transition group ${
                isActive ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-dark'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-green-200 transform scale-105' 
                  : 'hover:bg-brand-light group-hover:scale-105'
              }`}>
                <Home size={24} />
              </div>
              <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>
                Home
              </span>
            </div>
          )}
        </NavLink> */}
        <NavLink to="/scanPage" className={`flex flex-col items-center gap-2 cursor-pointer transition group`}>
          {({isActive})=>(
            <div 
              className={`flex flex-col items-center gap-2 cursor-pointer transition group ${
                isActive ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-dark'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-green-200 transform scale-105' 
                  : 'hover:bg-brand-light group-hover:scale-105'
              }`}>
                <Camera size={24} />
              </div>
              <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>
                AI Scan
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to="/pantry" className={`flex flex-col items-center gap-2 cursor-pointer transition group`}>
          {({isActive})=>(
            <div 
              className={`flex flex-col items-center gap-2 cursor-pointer transition group ${
                isActive ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-dark'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-green-200 transform scale-105' 
                  : 'hover:bg-brand-light group-hover:scale-105'
              }`}>
                <Package size={24} />
              </div>
              <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>
                Pantry
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to="/recipes" className={`flex flex-col items-center gap-2 cursor-pointer transition group`}>
          {({isActive})=>(
            <div 
              className={`flex flex-col items-center gap-2 cursor-pointer transition group ${
                isActive ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-dark'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-green-200 transform scale-105' 
                  : 'hover:bg-brand-light group-hover:scale-105'
              }`}>
                <Utensils size={24} />
              </div>
              <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>
                Recipes
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to="/profile" className={`flex flex-col items-center gap-2 cursor-pointer transition group`}>
          {({isActive})=>(
            <div 
              className={`flex flex-col items-center gap-2 cursor-pointer transition group ${
                isActive ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-dark'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-green-200 transform scale-105' 
                  : 'hover:bg-brand-light group-hover:scale-105'
              }`}>
                <User size={24} />
              </div>
              <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>
                Profile
              </span>
            </div>
          )}
        </NavLink>
        

        

        
      </nav>

      {/* --- OPTIONAL: FOOTER VERSION (Bisa diisi versi app) --- */}
      <div className="text-center mt-auto pt-6">
        <p className="text-[10px] text-gray-300 font-medium">SmartChef v1.0</p>
      </div>

    </div>
  );
};


export default Sidebar;