
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import ScanPage from './ScanPage'
import Pantry from './Pantry'
import Recipes from './Recipes'
import Profile from './Profile'
import Sidebar from './Sidebar'
import RecipeDetail from './RecipeDetail'

function PrivateLayout() {
  return (
    <div className="flex flex-row min-h-screen w-full bg-brand-bg font-sans text-text-main">
      <Sidebar />
      <main className="flex w-full ml-64 justify-center items-start pt-10">
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/scanPage" element={<ScanPage />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail/>}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default PrivateLayout
