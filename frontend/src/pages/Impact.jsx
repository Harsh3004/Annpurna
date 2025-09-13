import React, { useState, useEffect } from 'react';
import { BottomNav } from './common/BottomNav';
import { FaHeart, FaLeaf, FaRegSmile, FaUsers, FaTrophy, FaStar } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Registering Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
  ArcElement, BarElement
);

// --- Reusable Icon Components ---
const CalculatorIcon = () => (<svg xmlns="http://www.w.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="12" y1="10" x2="12" y2="18"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>);
const HistoryIcon = () => (<svg xmlns="http://www.w.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const BackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-800"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);
const LeafIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-emerald-600"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.7.7a5.4 5.4 0 0 0-7.65 0 5.4 5.4 0 0 0 0 7.65l.7.7a5.4 5.4 0 0 0 7.65 0l.7-.7a5.4 5.4 0 0 0 0-7.65z"></path><path d="M12 12l8 8"></path></svg>);

// --- START: CORRECTED HELPER COMPONENTS ---

// Helper component for individual impact stats with animation
const AnimatedImpactStat = ({ icon, value: endValue, label, bgColor, unit }) => {
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    let startTime = null;
    const duration = 1500;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrentValue(Math.floor(progress * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [endValue]);
  return (<div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center"><div className={`rounded-full p-3 mb-2 ${bgColor}`}>{icon}</div><span className="text-2xl font-bold text-gray-800">{currentValue}{unit || ''}</span><span className="text-sm text-gray-500">{label}</span></div>);
};

// Helper component for achievements
const Achievement = ({ icon, title, progress }) => (<div className="bg-white p-4 rounded-2xl shadow-sm text-center"><div className="text-4xl mb-2">{icon}</div><p className="font-semibold text-gray-700 text-sm mb-2">{title}</p><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div><p className="text-xs text-gray-500 mt-1">{progress}%</p></div>);

// Helper component for leaderboard entries
const LeaderboardItem = ({ rank, name, meals, isCurrentUser }) => (<div className={`flex items-center p-3 rounded-xl mb-3 ${isCurrentUser ? 'bg-green-100 border border-green-400' : 'bg-white shadow-sm'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mr-4 ${rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-yellow-600' : 'bg-gray-300'}`}>{rank}</div><div className="flex-grow text-left"><p className={`font-bold text-gray-800 ${isCurrentUser ? 'text-green-800' : ''}`}>{name} {isCurrentUser && '(You)'}</p><p className="text-sm text-gray-500">{meals} meals donated</p></div></div>);

// --- END: CORRECTED HELPER COMPONENTS ---


// --- START: CALCULATOR COMPONENTS ---

const PromoCard = ({ onCalculateClick }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-sm md:max-w-screen shadow-md flex flex-col items-center gap-4 font-sans mb-10">
    <div className="flex items-center gap-3"><CalculatorIcon /><h2 className="text-lg font-semibold text-gray-900 m-0">Carbon Footprint Calculator</h2></div>
    <p className="text-base text-gray-700 leading-relaxed m-0 text-center">Calculate your personal carbon footprint and learn how to reduce your environmental impact.</p>
    <button onClick={onCalculateClick} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-lg w-full transition-colors duration-200">Calculate My Carbon Footprint</button>
  </div>
);

const AnimatedNumber = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    let startTime = null;
    const duration = 1000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrentValue(progress * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span className="font-bold text-5xl text-gray-900">{currentValue.toFixed(1)}</span>;
};

const EmissionsDonutChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{ data: data.map(item => item.value), backgroundColor:git  ['#34D399', '#FCD34D', '#FB923C'], borderColor: '#ffffff', borderWidth: 2, }],
  };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12, padding: 20, font: { size: 14 }, color: '#4B5563' } }, tooltip: { callbacks: { label: (c) => `${c.label || ''}: ${c.parsed || 0} kg CO₂` } } }, cutout: '60%' };
  return <div className="relative h-64 w-full"><Doughnut data={chartData} options={options} /></div>;
};

