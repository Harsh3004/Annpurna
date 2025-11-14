import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { Community } from './pages/Community';
import { Impact } from './pages/Impact';
import { Profile } from './pages/Profile';
import { DonateFood } from './pages/DonateFood';
import { Error } from './pages/Error';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignUp />} />

          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path='/donate' element={<DonateFood />} />
            <Route path='/community' element={<Community />} />
            <Route path='/impact' element={<Impact />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<Error />}/> 
        </Routes>
      </Router>

      <Toaster/>
    </div>
  )
}

export default App
