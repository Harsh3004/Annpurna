import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { Community } from './pages/Community';
import { Impact } from './pages/Impact';
import { Profile } from './pages/Profile';
import { DonateFood } from './pages/DonateFood';
import { Error } from './pages/Error';
import { Login } from './pages/Login';


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/community' element={<Community />} />
          <Route path='/impact' element={<Impact />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/donate-food' element={<DonateFood />} />
          <Route path='*' element={<Error />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
