import React from 'react';
import {
  Bell,
  Camera,
  ThumbsUp,
  Calendar,
  ArrowRight,
  Sparkles,
  Flame,
  ChefHat,
} from 'lucide-react';

function Dashboard() {
  return (
    <div className="animate-fade-in w-full px-6 py-4">
      {/* ================= HEADER ================= */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        {/* Greeting */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            Smart Nutrition Assistant
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Hello, Chef Kenny 👋
          </h2>

          <p className="text-gray-500 mt-2 max-w-xl">
            Discover healthy recipes, scan ingredients with AI, and get
            personalized meal recommendations based on your pantry.
          </p>
        </div>

        {/* Profile & Notification */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-2xl shadow-xl border-white/60 backdrop-blur-sm border border-gray-100">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Profile"
              className="w-10 h-10 rounded-xl border-2 border-brand-light"
            />
            <div>
              <p className="text-sm font-bold text-gray-900">Kenny</p>
              <p className="text-[11px] text-gray-500">Healthy Chef</p>
            </div>
          </div>

          <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-xl border-white/60 backdrop-blur-sm border border-gray-100 relative hover:bg-gray-50 transition">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ============ LEFT SIDE ============ */}
        <div className="xl:col-span-2 space-y-6">
          {/* Hero Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-8 text-white shadow-xl border-white/60 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <ChefHat size={12} />
                  AI Powered Cooking
                </div>

                <h3 className="text-3xl font-extrabold mb-2 leading-tight">
                  Cook Smarter,
                  <br />
                  Eat Healthier
                </h3>

                <p className="text-white/90 max-w-lg text-sm leading-relaxed">
                  Scan ingredients, receive personalized recipe suggestions,
                  and track your daily nutrition effortlessly with Chesma.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <p className="text-2xl font-extrabold">128</p>
                  <p className="text-xs text-white/80">Recipes</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <p className="text-2xl font-extrabold">95%</p>
                  <p className="text-xs text-white/80">AI Accuracy</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <p className="text-2xl font-extrabold">1,850</p>
                  <p className="text-xs text-white/80">Calories</p>
                </div>
              </div>
            </div>
          </section>

          {/* Today's Meal Plan */}
          <section className="bg-white p-6 rounded-3xl shadow-xl border-white/60 backdrop-blur-sm border border-gray-100">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Calendar size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Today's Meal Plan
                  </h3>
                  <p className="text-xs text-gray-500">
                    Personalized for your dietary goals
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
                1,800 Kcal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  meal: 'Breakfast',
                  name: 'Oat & Berries',
                  color: 'text-orange-500',
                },
                {
                  meal: 'Lunch',
                  name: 'Spinach Omelette',
                  color: 'text-green-500',
                  recommended: true,
                },
                {
                  meal: 'Dinner',
                  name: 'Grilled Chicken',
                  color: 'text-blue-500',
                },
              ].map((item) => (
                <div
                  key={item.meal}
                  className={`p-4 rounded-2xl border transition ${
                    item.recommended
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm scale-[1.02]'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${item.color}`}
                    >
                      {item.meal}
                    </span>

                    {item.recommended && (
                      <ThumbsUp size={12} className="text-emerald-600" />
                    )}
                  </div>

                  <p className="font-semibold text-gray-900 text-sm">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Scanner */}
          <section className="bg-white p-6 rounded-3xl shadow-xl border-white/60 backdrop-blur-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  AI Ingredient Scanner
                </h3>
                <p className="text-xs text-gray-500">
                  Detect ingredients instantly using computer vision
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                Ready
              </span>
            </div>

            <div className="relative h-72 rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                alt="Vegetables"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Detection Box */}
              <div className="absolute top-12 left-16 w-28 h-28 border-2 border-green-400 rounded-xl bg-green-400/10">
                <span className="absolute -top-7 left-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  Broccoli 98%
                </span>
              </div>

              {/* CTA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="/scanPage"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-500 hover:border-emerald-500 transition-all shadow-xl"
                >
                  <Camera size={18} />
                  Start New Scan
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* ============ RIGHT SIDEBAR ============ */}
        <div className="space-y-6">
          {/* Recommended Recipe */}
          <section className="bg-white rounded-3xl shadow-xl border-white/60 backdrop-blur-sm border border-gray-100 overflow-hidden">
            <div className="relative h-52">
              <img
                src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=600"
                alt="Spinach Omelette"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <ThumbsUp size={12} />
                90% Match
              </div>
            </div>

            <div className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Recommended Lunch
              </span>

              <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-2">
                Spinach Omelette
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                High in protein and perfectly utilizes the fresh spinach
                available in your pantry.
              </p>

              <button className="w-full bg-emerald-50 text-gray-900 font-bold py-3 rounded-2xl hover:bg-emerald-500 hover:text-white transition flex items-center justify-center gap-2">
                Start Cooking
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* Nutrition Summary */}
          <section className="bg-white p-6 rounded-3xl shadow-xl border-white/60 backdrop-blur-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Nutrition Summary
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Protein', value: '120g', percent: '80%' },
                { label: 'Carbs', value: '180g', percent: '65%' },
                { label: 'Fat', value: '60g', percent: '70%' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                    <span className="text-gray-500">
                      {item.value} • {item.percent}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-primary rounded-full"
                      style={{ width: item.percent }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-emerald-50 flex items-center gap-3">
              <Flame size={18} className="text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">
                  1,850 Calories
                </p>
                <p className="text-xs text-gray-500">
                  Daily target almost achieved
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
