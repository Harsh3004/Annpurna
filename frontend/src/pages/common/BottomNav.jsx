import React from 'react';
// Make sure to import useLocation
import { Link, useLocation } from 'react-router-dom';

// --- SVG Icons ---
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const BarChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);
const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
);

export const BottomNav = () => {
  // Get the current location object, which contains the pathname
  const location = useLocation();

  const navItems = [
    // Added a 'path' property for a more robust check
    { name: 'Home', icon: <HomeIcon />, path: '/home' },
    { name: 'Donate', icon: <HeartIcon />, path: '/donate' },
    { name: 'Community', icon: <UsersIcon />, path: '/community' },
    { name: 'Impact', icon: <BarChartIcon />, path: '/impact' },
    { name: 'Profile', icon: <UserCircleIcon />, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-screen mx-auto md:mx-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] p-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          // Determine if the current URL pathname matches the item's path
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={item.name}
              // The onClick handler is no longer needed
              className={`flex flex-col items-center justify-center text-xs w-16 h-16 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <div className={`h-6 w-6 mb-1 ${isActive ? 'stroke-2' : ''}`}>{item.icon}</div>
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}