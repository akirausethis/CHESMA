import React from 'react';
import { Bell, Camera, Clock, ThumbsUp, Calendar, ArrowRight } from 'lucide-react';

function Dashboard(){
  return (
    <div className="animate-fade-in w-full px-5">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-brand-dark">Hello, Chef {} 👋</h2>
          <p className="text-text-muted mt-1">Ready to cook your healthy meal plan today?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-full shadow-sm border border-gray-100">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-8 h-8 rounded-full border-2 border-brand-light" />
            <span className="text-sm font-semibold">Kenny</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 relative hover:bg-gray-50">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Pantry Health (UPDATED: 100% Score)
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="font-semibold text-lg mb-4 text-center">Pantry Status</h3>
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="60" stroke="#E8F5E9" strokeWidth="12" fill="transparent" />
              <circle cx="72" cy="72" r="60" stroke="#4CAF50" strokeWidth="12" fill="transparent" strokeDasharray="377" strokeDashoffset="0" strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="block text-3xl font-bold text-brand-dark">100%</span>
              <span className="text-[10px] text-gray-400 font-medium">Excellent</span>
            </div>
          </div>
          <div className="mt-6 w-full flex justify-center text-xs font-medium text-text-muted px-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div> All Items Fresh
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-40 -mr-16 -mt-16"></div>
          
          <div className="flex justify-between items-start z-10 mb-2">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Today's Meal Plan</h3>
                  <p className="text-xs text-gray-500">Based on your diet & pantry stock</p>
                </div>
             </div>
             <span className="bg-white text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
               1,800 Kcal
             </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
             <div className="bg-white/60 p-3 rounded-xl border border-white/50">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Breakfast</span>
                <p className="text-sm font-semibold text-gray-800 mt-1 truncate">Oat & Berries</p>
             </div>
             <div className="bg-white/80 p-3 rounded-xl border border-blue-200 shadow-sm transform scale-105">
                <span className="text-[10px] text-brand-primary font-bold uppercase flex items-center gap-1">
                   Lunch <ThumbsUp size={8}/>
                </span>
                <p className="text-sm font-bold text-gray-900 mt-1 truncate">Spinach Omelette</p>
             </div>
             <div className="bg-white/60 p-3 rounded-xl border border-white/50">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Dinner</span>
                <p className="text-sm font-semibold text-gray-800 mt-1 truncate">Grilled Chicken</p>
             </div>
          </div>
        </div> */}

        {/* Card 3: AI Scanner Widget */}
        <div className="col-span-2 bg-white p-6 rounded-3xl shadow-soft border border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-lg">AI Scanner</h3>
              <p className="text-xs text-text-muted">Auto-detect ingredients with AI</p>
            </div>
            <div className="px-2 py-1 bg-brand-light text-brand-dark text-[10px] font-bold rounded uppercase tracking-wider">Ready</div>
          </div>
          <div className="w-full h-56 bg-gray-900 rounded-2xl relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" alt="Vegetables" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-10 left-16 border-2 border-brand-primary w-28 h-28 rounded bg-brand-primary/10">
                <span className="absolute -top-7 left-0 bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded">Broccoli 98%</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <a
                  href='/scanPage'
                  className="bg-white/30 backdrop-blur-md border border-white text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-primary hover:border-brand-primary transition shadow-xl flex items-center gap-2">
                  <Camera size={16} /> Start New Scan
                </a>
            </div>
          </div>
        </div>

        {/* Card 4: Recipe Suggestion (Lunch Recommendation) */}
        <div className="col-span-1 bg-white rounded-3xl shadow-soft border border-gray-50 overflow-hidden flex flex-col hover:shadow-lg transition">
          <div className="h-44 relative">
            <img src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=400" alt="Omelette" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-brand-primary/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <ThumbsUp size={12} /> 90% Match
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-1">
               <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">Recommended Lunch</span>
            </div>
            <h3 className="font-bold text-xl text-brand-dark mb-1">Spinach Omelette</h3>
            <p className="text-xs text-text-muted mb-4 line-clamp-2">High protein & uses your fresh spinach.</p>
            <button className="mt-auto w-full bg-brand-light text-brand-dark font-bold py-3 rounded-xl hover:bg-brand-primary hover:text-white transition duration-300 flex items-center justify-center gap-2">
              Start Cooking <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;