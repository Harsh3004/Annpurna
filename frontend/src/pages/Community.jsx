import React, { useState } from 'react';
import { BottomNav } from './common/BottomNav';

// Using inline SVGs for icons to keep it in a single file
const icons = {
  heart: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  camera: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.53 2h2.94a2 2 0 011.664.89l.812 1.22a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  comment: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.493a9.862 9.862 0 01-2.67-4.507c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  share: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C12.457 13.993 15 15.65 15 17h-.069a8.68 8.68 0 00-7.337-11.233C9 5.568 9 5.674 9 5.781c0 3.39-2.91 6.134-6.5 6.134H2c.552 0 1-.448 1-1V9a2 2 0 012-2h.93c1.664 0 2.894.89 3.42 2.228.526 1.338 1.13 2.28 2.052 2.885z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17a5 5 0 11-10 0 5 5 0 0110 0zM12 7a3 3 0 100 6 3 3 0 000-6z"
      />
    </svg>
  ),
  plus: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),
  users: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.5v15M17.5 12h-11a5.5 5.5 0 010-11h11a5.5 5.5 0 010 11z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11H8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 16H8"
      />
    </svg>
  ),
  calendar: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  mapPin: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

// Mock data for the posts
const mockPosts = [
  {
    initials: 'RS',
    author: 'Rahul Sharma',
    time: '2 hours ago',
    content:
      'Just delivered 20 servings of dal-rice to the local shelter. The smiles on their faces made my entire day! 😊',
    tag: 'Dal Rice - 20 servings',
    image: 'https://placehold.co/400x200/e2e8f0/0f172a?text=Story',
    likes: 24,
    comments: 8,
  },
  {
    initials: 'PS',
    author: 'Priya Singh',
    time: '5 hours ago',
    content:
      'Amazing experience volunteering at today’s food drive! We managed to distribute meals to over 100 families. Thank you to everyone who donated! 🙏',
    tag: null,
    image: 'https://placehold.co/400x200/e2e8f0/0f172a?text=Story',
    likes: 45,
    comments: 12,
  },
  {
    initials: 'CKM',
    author: 'Community Kitchen Mumbai',
    time: '1 day ago',
    content:
      'Weekly update: This week we received donations from 89 generous donors and served 547 meals to those in need. Together we’re making a difference! 💪',
    tag: null,
    image: 'https://placehold.co/400x200/e2e8f0/0f172a?text=Story',
    likes: 67,
    comments: 18,
  },
];

// Mock data for the groups
const mockGroups = [
  {
    image: 'https://placehold.co/40x40/e2e8f0/0f172a?text=Mumbai+Food',
    name: 'Mumbai Food Warriors',
    description: 'Fighting hunger one meal at a time in Mumbai',
    members: 1247,
    status: 'Joined',
  },
  {
    image: 'https://placehold.co/40x40/e2e8f0/0f172a?text=Delhi+Hunger+Relief',
    name: 'Delhi Hunger Relief',
    description: 'Community-driven food donation network in Delhi',
    members: 892,
    status: 'Join',
  },
  {
    image: 'https://placehold.co/40x40/e2e8f0/0f172a?text=Weekend+Food+Drives',
    name: 'Weekend Food Drives',
    description: 'Organizing weekend food distribution events',
    members: 456,
    status: 'Joined',
  },
];

// Mock data for the events
const mockEvents = [
  {
    image: 'https://placehold.co/400x120/e2e8f0/0f172a?text=Community+Kitchen+Drive',
    name: 'Community Kitchen Drive',
    date: 'Tomorrow, 10 AM',
    location: 'Central Park, Mumbai',
    volunteers: 24,
    tag: 'Food Drive',
    buttonText: 'Register',
  },
  {
    image: 'https://placehold.co/400x120/e2e8f0/0f172a?text=Food+Distribution+Camp',
    name: 'Food Distribution Camp',
    date: 'Sunday, 9 AM',
    location: 'Station Road, Delhi',
    volunteers: 18,
    tag: 'Distribution',
    buttonText: 'Register',
  },
  {
    image: 'https://placehold.co/400x120/e2e8f0/0f172a?text=Volunteer+Training+Workshop',
    name: 'Volunteer Training Workshop',
    date: 'Next Monday, 6 PM',
    location: 'Online Event',
    volunteers: 34,
    tag: 'Workshop',
    buttonText: 'Register',
  },
];