const GlobalComparisonBarChart = ({ userAnnual, globalAverage }) => {
  const chartData = {
    labels: ['Your Annual Footprint', 'Global Average'],
    datasets: [{ data: [userAnnual, globalAverage], backgroundColor: ['#10B981', '#6B7280'], borderColor: ['#047857', '#4B5563'], borderWidth: 1, borderRadius: 5 }],
  };
  const options = { responsive: true, maintainAsgit pectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${c.dataset.label || ''}: ${c.parsed.y || 0} kg CO₂` } } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'CO₂ (kg)', color: '#4B5563' }, ticks: { color: '#6B7280' }, grid: { color: '#E5E7EB' } }, x: { ticks: { color: '#6B7280' }, grid: { display: false } } } };
  return <div className="relative h-64 w-full"><Bar data={chartData} options={options} /></div>;
};

const ResultsView = ({ onCalculateAgain }) => {
  const resultData = { total: 51.0, breakdown: [{ category: 'Transportation', value: 0.0, icon: '🚗' }, { category: 'Energy', value: 0.0, icon: '⚡️' }, { category: 'Food', value: 51.0, icon: '🥗' }], globalAverage: 4000 };
  const userAnnual = resultData.total * 12;
  const percentBelowAverage = ((resultData.globalAverage - userAnnual) / resultData.globalAverage) * 100;

  return (
    <div className="w-full max-w-md lg:max-w-screen mx-auto font-sans mb-10 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">Your Results</h1>
        <button onClick={onCalculateAgain} className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M21.5 2v6h-6M2.5 22v-6h6" />
          <path d="M22 11.5A10 10 0 0 0 3.5 12.5" />
          <path d="M2 12.5a10 10 0 0 0 18.5-1" />
        </svg>
          Calculate Again
        </button>
      </div>

      <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4">
        <div className='row-span-2 space-y-8'>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md text-center space-y-3">
          <div className="flex items-center justify-center gap-2"><LeafIcon />
            <h2 className="text-lg font-semibold text-gray-900">
              Your Carbon Footprint
            </h2>
          </div>

          <div>
            <AnimatedNumber value={resultData.total} />
            <span className="text-2xl text-gray-600"> kg CO₂</span>
            <p className="text-gray-500">monthly emissions</p></div><p className="text-gray-600 font-medium">{(resultData.total * 12).toFixed(1)} kg CO₂ annually</p><span className="inline-flex items-center gap-1 text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">🌱 Low Impact</span><div className="text-left pt-4"><div className="flex justify-between text-sm font-medium text-gray-600 mb-1"><span>vs Global Average</span><span>{resultData.globalAverage.toLocaleString()} kg CO₂/year</span></div><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-gray-800 h-2.5 rounded-full" style={{ width: `${(userAnnual / resultData.globalAverage) * 100}%` }}></div></div><p className="text-center text-sm text-gray-600 mt-2 font-medium">{percentBelowAverage.toFixed(0)}% below average</p></div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md"><h3 className="font-semibold text-gray-900 mb-2">Personalized Feedback</h3><p className="text-gray-700">Your carbon footprint is lower than average! Great job on your environmental consciousness.</p></div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md"><h3 className="font-semibold text-gray-900 mb-3">Ways to Reduce Your Impact</h3><ul className="list-disc list-inside space-y-2 text-emerald-700"><li><span className="text-gray-700">Use public transport, bike, or walk instead of driving</span></li><li><span className="text-gray-700">Switch to renewable energy sources</span></li><li><span className="text-gray-700">Reduce meat consumption and food waste</span></li><li><span className="text-gray-700">Donate surplus food through Annapurna to prevent waste</span></li></ul></div>

        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4"><h3 className="font-semibold text-gray-900">Emissions Breakdown</h3><EmissionsDonutChart data={resultData.breakdown} /></div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4"><h3 className="font-semibold text-gray-900">Global Comparison (Annual)</h3><GlobalComparisonBarChart userAnnual={userAnnual} globalAverage={resultData.globalAverage} /></div>
      </div>
    </div>
  );
};

const CalculatorView = ({ onBackClick }) => {
  const [mainView, setMainView] = useState('Calculator');
  const [calculatorState, setCalculatorState] = useState('form');
  const [activeCategory, setActiveCategory] = useState('Food');
  const historyData = [{ id: 1, value: 51.0, period: 'monthly', date: 'Sep 13, 2025', annualValue: 612.0, tag: 'low' }, { id: 2, value: 0.0, period: 'monthly', date: 'Sep 13, 2025', annualValue: 0.0, tag: 'low' }];
  const mainTabClass = (viewName) => `flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-full transition-all duration-200 ` + (mainView === viewName ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500');
  const categoryTabClass = (categoryName) => `flex-1 flex items-center justify-center gap-2 py-2 font-semibold rounded-full transition-all duration-200 ` + (activeCategory === categoryName ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-200');

  return (
    <div className="w-full max-w-md lg:max-w-screen mx-auto font-sans mb-10">
      {calculatorState === 'form' ? (
        <>
          <div className="flex items-center mb-6">
            <button onClick={onBackClick} className="p-2 -ml-2">
              <BackIcon />
            </button>
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900">Carbon Footprint</h1>
              <p className="text-sm text-gray-600">
                Calculate and track your environmental impact
              </p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-1 rounded-full mb-6"><button onClick={() => setMainView('Calculator')} className={mainTabClass('Calculator')}><CalculatorIcon /> Calculator</button><button onClick={() => setMainView('History')} className={mainTabClass('History')}><HistoryIcon /> History</button></div>
          {mainView === 'Calculator' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col gap-6 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <CalculatorIcon />
                <h2 className="text-lg font-semibold text-gray-900">Carbon Footprint Calculator</h2>
              </div>
              <div>
                <label htmlFor="time-period" className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select id="time-period" className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400"><option>Monthly</option><option>Yearly</option></select></div>
              <div className="flex items-center bg-gray-100 p-1 rounded-full text-sm">
                {/* <button onClick={() => setActiveCategory('Transport')} className={categoryTabClass('Transport')}>🚗 Transport</button>
                              <button onClick={() => setActiveCategory('Energy')} className={categoryTabClass('Energy')}>⚡️ Energy</button> */}

                <button onClick={() => setActiveCategory('Food')} className={categoryTabClass('Food')}>🥗 Food</button></div>
              <div className="flex flex-col gap-4">
                {activeCategory === 'Transport' && (<p className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">Transport inputs go here.</p>)}
                {activeCategory === 'Food' && (<div><label htmlFor="diet-type" className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label><select id="diet-type" className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400"><option value="" disabled selected>Select your diet type</option><option value="vegan">Vegan</option></select></div>)}
                {activeCategory === 'Energy' && (<p className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">Energy inputs go here. 💡</p>)}
              </div>
              <button onClick={() => setCalculatorState('result')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-lg w-full transition-colors duration-200 mt-2">Calculate Carbon Footprint</button>
            </div>
          )}
          {mainView === 'History' && (<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col gap-4 animate-fade-in-up"><div className="flex items-center gap-3"><CalendarIcon /><h2 className="text-lg font-semibold text-gray-900">Calculation History</h2></div><div className="flex flex-col gap-3">{historyData.map(item => (<div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4"><div className="flex justify-between items-center mb-2"><p className="text-lg text-gray-800"><span className="font-bold">{item.value.toFixed(1)} kg CO₂</span></p><span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>{item.tag}</span></div><p className="text-sm text-gray-500">{item.period} • {item.date}</p><p className="text-sm text-gray-500">Annual: {item.annualValue.toFixed(1)} kg CO₂</p></div>))}</div></div>)}
        </>
      ) : (<ResultsView onCalculateAgain={() => setCalculatorState('form')} />)}
    </div>
  );
};

export const Impact = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const handleCalculateClick = () => setShowCalculator(true);
  const handleBackClick = () => setShowCalculator(false);
  const impactData = { level: 1, points: 0, totalDonations: 0, progressToNextLevel: 0, co2Saved: 88, smilesShared: 152, peopleHelped: 45, dayStreak: 12 };
  const achievements = [{ icon: '🎉', title: 'First Donation', progress: 0 }, { icon: '📅', title: 'Weekly Donor', progress: 0 }, { icon: '🍲', title: '100 Meals Donated', progress: 0 }, { icon: '👥', title: 'Community Builder', progress: 0 }, { icon: '⭐', title: 'Impact Maker', progress: 0 }, { icon: '🌿', title: 'Eco Warrior', progress: 0 }];
  const leaderboard = [{ rank: 1, name: 'Rajesh Kumar', meals: 2156 }, { rank: 2, name: 'Harsh Joshi', meals: 0, isCurrentUser: true }, { rank: 3, name: 'Amit Patel', meals: 1089 }, { rank: 4, name: 'Sunita Sharma', meals: 987 }, { rank: 5, name: 'Rohit Gupta', meals: 834 }].sort((a, b) => b.meals - a.meals).map((user, index) => ({ ...user, rank: index + 1 }));
  const lineChartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: '#E5E7EB' }, ticks: { color: '#6B7280' } }, x: { grid: { display: false }, ticks: { color: '#6B7280' } } }, elements: { line: { tension: 0.4 } } };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
  const lineChartData = { labels, datasets: [{ label: 'Monthly Progress', data: [0, 95, 63, 10, 55, 72, 22, 30, 10], borderColor: 'rgb(16, 185, 129)', backgroundColor: 'rgba(16, 185, 129, 0.5)', pointBackgroundColor: 'rgb(16, 185, 129)', pointBorderColor: '#fff', pointHoverRadius: 7, pointRadius: 5 }] };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto lg:mx-0 p-4 max-w-md lg:max-w-screen lg:grid lg:grid-cols-1 mb-20">
        <div>
          <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-lg mb-6">
            <h1 className="text-2xl font-bold mb-4">Your Impact</h1>
            <div className="flex items-center">
              <div className="bg-yellow-400 p-2 rounded-full mr-4">
                <FaStar />
              </div>
              <div className='text-left'>
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
                <div className="bg-white h-2.5 rounded-full" style={{ width: `${impactData.progressToNextLevel}%` }}>
                </div>
              </div>
              <p className="text-right text-xs mt-1">{impactData.progressToNextLevel}/100</p>
            </div>
          </div>

          {showCalculator ? <CalculatorView onBackClick={handleBackClick} /> : <PromoCard onCalculateClick={handleCalculateClick} />}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <AnimatedImpactStat icon={<FaLeaf />} value={impactData.co2Saved} unit=" kg" label="CO₂ Saved" bgColor="bg-green-100" />
            <AnimatedImpactStat icon={<FaRegSmile />} value={impactData.smilesShared} label="Smiles Shared" bgColor="bg-yellow-100" />
            <AnimatedImpactStat icon={<FaUsers />} value={impactData.peopleHelped} label="People Helped" bgColor="bg-blue-100" />
            <AnimatedImpactStat icon={<FaTrophy />} value={impactData.dayStreak} label="Day Streak" bgColor="bg-orange-100" /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6"><h2 className="text-lg font-bold text-gray-800 mb-4">Monthly Progress</h2><div className="relative h-64"><Line options={lineChartOptions} data={lineChartData} /></div></div>
        <div className='lg:grid grid-cols-2 gap-4'>
          <div className="mb-6"><h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Achievements</h2><div className="grid grid-cols-2 gap-4">{achievements.map((ach) => (<Achievement key={ach.title} {...ach} />))}</div></div>
          <div><h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Local Leaderboard</h2><div>{leaderboard.map((user) => (<LeaderboardItem key={user.rank} {...user} />))}</div></div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}