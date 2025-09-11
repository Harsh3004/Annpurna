import React, { useState } from 'react';
import { BottomNav } from './common/BottomNav';

// --- Gemini API Helper 
const callGeminiAPI = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        // Using exponential backoff for retries
        let response;
        for (let i = 0; i < 5; i++) {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) break;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            console.error("Unexpected API response structure:", result);
            return "Sorry, I couldn't generate a suggestion right now. Please try again.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "An error occurred while generating the suggestion. Please check the console for details.";
    }
};

// --- Clipboard Helper ---
const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.opacity = 0;
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        // Use document.execCommand for broader browser support in iframes
        const successful = document.execCommand('copy');
        if(!successful) console.error('Fallback: Oops, unable to copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
};


// --- Helper Data ---
const impactStats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    ),
    value: 0,
    label: "Meals Donated",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-500"><path d="M11 20A7 7 0 0 1 4 13H2a9 9 0 0 0 18 0h-2a7 7 0 0 1-7 7Zm-2-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-4-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
    ),
    value: 0,
    label: "kg CO2 Saved",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-500"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
    ),
    value: 0,
    label: "Smiles Shared",
  },
];

const events = [
  {
    title: "Community Kitchen Drive",
    date: "Tomorrow, 10 AM",
    location: "Central Park, Mumbai",
    volunteers: 24,
  },
  {
    title: "Food Distribution Camp",
    date: "Sunday, 9 AM",
    location: "Station Road, Delhi",
    volunteers: 18,
  },
];


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
const LoadingSpinner = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


// --- Reusable Modal Component ---
const SuggestionModal = ({ content, onClose, title }) => {
    if (!content) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                    </button>
                </div>
                <div className="text-sm text-gray-600 whitespace-pre-wrap prose">{content}</div>
                 <button 
                    onClick={onClose}
                    className="mt-6 w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
                >
                    Sounds Good!
                </button>
            </div>
        </div>
    );
};


// --- Individual Components ---
const Header = () => (
  <header className="bg-emerald-500 text-white p-6 rounded-b-3xl">
    <div className="flex justify-between items-center mb-4">
      <div>
        <p className="text-sm">Good Evening</p>
        <h1 className="text-2xl font-bold">Welcome, Harsh! 👋</h1>
      </div>
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-amber-400"></span>
      </div>
    </div>
  </header>
);

const ShareMealCard = () => {
    const [inspiration, setInspiration] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getInspiration = async () => {
        setIsLoading(true);
        setInspiration('');
        const prompt = "Write a short, inspiring, and friendly social media post under 280 characters to encourage people to donate surplus food through a local app. Mention the positive impact on the community and include a call to action. Use hashtags like #FoodDonation #CommunitySupport.";
        const result = await callGeminiAPI(prompt);
        setInspiration(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow-md mt-5 mx-4 relative z-10">
            <div className="flex justify-between items-center">
                 <div>
                    <h2 className="font-bold text-gray-800">Share a Meal Today</h2>
                    <p className="text-sm text-gray-500">Turn your surplus food into someone's happiness</p>
                </div>
                <button className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition-colors">
                    Donate Now
                </button>
            </div>
            <div className="mt-4 pt-4 border-t">
                 <button 
                    onClick={getInspiration}
                    disabled={isLoading}
                    className="w-full bg-amber-400 text-amber-900 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-amber-500 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <LoadingSpinner className="h-5 w-5 text-amber-900" />
                    ) : (
                       <>✨ Get Sharing Inspiration</>
                    )}
                 </button>
                 {inspiration && !isLoading && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-700 animate-fade-in-up">
                        <p className="italic">"{inspiration}"</p>
                         <button 
                            onClick={() => copyToClipboard(inspiration)}
                            className="text-emerald-600 font-semibold text-xs mt-2 hover:underline"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                 )}
            </div>
        </div>
    );
};

const ImpactSection = () => (
  <section className="p-4">
    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Impact</h3>
    <div className="grid grid-cols-3 gap-4">
      {impactStats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="mb-2">{stat.icon}</div>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          <p className="text-xs text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const RecentDonations = () => (
    <section className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">My Recent Donations</h3>
            <a href="#" className="text-sm font-semibold text-emerald-500 hover:text-emerald-600">View All →</a>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
                <HeartIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700 mb-1">No donations yet</p>
            <p className="text-sm text-gray-500 mb-4">Start your journey by making your first donation!</p>
            <button className="bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-600 transition-colors">
                Make Your First Donation
            </button>
        </div>
    </section>
);

const OngoingEvents = () => {
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const suggestEvent = async () => {
        setIsLoading(true);
        const prompt = `Suggest a creative and impactful food donation event idea for a local community near Indore, India. Provide a catchy title, a suggested date/time (e.g., 'Next Saturday morning'), a general location type (e.g., 'a local community park'), and a brief, engaging description of the event. Format the output clearly with headings for Title, Date, Location, and Description.`;
        const result = await callGeminiAPI(prompt);
        setSuggestion(result);
        setIsLoading(false);
    };
    
  return (
    <section className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Ongoing Events</h3>
            <a href="#" className="text-sm font-semibold text-emerald-500 hover:text-emerald-600">View All →</a>
        </div>
         <div className="mb-4">
            <button
                onClick={suggestEvent}
                disabled={isLoading}
                className="w-full bg-emerald-100 text-emerald-700 font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-emerald-200 transition-colors flex items-center justify-center disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
                 {isLoading ? (
                    <LoadingSpinner className="h-5 w-5 text-emerald-700" />
                ) : (
                   '✨ Suggest a New Event'
                )}
            </button>
        </div>
        <div className="space-y-4">
        {events.map((event, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-gray-800">{event.title}</h4>
                        <div className="flex items-center text-gray-500 text-sm mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>{event.location}</span>
                        </div>
                    </div>
                    <button className="bg-emerald-500 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-md hover:bg-emerald-600 transition-colors self-start">
                        Register
                    </button>
                </div>
                <div className="border-t my-3"></div>
                <div className="flex items-center text-gray-500 text-sm">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    <span>{event.volunteers} volunteers registered</span>
                </div>
            </div>
        ))}
        </div>
         <SuggestionModal content={suggestion} onClose={() => setSuggestion('')} title="✨ Event Suggestion" />
    </section>
  );
}



export const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-md md:max-w-screen mx-auto md:mx-0 bg-gray-50 pb-24">
        <Header/>
        <main>
            <ShareMealCard />
            <ImpactSection />
            <RecentDonations />
            <OngoingEvents />
        </main>
      </div>
      <BottomNav />
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
