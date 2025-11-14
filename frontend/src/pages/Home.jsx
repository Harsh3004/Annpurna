import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaArrowRight, FaLeaf, FaPeopleCarry, FaRegClock } from 'react-icons/fa';
import { HiSparkles } from "react-icons/hi2";

// --- Gemini API Helper ----------------------------------------------------
const callGeminiAPI = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    let response;
    for (let i = 0; i < 5; i++) {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) break;
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000));
    }

    if (!response?.ok) {
      throw new Error(`API call failed with status: ${response?.status}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    }

    console.error('Unexpected API response structure:', result);
    return "Sorry, I couldn't generate a suggestion right now. Please try again.";
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'An error occurred while generating the suggestion. Please check the console for details.';
  }
};

// --- Clipboard Helper -----------------------------------------------------
const copyToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (!successful) {
      console.error('Fallback: unable to copy');
    }
    toast.success('Copied to clipboard');
  } catch (err) {
    console.error('Clipboard error', err);
  }
  document.body.removeChild(textArea);
};

// --- Static Content -------------------------------------------------------
const heroHighlights = [
  { label: 'Active hunger spots', value: 42 },
  { label: 'Volunteers on duty', value: 118 },
  { label: 'Meals rescued today', value: 326 },
];

const impactStats = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    value: '0',
    unit: 'meals',
    label: 'Donations delivered',
    delta: '+18 this week',
  },
  {
    icon: <FaLeaf className="h-6 w-6" />,
    value: '0',
    unit: 'kg',
    label: 'CO₂ saved',
    delta: 'Goal: 500 kg',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
    value: '0',
    unit: '',
    label: 'Smiles shared',
    delta: 'Invite 3 friends',
  },
];

const events = [
  {
    title: 'Community Kitchen Drive',
    date: 'Tomorrow, 10:00 AM',
    location: 'Central Park, Mumbai',
    volunteers: 24,
    focus: 'Cooked Meals',
  },
  {
    title: 'Food Distribution Camp',
    date: 'Sunday, 9:00 AM',
    location: 'Station Road, Delhi',
    volunteers: 18,
    focus: 'Dry Rations',
  },
  {
    title: 'Zero Waste Cafeteria',
    date: 'Friday, 7:30 PM',
    location: 'Tech Park, Indore',
    volunteers: 12,
    focus: 'Corporate Drive',
  },
];

// --- UI Components --------------------------------------------------------
const LoadingSpinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const HeroBanner = ({ onDonate }) => (
  <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-[0_28px_80px_-45px_rgba(12,80,58,0.45)] backdrop-blur">
    <div className="pattern-grid absolute -top-40 right-0 h-[360px] w-[360px] opacity-40" />
    <div className="relative z-10 space-y-6">
      <span className="eyebrow">Daily rescue mission</span>
      <h1 className="section-heading text-balance">
        Welcome back, Harsh! Let’s convert surplus meals into community impact.
      </h1>
      <p className="section-subcopy max-w-xl">
        Annapurna connects verified kitchens, volunteers, and NGOs so every extra portion lands on a neighbour’s plate—in minutes, not hours.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onDonate}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Offer a meal now
          <FaArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/impact"
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          View personal dashboard
        </Link>
      </div>
      <dl className="grid gap-4 sm:grid-cols-3">
        {heroHighlights.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/70 bg-white/75 px-5 py-4 text-sm text-brand-700 shadow-sm backdrop-blur"
          >
            <dt className="text-brand-700/70">{item.label}</dt>
            <dd className="mt-1 text-2xl font-semibold text-brand-800">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

const ShareMealCard = () => {
  const [inspiration, setInspiration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getInspiration = async () => {
    setIsLoading(true);
    setInspiration('');
    const prompt =
      'Write a short, inspiring, and friendly social media post under 280 characters to encourage people to donate surplus food through a local app. Mention the positive impact on the community and include a call to action. Use hashtags like #FoodDonation #CommunitySupport.';
    const result = await callGeminiAPI(prompt);
    setInspiration(result);
    setIsLoading(false);
  };

  return (
    <div className="glass-panel card-ring h-full overflow-hidden rounded-[32px] p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-brand-600">Launch a donation</p>
          <h2 className="text-2xl font-semibold text-brand-800">Share a meal today</h2>
          <p className="mt-2 max-w-sm text-sm text-brand-700/75">
            Tell us what’s cooking, pick a drop-off or pickup, and Annapurna routes it to the closest hunger spot.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/donate')}
          className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700 lg:inline-flex"
        >
          Start donation
        </button>
      </div>
      <div className="mt-6 space-y-4 rounded-2xl border border-white/70 bg-white/90 p-5">
        <button
          type="button"
          onClick={getInspiration}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? <LoadingSpinner className="h-5 w-5 text-brand-600" /> : <HiSparkles className="h-5 w-5" />}
          {isLoading ? 'Brewing an idea…' : 'Need words? Generate a sharing post'}
        </button>
        {inspiration && !isLoading && (
          <div className="space-y-3 rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-sm">
            <p className="text-sm text-brand-700/90">“{inspiration}”</p>
            <button
              type="button"
              onClick={() => copyToClipboard(inspiration)}
              className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              Copy for social
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ImpactHighlights = () => (
  <section className="grid gap-5 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_22px_60px_-42px_rgba(12,80,58,0.45)] backdrop-blur lg:grid-cols-3">
    {impactStats.map((stat) => (
      <div key={stat.label} className="flex flex-col justify-between gap-5 rounded-2xl border border-brand-100 bg-white/90 p-5">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            {stat.icon}
          </span>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700/80">{stat.delta}</span>
        </div>
        <div>
          <p className="text-3xl font-semibold text-brand-800">
            {stat.value}
            <span className="ml-1 text-base font-medium text-brand-700/70">{stat.unit}</span>
          </p>
          <p className="mt-2 text-sm text-brand-700/90">{stat.label}</p>
        </div>
      </div>
    ))}
  </section>
);

const RecentDonations = () => {
  const navigate = useNavigate();
  return (
    <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_22px_60px_-42px_rgba(12,80,58,0.35)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Your timeline</p>
          <h3 className="text-xl font-semibold text-brand-800">Latest donations</h3>
          <p className="mt-1 text-sm text-brand-700/80">Track what you’ve shared and invite teammates to join.</p>
        </div>
        <Link
          to="/profile"
          className="rounded-full border border-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          View profile
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-dashed border-brand-100 bg-white/90 p-5 text-center">
          <p className="font-semibold text-brand-700">No donations recorded yet</p>
          <p className="mt-2 text-sm text-brand-700/70">Share your first meal and see your impact bloom here.</p>
          <button
            type="button"
            onClick={() => navigate('/donate')}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Start with a quick donation
          </button>
        </div>
      </div>
    </section>
  );
};

const CommunityPulse = ({ events }) => {
  const totalVolunteers = useMemo(
    () => events.reduce((acc, event) => acc + event.volunteers, 0),
    [events],
  );

  return (
    <section className="flex h-full flex-col justify-between rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_22px_60px_-42px_rgba(12,80,58,0.35)] backdrop-blur">
      <div>
        <p className="eyebrow">Community pulse</p>
        <h3 className="text-xl font-semibold text-brand-800">Rescue network right now</h3>
        <p className="mt-1 text-sm text-brand-700/80">
          Volunteers are in the field—coordinate with them or lead your own drop-off.
        </p>
      </div>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-brand-100 bg-white/90 px-4 py-3">
          <div className="flex items-center gap-3 text-brand-700">
            <FaPeopleCarry className="h-5 w-5 text-brand-600" />
            <div>
              <dt className="text-sm font-semibold">Volunteers coordinating</dt>
              <dd className="text-xs text-brand-700/70">Across all events today</dd>
            </div>
          </div>
          <span className="text-lg font-semibold text-brand-800">{totalVolunteers}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-brand-100 bg-white/90 px-4 py-3">
          <div className="flex items-center gap-3 text-brand-700">
            <FaRegClock className="h-5 w-5 text-brand-600" />
            <div>
              <dt className="text-sm font-semibold">Next pickup window</dt>
              <dd className="text-xs text-brand-700/70">Volunteer requests refresh every 15 minutes</dd>
            </div>
          </div>
          <span className="text-lg font-semibold text-brand-800">14 min</span>
        </div>
      </dl>
      <Link
        to="/community"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
      >
        Coordinate with your crew
        <FaArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
};

const OngoingEvents = ({ events }) => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestEvent = async () => {
    setIsLoading(true);
    const prompt =
      "Suggest a creative and impactful food donation event idea for a local community near Indore, India. Provide a catchy title, a suggested date/time (e.g., 'Next Saturday morning'), a general location type (e.g., 'a local community park'), and a brief, engaging description of the event. Format the output clearly with headings for Title, Date, Location, and Description.";
    const result = await callGeminiAPI(prompt);
    setSuggestion(result);
    setIsLoading(false);
  };

  return (
    <section className="space-y-6 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_22px_60px_-42px_rgba(12,80,58,0.35)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Upcoming actions</p>
          <h3 className="text-xl font-semibold text-brand-800">Ongoing community events</h3>
          <p className="mt-1 text-sm text-brand-700/75">Join a drive or spin up a new idea with AI assistance.</p>
        </div>
        <button
          type="button"
          onClick={suggestEvent}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? <LoadingSpinner className="h-4 w-4 text-brand-600" /> : <HiSparkles className="h-4 w-4" />}
          {isLoading ? 'Drafting…' : 'Generate a fresh event idea'}
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.title}
            className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-brand-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-brand-800">{event.title}</h4>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700/80">
                  {event.focus}
                </span>
              </div>
              <div className="space-y-2 text-sm text-brand-700">
                <p className="flex items-center gap-2">
                  <FaRegClock className="h-4 w-4 text-brand-600" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-brand-600"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {event.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaPeopleCarry className="h-4 w-4 text-brand-600" />
                  {event.volunteers} volunteers registered
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Register to help
              <FaArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>

      <SuggestionModal content={suggestion} onClose={() => setSuggestion('')} title="✨ Event Suggestion" />
    </section>
  );
};

const SuggestionModal = ({ content, onClose, title }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="glass-panel relative w-full max-w-lg rounded-[28px] p-6 shadow-[0_30px_80px_-35px_rgba(12,80,58,0.55)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-800">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-transparent p-2 text-brand-600 transition hover:border-brand-100 hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="mt-4 space-y-4 text-sm text-brand-700/90">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Sounds great
        </button>
      </div>
    </div>
  );
};

// --- Page ----------------------------------------------------------------
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <HeroBanner onDonate={() => navigate('/donate')} />
        <ShareMealCard />
      </div>

      <ImpactHighlights />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <RecentDonations />
        <CommunityPulse events={events} />
      </div>

      <OngoingEvents events={events} />
    </div>
  );
};
