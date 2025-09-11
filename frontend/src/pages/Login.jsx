import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { request } from '../services/authApi';

// HeartIcon Component
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.75l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");
    try{
      const res = await request("http://localhost:5000/api/users/login", "POST" , {email,password});
      console.log(res);
      const data = await res.json();
      console.log(data);

      if(res.ok){
        localStorage.setItem("token",JSON.stringify(data.user.token));
        localStorage.setItem("user",JSON.stringify(data.user));  
        
        console.log(`Login Successfully`);

        // dispatch(setToken(data.userDetails.token));
        // dispatch(setUser(data.userDetails));

        toast.dismiss(toastId);
        
        toast.success("Login Successfully");
        
        navigate('/dashboard');
      }
      else
        throw new Error("Login Failed");
    }catch(err){
      console.log(`Login Failed: ${err.message}`);
      toast.dismiss(toastId);
      toast.error("Login Failed");
    }
  };


  return (
    <div className="bg-emerald-600 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header with Icon */}
        <div className="flex justify-center">
          <div className="bg-emerald-600 rounded-full p-4 inline-flex shadow-lg">
            <HeartIcon />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to AnnaPurna</h1>
          <p className="text-gray-500 mt-2">Sign in to continue sharing meals and making impact</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{' '}
          <Link to={'/signup'} className="font-medium text-emerald-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
