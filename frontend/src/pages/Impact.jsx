import React, { useState, useEffect } from 'react';
import { BottomNav } from './common/BottomNav';
import { FaHeart, FaLeaf, FaRegSmile, FaUsers, FaTrophy, FaStar, FaFire, FaBullseye } from 'react-icons/fa';

// Helper component for individual impact stats with animation
const AnimatedImpactStat = ({ icon, value: endValue, label, bgColor, iconColor, unit }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const duration = 1500; // Animation duration in milliseconds

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const animatedValue = Math.floor(progress * endValue);
      setCurrentValue(animatedValue);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue]);


  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
      <div className={`rounded-full p-3 mb-2 ${bgColor}`}>
        {icon}
      </div>
      <span className="text-2xl font-bold text-gray-800">{currentValue}{unit || ''}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};

// Helper component for achievements
const Achievement = ({ icon, title, progress }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
    <div className="text-4xl mb-2">{icon}</div>
    <p className="font-semibold text-gray-700 text-sm mb-2">{title}</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="text-xs text-gray-500 mt-1">{progress}%</p>
  </div>
);


// Helper component for leaderboard entries
const LeaderboardItem = ({ rank, name, meals, isCurrentUser }) => (
  <div className={`flex items-center p-3 rounded-xl mb-3 ${isCurrentUser ? 'bg-green-100 border border-green-400' : 'bg-white shadow-sm'}`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mr-4 ${rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-yellow-600' : 'bg-gray-300'}`}>
      {rank}
    </div>

    <div className="flex-grow text-left">
      <p className={`font-bold text-gray-800 ${isCurrentUser ? 'text-green-800' : ''}`}>{name} {isCurrentUser && '(You)'}</p>
      <p className="text-sm text-gray-500">{meals} meals donated</p>
    </div>
    {isCurrentUser && <span className="text-xs font-semibold text-green-700 bg-green-200 px-3 py-1 rounded-full">You</span>}
  </div>
);

export const Impact = () => {
  // Mock data based on screenshots - updated with values to show animation
  const impactData = {
    level: 1,
    points: 0,
    totalDonations: 0,
    progressToNextLevel: 0,
    co2Saved: 88,
    smilesShared: 152,
    peopleHelped: 45,
    dayStreak: 12,
  };

  const monthlyProgress = [
    { month: 'Sep', value: 45 },
    { month: 'Oct', value: 72 },
    { month: 'Nov', value: 58 },
    { month: 'Dec', value: 0 },
  ];

  const achievements = [
    { icon: '🎉', title: 'First Donation', progress: 0 },
    { icon: '📅', title: 'Weekly Donor', progress: 0 },
    { icon: '🍲', title: '100 Meals Donated', progress: 0 },
    { icon: '👥', title: 'Community Builder', progress: 0 },
    { icon: '⭐', title: 'Impact Maker', progress: 0 },
    { icon: '🌿', title: 'Eco Warrior', progress: 0 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Rajesh Kumar', meals: 2156 },
    { rank: 2, name: 'Harsh Joshi', meals: 0, isCurrentUser: true },
    { rank: 3, name: 'Amit Patel', meals: 1089 },
    { rank: 4, name: 'Sunita Sharma', meals: 987 },
    { rank: 5, name: 'Rohit Gupta', meals: 834 },
  ].sort((a, b) => b.meals - a.meals).map((user, index) => ({ ...user, rank: index + 1 }));


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto lg:mx-0 p-4 max-w-md lg:max-w-screen lg:grid lg:grid-cols-1 mb-20">
        <div>
          {/* Your Impact Section */}
          <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-lg mb-6">
            <h1 className="text-2xl font-bold mb-4">Your Impact</h1>
            <div className="flex items-center">
              <div className="bg-yellow-400 p-2 rounded-full mr-4">
                <FaStar />
              </div>
              <div>
                <p className="font-bold">Level {impactData.level} Donor</p>
                <p className="text-sm">{impactData.points} points</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-bold">{impactData.totalDonations}</p>
                <p className="text-sm">Total Donations</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm mb-1">Progress to Level {impactData.level + 1}</p>
              <div className="w-full bg-emerald-300 rounded-full h-2.5">
                <div className="bg-white h-2.5 rounded-full" style={{ width: `${impactData.progressToNextLevel}%` }}></div>
              </div>
              <p className="text-right text-xs mt-1">{impactData.progressToNextLevel}/100</p>
            </div>
          </div>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <AnimatedImpactStat
              icon={<FaLeaf/>}
              value={impactData.co2Saved}
              unit=" kg"
              label="CO₂ Saved"
              bgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <AnimatedImpactStat
              icon={<FaRegSmile />}
              value={impactData.smilesShared}
              label="Smiles Shared"
              bgColor="bg-yellow-100"
              iconColor="text-yellow-600"
            />
            <AnimatedImpactStat
              icon={<FaUsers />}
              value={impactData.peopleHelped}
              label="People Helped"
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <AnimatedImpactStat
              icon={<FaTrophy />}
              value={impactData.dayStreak}
              label="Day Streak"
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>

        </div>

        {/* Monthly Progress Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-14">Monthly Progress</h2>
          <div className="flex justify-around items-end h-32">
            {monthlyProgress.map((month) => (
              <div key={month.month} className="text-center">
                <div className="bg-gray-200 rounded-lg w-10 h-32 flex items-end">
                  <div className="bg-green-400 rounded-lg w-full" style={{ height: `${month.value}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{month.month}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='lg:grid grid-cols-2 gap-4'>
          {/* Achievements Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <Achievement key={ach.title} {...ach} />
              ))}
            </div>
          </div>

          {/* Local Leaderboard Section */}
          <div>
            {/*  Add avatar */}

            <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Local Leaderboard</h2>
            <div>
              {leaderboard.map((user) => (
                <LeaderboardItem key={user.rank} {...user} />
              ))}
            </div>
          </div>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}