// import React from 'react'
// import { useState } from 'react';
// import toast from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// export const SignUp = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     role: 'Donate Food',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
    
//     // Submit Logic
    
//     navigate('/home', {state: formData});
//     toast.success(`Otp Send Successfully`);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-emerald-600 p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 flex flex-col items-center text-center space-y-6">
//         {/* Heart Icon */}
//         <div className="bg-emerald-600 rounded-full p-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-8 w-8 text-white"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>

//         {/* Header Text */}
//         <div className="space-y-2">
//           <h1 className="text-2xl font-bold text-gray-800">Join Annpurna</h1>
//           <p className="text-gray-500">
//             Create an account to start fighting hunger together
//           </p>
//         </div>

//         {/* Signup Form */}
//         <form onSubmit={handleSubmit} className="w-full space-y-4">
//           {/* Name Fields */}
//           <div className="flex gap-4">
//             <div className="flex-1 text-left">
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 required
//               />
//             </div>
//             <div className="flex-1 text-left">
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Role Dropdown */}
//           <div className="text-left">
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//               I want to...
//             </label>
//             <div className="relative mt-1">
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="block w-full px-3 py-2 bg-gray-100 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
//               >
//                 <option value="Donate Food">❤️ Donate Food</option>
//                 <option value="Volunteer">Volunteer</option>
//                 <option value="Organization">Organization</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Email Field */}
//           <div className="text-left">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div className="text-left">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* Sign In Link */}
//         <p className="text-sm">
//           Already have an account?{' '}
//           <Link to="/login" className="text-green-600 font-medium hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';
import { request } from '../services/authApi';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Donate Food', // Default role
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Frontend validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        toast.error("Please fill in all fields.");
        setLoading(false);
        return;
    }

    try {
      // The backend endpoint is expecting firstName, lastName, email, password, role
      const response = await request('http://localhost:5000/api/users/signup',"POST", formData);
      
      console.log('API Response:', response.data);
      toast.success('Signup successful! Please log in.');
      
      // Navigate to the login page after successful signup
      navigate('/login');

    } catch (error) {
      console.error('Signup Error:', error);
      const errorMessage = error.response?.data?.msg || 'An error occurred during signup.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 flex flex-col items-center text-center space-y-6">
        {/* Heart Icon */}
        <div className="bg-emerald-600 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Join AnnaPurna</h1>
          <p className="text-gray-500">
            Create an account to start fighting hunger together
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 text-left">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                disabled={loading}
              />
            </div>
            <div className="flex-1 text-left">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Role Dropdown */}
          <div className="text-left">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              I want to...
            </label>
            <div className="relative mt-1">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-gray-100 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                disabled={loading}
              >
                <option value="Donate Food">❤️ Donate Food</option>
                <option value="Volunteer">🤝 Volunteer</option>
                <option value="Organization">🏢 Organization</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
