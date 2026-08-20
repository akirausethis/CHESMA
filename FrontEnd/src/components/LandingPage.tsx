import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, ShoppingCart, Sparkles, ArrowRight, CheckCircle2, PlayCircle, Star, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col w-full font-sans overflow-x-hidden selection:bg-brand-primary/30">
      
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-brand-primary p-2 rounded-xl shadow-sm">
              <ChefHat className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-text-main tracking-tight">CHESMA</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center font-medium text-text-muted">
            <a href="#features" className="hover:text-brand-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-brand-primary transition-colors">FAQ</a>
          </nav>
          <div className="flex gap-3 sm:gap-4 items-center">
            <Link to="/login" className="text-text-main font-semibold hover:text-brand-primary transition-colors text-sm sm:text-base">Log In</Link>
            <Link to="/register" className="bg-text-main text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-black transition-colors shadow-lg shadow-black/10 text-sm sm:text-base">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-brand-dark text-sm font-semibold mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span>CHESMA AI 2.0 is now live</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-text-main mb-8 leading-[1.1] tracking-tighter max-w-5xl"
          >
            Turn your <span className="text-brand-primary relative whitespace-nowrap">
              pantry
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" opacity="0.3"/>
              </svg>
            </span> into a 5-star restaurant.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Scan your ingredients, discover personalized recipes, and let our smart AI guide you step-by-step. Stop wondering what's for dinner.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link to="/register" className="w-full sm:w-auto bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
              Start Cooking Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto bg-white text-text-main px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <PlayCircle className="w-5 h-5 text-brand-primary" /> See how it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Interactive Mockup Section */}
      <section className="pb-24 px-4 relative z-20 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.2 }}
          className="max-w-6xl mx-auto relative perspective-[2000px]"
        >
          <div className="w-full aspect-[16/11] md:aspect-[16/9] bg-white rounded-2xl md:rounded-[2rem] border border-gray-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transform md:rotate-x-3 hover:rotate-x-0 transition-transform duration-700 ease-out">
            {/* Browser Header */}
            <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-4">
              <div className="flex gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400 border border-red-500/20"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500/20"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-400 border border-green-500/20"></div>
              </div>
              <div className="mx-auto bg-white border border-gray-200 text-xs text-gray-500 font-medium px-6 py-1.5 rounded-md flex-1 max-w-sm text-center shadow-sm flex items-center justify-center gap-2">
                <ChefHat className="w-3 h-3 text-brand-primary" /> app.chesma.com/dashboard
              </div>
            </div>
            
            {/* App UI */}
            <div className="flex flex-1 overflow-hidden bg-[#F8FAFC]">
              {/* Sidebar Mock */}
              <div className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                     <ChefHat className="w-5 h-5 text-white" />
                   </div>
                   <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                
                <div className="space-y-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-11 rounded-xl ${i === 1 ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-transparent hover:bg-gray-50'} flex items-center px-3 gap-3 transition-colors`}>
                      <div className={`w-5 h-5 rounded flex-shrink-0 ${i === 1 ? 'bg-brand-primary' : 'bg-gray-200'}`}></div>
                      <div className={`h-3 w-20 rounded ${i === 1 ? 'bg-brand-primary/80' : 'bg-gray-300'}`}></div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto h-16 rounded-xl bg-gray-50 flex items-center px-4 gap-3 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Main Content Mock */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                    <div className="h-10 w-48 md:w-72 bg-gray-800 rounded"></div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 border-2 border-white shadow-sm flex items-center justify-center">
                    <div className="w-6 h-6 bg-brand-primary rounded-full"></div>
                  </div>
                </div>

                {/* Tags Mock */}
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-brand-primary rounded-full"></div>
                  <div className="h-8 w-20 bg-white border border-gray-200 rounded-full"></div>
                  <div className="h-8 w-28 bg-white border border-gray-200 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Recipe Cards Mock */}
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                      <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden relative group">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${i === 1 ? 'from-brand-primary/20 to-brand-accent/20' : 'from-gray-200 to-gray-100'}`}></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                      <div className="h-6 w-4/5 bg-gray-800 rounded"></div>
                      <div className="flex gap-3">
                        <div className="h-4 w-16 bg-brand-light rounded"></div>
                        <div className="h-4 w-16 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pantry Mock */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full -z-0 opacity-50"></div>
                  <div className="h-6 w-40 bg-gray-800 rounded mb-2 relative z-10"></div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                     {['Chicken Breast', 'Garlic', 'Olive Oil', 'Tomatoes', 'Onion', 'Basil', 'Pasta', 'Heavy Cream'].map((ing, idx) => (
                       <span key={idx} className="px-4 py-2 bg-[#F8FAFC] text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                         {ing}
                       </span>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Problem / Solution Section */}
      <section className="py-16 border-y border-gray-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-4">
              <h4 className="text-4xl md:text-5xl font-black text-brand-primary mb-3">30%</h4>
              <p className="text-text-muted font-medium text-lg">Average household food waste reduced by using smart pantry tracking.</p>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <h4 className="text-4xl md:text-5xl font-black text-brand-accent mb-3">2 Hrs</h4>
              <p className="text-text-muted font-medium text-lg">Saved every week on meal planning and grocery shopping trips.</p>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <h4 className="text-4xl md:text-5xl font-black text-blue-500 mb-3">1000+</h4>
              <p className="text-text-muted font-medium text-lg">Possible recipe combinations generated from your existing ingredients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#F8FAFC] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-brand-primary tracking-widest uppercase mb-4">Features</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6 tracking-tight">Everything you need to cook perfectly.</h3>
            <p className="text-text-muted text-xl max-w-2xl mx-auto">CHESMA eliminates the stress of meal planning and grocery shopping with a fully integrated ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShoppingCart className="w-8 h-8 text-brand-primary" />}
              title="Smart Pantry Management"
              description="Keep a digital inventory of what's in your fridge. Get alerts before ingredients expire and never double-buy."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-brand-accent" />}
              title="AI Recipe Generation"
              description="Tell our AI what ingredients you have, and it will magically generate a delicious recipe in seconds."
              delay={0.2}
            />
            <FeatureCard 
              icon={<ChefHat className="w-8 h-8 text-blue-500" />}
              title="Interactive Cooking Mode"
              description="Follow guided, step-by-step instructions that keep your screen awake while your hands are messy."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-4">How it works</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-text-main mb-8 tracking-tight">From fridge to feast in 3 simple steps.</h3>
              
              <div className="space-y-12 mt-12">
                {[
                  { title: 'Update your pantry', desc: 'Log the ingredients you currently have in your kitchen. It takes just seconds.', num: '01' },
                  { title: 'Get personalized recipes', desc: 'CHESMA analyzes your pantry and suggests recipes that use exactly what you have. No extra shopping trips.', num: '02' },
                  { title: 'Cook and enjoy', desc: 'Follow the intuitive step-by-step guide and enjoy a stress-free, delicious homemade meal.', num: '03' }
                ].map((step, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 group"
                    key={i}
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#F8FAFC] border-2 border-brand-light flex items-center justify-center text-brand-primary font-black text-xl group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-text-main mb-3">{step.title}</h4>
                      <p className="text-text-muted text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-xl lg:max-w-none mx-auto relative perspective-[1000px]">
               {/* Abstract decorative graphic for "How it works" */}
               <motion.div 
                 initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                 whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, type: "spring" }}
                 className="aspect-[4/5] bg-gradient-to-br from-brand-primary/10 via-brand-light to-brand-accent/10 rounded-[3rem] p-8 flex flex-col gap-6 relative shadow-2xl border border-white/50"
               >
                 <motion.div 
                   animate={{ y: [0, -10, 0] }} 
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute top-12 -left-8 md:-left-12 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 z-20"
                 >
                   <div className="bg-green-100 p-2 rounded-full">
                     <CheckCircle2 className="text-brand-primary w-6 h-6" />
                   </div>
                   <div>
                     <p className="font-bold text-text-main">Tomatoes added!</p>
                     <p className="text-sm text-gray-500">Pantry successfully updated</p>
                   </div>
                 </motion.div>
                 
                 <div className="w-full h-1/2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white p-8 flex flex-col justify-end transform transition-transform hover:-translate-y-2 duration-300">
                   <div className="h-6 w-1/3 bg-gray-200 rounded-full mb-4"></div>
                   <div className="h-4 w-2/3 bg-gray-100 rounded-full mb-2"></div>
                   <div className="h-4 w-1/2 bg-gray-100 rounded-full"></div>
                 </div>
                 <div className="w-full h-1/2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white p-8 flex flex-col items-center justify-center relative overflow-hidden transform transition-transform hover:-translate-y-2 duration-300">
                    <div className="absolute inset-0 bg-brand-accent/5"></div>
                    <Sparkles className="w-16 h-16 text-brand-accent mb-4 animate-pulse" />
                    <div className="h-5 w-40 bg-gray-200 rounded-full"></div>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-primary tracking-widest uppercase mb-4">Pricing</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Simple, transparent pricing.</h3>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Start cooking smarter today without breaking the bank.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-brand-primary/30 relative shadow-2xl">
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-brand-primary text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">Most Popular</div>
              <h4 className="text-3xl font-bold mb-2">Home Chef</h4>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black">$0</span>
                <span className="text-gray-400 font-medium">/forever</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Unlimited Pantry tracking', 'Basic AI recipe generation', 'Standard step-by-step cooking', 'Save up to 50 favorite recipes'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full text-center bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-colors">
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#1E293B]/40 p-10 rounded-[2.5rem] border border-white/5 opacity-80 hover:opacity-100 transition-opacity">
              <h4 className="text-3xl font-bold mb-2 text-gray-300">Master Chef</h4>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-gray-400">$5</span>
                <span className="text-gray-500 font-medium">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Everything in Free', 'Advanced nutritional analysis', 'Custom meal prep calendars', 'Unlimited saved recipes'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full bg-gray-800/50 text-gray-500 py-4 rounded-xl font-bold cursor-not-allowed border border-gray-700">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-text-muted text-xl">Everything you need to know about the product and billing.</p>
          </div>
          <div className="space-y-4">
            <FAQItem 
              question="Is CHESMA free to use?" 
              answer="Yes! Our core features including pantry management and basic recipe generation are completely free forever. We believe everyone deserves a smart chef."
            />
            <FAQItem 
              question="How does the AI recipe generator work?" 
              answer="Our advanced AI analyzes your pantry inventory and cross-references it with thousands of culinary flavor profiles to create unique, delicious recipes tailored exactly to what you have on hand."
            />
            <FAQItem 
              question="Can I save my favorite recipes?" 
              answer="Absolutely. You can save any recipe to your personal cookbook, add custom notes, and even adjust portion sizes to fit your family's needs."
            />
            <FAQItem 
              question="Is there a mobile app?" 
              answer="CHESMA is currently a fully responsive web application that works beautifully on any device. Native iOS and Android apps are currently in development!"
            />
          </div>
        </div>
      </section>

      {/* Big CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto bg-text-main rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-brand-primary opacity-20"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent/30 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/40 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight max-w-4xl leading-tight">Ready to transform your cooking experience?</h2>
            <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl font-medium">Join thousands of home chefs who are saving time, reducing food waste, and eating better every single day.</p>
            <Link to="/register" className="bg-brand-primary text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-brand-dark transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(76,175,80,0.4)] flex items-center gap-3">
              Create Free Account <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-gray-400 text-sm mt-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-primary" /> No credit card required. Free forever.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-brand-primary p-2 rounded-xl">
                  <ChefHat className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-text-main">CHESMA</span>
              </div>
              <p className="text-text-muted text-base leading-relaxed mb-8 max-w-sm">
                Your smart kitchen assistant. We make cooking at home easier, faster, and more delicious through the power of AI.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"><span className="font-bold">X</span></div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"><span className="font-bold">in</span></div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"><span className="font-bold">ig</span></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-text-main text-lg mb-6">Product</h4>
              <ul className="space-y-4 text-text-muted font-medium">
                <li><a href="#features" className="hover:text-brand-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-text-main text-lg mb-6">Resources</h4>
              <ul className="space-y-4 text-text-muted font-medium">
                <li><a href="#" className="hover:text-brand-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Community Recipes</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-text-main text-lg mb-6">Legal</h4>
              <ul className="space-y-4 text-text-muted font-medium">
                <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted font-medium">
            <p>&copy; {new Date().getFullYear()} CHESMA Inc. All rights reserved.</p>
            <p className="flex items-center gap-1">Made with <HeartIcon /> for home cooks.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const HeartIcon = () => (
  <svg className="w-4 h-4 text-red-500 fill-red-500 mx-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.2 }}
      className="p-10 rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 group transform hover:-translate-y-1"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-light transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-text-main mb-4">{title}</h3>
      <p className="text-text-muted text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`bg-white border ${isOpen ? 'border-brand-primary/30 shadow-md' : 'border-gray-100 shadow-sm'} rounded-2xl overflow-hidden transition-all duration-300`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-bold text-xl text-text-main pr-8">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-2 text-text-muted text-lg leading-relaxed border-t border-gray-50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
