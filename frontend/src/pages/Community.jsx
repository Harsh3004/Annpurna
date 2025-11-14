import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegCommentDots } from 'react-icons/fa6';
import { FaShareAlt, FaCamera, FaPeopleCarry, FaRegClock, FaUserFriends } from 'react-icons/fa';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { HiSparkles  } from 'react-icons/hi2';
import donation1 from '../assets/donation1.png';
import donation2 from '../assets/donation2.png';
import training from '../assets/training.png';
import community1 from '../assets/community1.png';
import foodDonation from '../assets/foodDonation.png';

const icons = {
  heart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  mapPin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

const mockPosts = [
  {
    initials: 'RS',
    author: 'Rahul Sharma',
    time: '2 hours ago',
    content:
      'Just delivered 20 servings of dal-rice to the local shelter. The smiles on their faces made my entire day! 😊',
    tag: 'Dal Rice - 20 servings',
    image: donation1,
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
    image: donation2,
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

const mockEvents = [
  {
    image: community1,
    name: 'Community Kitchen Drive',
    date: 'Tomorrow, 10 AM',
    location: 'Central Park, Mumbai',
    volunteers: 24,
    tag: 'Food Drive',
    buttonText: 'Register',
  },
  {
    image: foodDonation,
    name: 'Food Distribution Camp',
    date: 'Sunday, 9 AM',
    location: 'Station Road, Delhi',
    volunteers: 18,
    tag: 'Distribution',
    buttonText: 'Register',
  },
  {
    image: training,
    name: 'Volunteer Training Workshop',
    date: 'Next Monday, 6 PM',
    location: 'Online Event',
    volunteers: 34,
    tag: 'Workshop',
    buttonText: 'Register',
  },
];

const tabs = [
  { key: 'stories', title: 'Stories', hint: 'Live updates from meal heroes near you.' },
  { key: 'groups', title: 'Groups', hint: 'Coordinate with city-based hunger squads.' },
  { key: 'events', title: 'Events', hint: 'Volunteer or host the next rescue drive.' },
];

const LoadingSpinner = () => (
  <span className="inline-flex h-5 w-5 animate-spin items-center justify-center rounded-full border-2 border-brand-200 border-t-brand-600" />
);

const CommunityHero = () => (
  <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-[0_34px_90px_-55px_rgba(12,80,58,0.55)] backdrop-blur">
    <div className="pattern-grid absolute -top-36 right-0 h-[340px] w-[340px] opacity-30" />
    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl space-y-4">
        <span className="eyebrow">Community live hub</span>
        <h1 className="section-heading text-balance">Share stories, rally volunteers, and accelerate every donation.</h1>
        <p className="section-subcopy">
          Annapurna’s network brings together donors, NGOs, and on-ground heroes. Highlight a meal rescue, discover new groups, or push a drive over the finish line.
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-brand-700">
          <span className="rounded-full bg-brand-50 px-4 py-2">💬 312 posts this week</span>
          <span className="rounded-full bg-brand-50 px-4 py-2">🤝 54 active city groups</span>
          <span className="rounded-full bg-brand-50 px-4 py-2">🚚 18 live drives</span>
        </div>
      </div>
      <div className="glass-panel card-ring h-full max-w-sm rounded-[28px] border border-white/70 p-6">
        <p className="text-sm font-semibold text-brand-700">Spotlight</p>
        <p className="mt-3 text-lg font-semibold text-brand-800">Indore Midnight Pantry</p>
        <p className="mt-2 text-sm text-brand-700/80">
          Volunteers repurposed 146 surplus meals from cafés for night shelters yesterday. Join tonight’s relay or share surplus from your kitchen.
        </p>
        <Link
          to="#stories"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          See how it was done
        </Link>
      </div>
    </div>
  </section>
);

const TabSwitcher = ({ activeTab, onChange }) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="eyebrow">Collaboration space</p>
        <p className="text-sm text-brand-700/80">Choose what you want to explore right now.</p>
      </div>
    </div>
    <div className="inline-flex rounded-full border border-white/70 bg-white/90 p-1 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === tab.key ? 'bg-brand-600 text-white shadow-md' : 'text-brand-700 hover:bg-brand-50'
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  </div>
);

const CreateStoryBox = ({ value, onChange, onSuggest, loading }) => (
  <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
        HJ
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <textarea
            rows={3}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full resize-none rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-brand-800 placeholder:text-brand-700/50 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
            placeholder="Celebrate a rescue, acknowledge your team, or ask for helping hands…"
          />
          <p className="mt-2 text-xs text-brand-700/60">Tip: Add location + quantity so volunteers can jump in quickly.</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700/80">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 px-4 py-2 text-sm text-brand-700 transition hover:bg-brand-50"
            >
              <FaCamera className="h-4 w-4" />
              Add visuals
            </button>
            <button
              type="button"
              onClick={onSuggest}
              disabled={loading || !value.trim()}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <LoadingSpinner /> : <HiSparkles className="h-4 w-4" />}
              {loading ? 'Polishing…' : 'Enhance with AI'}
            </button>
          </div>
          <button
            type="button"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Post update
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StoryCard = ({ post }) => (
  <article className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200">
    <header className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
        {post.initials}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-semibold text-brand-800">{post.author}</p>
            <p className="text-xs text-brand-700/70">{post.time}</p>
          </div>
          {post.tag && <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700/80">{post.tag}</span>}
        </div>
        <p className="mt-4 text-sm text-brand-700/90">{post.content}</p>
      </div>
    </header>
    {post.image && (
      <img src={post.image} alt="Story" className="mt-4 w-full rounded-2xl object-cover" />
    )}
    <footer className="mt-5 flex items-center justify-between text-sm text-brand-700/70">
      <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-brand-700 transition hover:bg-brand-100">
        {icons.heart}
        {post.likes}
      </button>
      <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-brand-700 transition hover:bg-brand-100">
        <FaRegCommentDots className="h-4 w-4" />
        {post.comments}
      </button>
      <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-brand-700 transition hover:bg-brand-100">
        <FaShareAlt className="h-4 w-4" />
        Share
      </button>
    </footer>
  </article>
);

const StoriesView = ({ newPostText, setNewPostText, onSuggest, loading }) => (
  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
    <div className="space-y-6">
      <CreateStoryBox value={newPostText} onChange={setNewPostText} onSuggest={onSuggest} loading={loading} />
      <div className="grid gap-6">
        {mockPosts.map((post) => (
          <StoryCard key={post.author + post.time} post={post} />
        ))}
      </div>
    </div>
    <aside className="space-y-6">
      <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm">
        <p className="text-sm font-semibold text-brand-700">Live volunteer feed</p>
        <ul className="mt-4 space-y-4 text-sm text-brand-700/80">
          <li className="rounded-2xl bg-brand-50/60 p-4">
            <p className="font-semibold text-brand-700">12 volunteers heading to Andheri shelters</p>
            <p className="mt-1 text-xs text-brand-700/60">ETAs updated 5 minutes ago</p>
          </li>
          <li className="rounded-2xl bg-brand-50/60 p-4">
            <p className="font-semibold text-brand-700">SOS: Need insulated containers in Bandra</p>
            <p className="mt-1 text-xs text-brand-700/60">Ping from Mumbai Food Warriors</p>
          </li>
        </ul>
        <Link
          to="/impact"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Track how your posts convert →
        </Link>
      </div>
      <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm">
        <p className="text-sm font-semibold text-brand-700">Top collaborators</p>
        <div className="mt-4 space-y-3 text-sm text-brand-700/80">
          <p>🥇 Priya Singh · 7 stories this week</p>
          <p>🥈 Community Kitchen Mumbai · 5 drives led</p>
          <p>🥉 HopeNotWaste NGO · 4 pickups handled</p>
        </div>
      </div>
    </aside>
  </div>
);

const GroupsView = () => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {mockGroups.map((group) => (
      <div
        key={group.name}
        className="flex h-full flex-col gap-4 rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200"
      >
        <div className="flex items-start gap-3">
          <img src={group.image} alt={group.name} className="h-12 w-12 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-brand-800">{group.name}</p>
            <p className="text-sm text-brand-700/80">{group.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-brand-700/70">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1">
            <FaUserFriends className="h-4 w-4 text-brand-600" />
            {group.members} members
          </span>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              group.status === 'Joined' ? 'bg-brand-600 text-white' : 'border border-brand-200 text-brand-700 hover:bg-brand-50'
            }`}
          >
            {group.status}
          </button>
        </div>
      </div>
    ))}
  </div>
);

const EventsView = ({ loading, onSummarise, summaryText }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {mockEvents.map((event) => (
      <div
        key={event.name}
        className="flex h-full flex-col gap-4 rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200"
      >
        <img src={event.image} alt={event.name} className="h-40 w-full rounded-2xl object-cover" />
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-lg font-semibold text-brand-800">{event.name}</p>
              <p className="mt-1 text-sm text-brand-700/70">{event.location}</p>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700/80">{event.tag}</span>
          </div>
          <div className="space-y-2 text-sm text-brand-700/90">
            <p className="flex items-center gap-2">
              {icons.calendar}
              {event.date}
            </p>
            <p className="flex items-center gap-2">
              <MdOutlinePeopleAlt className="h-5 w-5 text-brand-600" />
              {event.volunteers} volunteers onboard
            </p>
          </div>
          {summaryText[event.name] && (
            <p className="rounded-2xl bg-brand-50/70 p-4 text-sm text-brand-700/90">{summaryText[event.name]}</p>
          )}
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            {event.buttonText}
            <FaPeopleCarry className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onSummarise(event.name, event.volunteers)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <LoadingSpinner /> : <FaRegClock className="h-4 w-4" />}
            {loading ? 'Summarising…' : 'Summarise volunteer impact'}
          </button>
        </div>
      </div>
    ))}
  </div>
);

export const Community = () => {
  const [activeTab, setActiveTab] = useState('stories');
  const [newPostText, setNewPostText] = useState('');
  const [summaryText, setSummaryText] = useState({});
  const [loading, setLoading] = useState(false);

  const getPostSuggestion = async () => {
    if (!newPostText.trim()) return;

    setLoading(true);
    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const userQuery = `Expand on this donation story: "${newPostText}"`;
    const systemPrompt =
      "Act as a compassionate social media assistant. Provide a concise, single-paragraph continuation of the user's donation story. Make it engaging and emotionally resonant. Do not include hashtags.";

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ google_search: {} }],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setNewPostText((prev) => `${prev} ${text}`);
      }
    } catch (error) {
      console.error('Error fetching post suggestion:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventSummary = async (eventName, volunteers) => {
    if (summaryText[eventName]) return;

    setLoading(true);
    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const userQuery = `Summarize the contribution of ${volunteers} volunteers for the event "${eventName}".`;
    const systemPrompt =
      "Act as an encouraging community manager. Write a brief, single-sentence summary of the volunteers' contribution. Focus on teamwork, a positive impact, and the power of collective effort. The summary should be concise and human-like.";

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ google_search: {} }],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setSummaryText((prev) => ({ ...prev, [eventName]: text }));
      }
    } catch (error) {
      console.error('Error fetching event summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-10">
      <CommunityHero />

      <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />

      <div className="rounded-[32px] border border-white/70 bg-white/75 p-8 shadow-[0_28px_80px_-50px_rgba(12,80,58,0.45)] backdrop-blur">
        <p className="text-sm text-brand-700/80">
          {tabs.find((tab) => tab.key === activeTab)?.hint}
        </p>
        <div className="mt-6">
          {activeTab === 'stories' && (
            <StoriesView
              newPostText={newPostText}
              setNewPostText={setNewPostText}
              onSuggest={getPostSuggestion}
              loading={loading}
            />
          )}
          {activeTab === 'groups' && <GroupsView />}
          {activeTab === 'events' && (
            <EventsView loading={loading} onSummarise={getEventSummary} summaryText={summaryText} />
          )}
        </div>
      </div>
    </div>
  );
};