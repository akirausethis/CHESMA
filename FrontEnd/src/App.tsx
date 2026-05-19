import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScanPage from './components/ScanPage';
import Pantry from './components/Pantry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipes from './components/Recipes';
import Profile from './components/Profile'; 
import PrivateRoute from './middleware/middleware';
import Login from './components/login';
import Register from './components/register';
import PrivateLayout from './components/privateLayout';

const App = () => {
  return (
    <Router>
      <div className="flex flex-row min-h-screen w-full bg-brand-bg font-sans text-text-main">
        
        
        <main className="flex w-full justify-center items-start">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='/*' element={
              <PrivateRoute>
                <PrivateLayout/>
              </PrivateRoute>
            }/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;