export const Community = () => {
  const [activeTab, setActiveTab] = useState('Stories');
  const [newPostText, setNewPostText] = useState('');
  const [summaryText, setSummaryText] = useState({});
  const [loading, setLoading] = useState(false);

  const tabs = ['Stories', 'Groups', 'Events'];
  const navItems = ['Home', 'Donate', 'Community', 'Impact', 'Profile'];

  // This function will call the Gemini API to get a post suggestion
  const getPostSuggestion = async () => {
    if (!newPostText.trim()) return;

    setLoading(true);
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const userQuery = `Expand on this donation story: "${newPostText}"`;
    const systemPrompt = "Act as a compassionate social media assistant. Provide a concise, single-paragraph continuation of the user's donation story. Make it engaging and emotionally resonant. Do not include hashtags.";

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          setNewPostText(newPostText + " " + text);
        }
    } catch (error) {
        console.error("Error fetching post suggestion:", error);
    } finally {
        setLoading(false);
    }
  };

  // This function will call the Gemini API to summarize event contributions
  const getEventSummary = async (eventName, volunteers) => {
    if (summaryText[eventName]) return; // Don't re-generate if already exists
    
    setLoading(true);
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const userQuery = `Summarize the contribution of ${volunteers} volunteers for the event "${eventName}".`;
    const systemPrompt = "Act as an encouraging community manager. Write a brief, single-sentence summary of the volunteers' contribution. Focus on teamwork, a positive impact, and the power of collective effort. The summary should be concise and human-like.";

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          setSummaryText(prev => ({ ...prev, [eventName]: text }));
        }
    } catch (error) {
        console.error("Error fetching event summary:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-green-700">Community</h1>
        <div className="w-6 h-6 text-green-700">{icons.plus({})}</div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pb-20">
        {/* Tab Navigation */}
        <div className="bg-gray-200 rounded-full p-1 flex justify-between mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-white text-green-700 shadow-md'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conditional Content based on Active Tab */}
        {activeTab === 'Stories' && (
          <>
            {/* Post Creation Box */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center gap-4">
              <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm">
                PS
              </div>
              <input
                type="text"
                placeholder="Share your donation story..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />
              <button 
                className="bg-purple-500 rounded-full p-2 text-white"
                onClick={getPostSuggestion}
                disabled={loading}
              >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-t-white border-purple-200 rounded-full animate-spin"></div>
                ) : (
                    <span className="w-5 h-5 text-lg">✨</span>
                )}
              </button>
              <button className="bg-green-500 rounded-full p-2 text-white">
                {icons.camera({ className: 'w-5 h-5' })}
              </button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4">
              {mockPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4">
                  {/* Post Header */}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm">
                      {post.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{post.author}</h3>
                      <p className="text-gray-400 text-xs">{post.time}</p>
                    </div>
                  </div>
                  {/* Post Content */}
                  <p className="text-gray-700 mb-2">{post.content}</p>
                  {post.tag && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      {post.tag}
                    </span>
                  )}
                  {post.image && (
                    <img src={post.image} alt="Story" className="mt-2 rounded-lg mx-auto" />
                  )}
                  {/* Post Actions */}
                  <div className="flex items-center justify-around text-gray-400 mt-4 border-t pt-4">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5">{icons.heart({})}</div>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5">{icons.comment({})}</div>
                      <span>{post.comments}</span>
                    </div>
                    <div className="w-5 h-5">{icons.share({})}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Groups' && (
          <div className="space-y-4">
            {mockGroups.map((group, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                <img src={group.image} alt="Group" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{group.name}</h3>
                  <p className="text-gray-500 text-sm">{group.description}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <div className="w-4 h-4">{icons.users({})}</div>
                    <span>{group.members} members</span>
                  </div>
                </div>
                <button
                  className={`py-1 px-3 rounded-full text-sm font-medium ${
                    group.status === 'Joined'
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {group.status}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Events' && (
          <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-4">
            {mockEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-4">
                <img src={event.image} alt="Event" className="w-full rounded-lg mb-2" />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{event.name}</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                    {event.tag}
                  </span>
                </div>
                <div className="text-gray-500 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4">{icons.calendar({})}</div>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4">{icons.mapPin({})}</div>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4">{icons.users({})}</div>
                    <span>{event.volunteers} volunteers registered</span>
                  </div>
                  {summaryText[event.name] && (
                    <p className="text-green-700 italic mt-2">{summaryText[event.name]}</p>
                  )}
                </div>
                <button 
                    className="w-full bg-green-500 text-white font-bold py-2 mt-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    onClick={() => getEventSummary(event.name, event.volunteers)}
                    disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 mx-auto border-2 border-t-white border-green-200 rounded-full animate-spin"></div>
                  ) : (
                    event.buttonText
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}