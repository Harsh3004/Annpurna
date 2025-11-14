import React, { useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Icon Components for reusability and cleaner JSX
const Icon = ({ children, className }) => <div className={className}>{children}</div>;

const PenSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
);
const StarIcon = ({ fill="currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={fill}><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151z"/></svg>
);
const FlameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="orange" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.615C12 2.615 6.36 10.321 6.36 14.5c0 3.081 2.484 5.565 5.565 5.565s5.565-2.484 5.565-5.565C17.49 10.321 12 2.615 12 2.615z"/></svg>
);
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const StarIconLarge = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const UsersIconSmall = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.12l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const HelpCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
const LogOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;


// Reusable Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => (
    <label className="flex items-center cursor-pointer">
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
            <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    </label>
);

// Header Component
const ProfileHeader = () => (
    <header className="rounded-t-[32px] border-b border-white/60 bg-brand-600/95 px-6 py-6 text-brand-800">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-800/75">Account</p>
                <h1 className="mt-1 text-2xl font-semibold">Profile</h1>
            </div>
            <div className="rounded-full border border-white/40 bg-white/10 p-2 text-brand-800 transition hover:bg-white/20">
                <PenSquareIcon />
            </div>
        </div>
    </header>
);

// User Information Component
const UserInfo = () => (
    <div className="bg-brand-600/95 text-brand-800 px-6 pb-8 pt-6">
        <div className="flex flex-wrap items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-brand-700">
                HJ
            </div>
            <div className='text-left space-y-3'>
                <div>
                    <h2 className="text-xl font-semibold">Harsh Joshi</h2>
                    <p className="text-sm text-brand-800/80">harshjoshi3004@gmail.com</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                        <StarIcon />
                        Level 1 Donor
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                        0 Day streak
                        <FlameIcon />
                    </span>
                </div>
            </div>
        </div>
    </div>
);

// Stats Component
const Stats = () => (
    <div className="px-6 pt-6">
        <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={<HeartIcon />} value="0" label="Donations" />
            <StatCard icon={<StarIconLarge />} value="Level 1" label="Impact Level" />
            <StatCard icon={<UsersIcon />} value="3 Groups" label="Community" />
        </div>
    </div>
);

const StatCard = ({ icon, value, label }) => (
    <div className="rounded-2xl flex flex-col items-center border border-white/70 bg-white/95 p-5 text-left shadow-sm">
        <div className="text-brand-600">{icon}</div>
        <p className="mt-3 text-2xl font-semibold text-brand-800">{value}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-brand-700/70">{label}</p>
    </div>
);

// Settings Sections
const QuickSettings = () => {
    const [settings, setSettings] = useState({
        notifications: false,
        location: true,
        visibility: false,
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SettingsCard title="Quick Settings">
            <SettingsToggleItem
                icon={<BellIcon />}
                label="Push Notifications"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
            />
            <SettingsToggleItem
                icon={<MapPinIcon />}
                label="Location Services"
                checked={settings.location}
                onChange={() => handleToggle('location')}
            />
            <SettingsToggleItem
                icon={<UsersIconSmall />}
                label="Community Visibility"
                checked={settings.visibility}
                onChange={() => handleToggle('visibility')}
            />
        </SettingsCard>
    );
};

const AccountSettings = () => (
    <SettingsCard title="Account Settings">
        <SettingsLinkItem icon={<UserCircleIcon />} label="Edit Profile" />
        <SettingsLinkItem icon={<MapPinIcon />} label="Location Settings" />
        <SettingsLinkItem icon={<BellIcon />} label="Notification Preferences" />
    </SettingsCard>
);

const AppSettings = () => (
     <SettingsCard title="App Settings">    
        <SettingsLinkItem icon={<ShieldIcon />} label="Privacy & Security" />
        <SettingsLinkItem icon={<IoMdSettings className='text-gray-600 w-6 h-6'/>} label="App Settings" />
        <SettingsLinkItem icon={<HelpCircleIcon />} label="Help & Support" />
    </SettingsCard>
);

const SettingsCard = ({ title, children }) => (
    <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-800">{title}</h3>
        <div className="mt-4 space-y-2">
            {children}
        </div>
    </div>
);

const SettingsToggleItem = ({ icon, label, checked, onChange }) => (
    <div className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm text-brand-700">
        <div className="flex items-center gap-3">
            <span className="text-brand-600">{icon}</span>
            <span className="font-medium text-brand-800">{label}</span>
        </div>
        <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
);

const SettingsLinkItem = ({ icon, label }) => (
    <a href="#" className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium text-brand-700 transition hover:bg-brand-50">
        <div className="flex items-center gap-3 text-brand-600">
            {icon}
            <span className="text-brand-800">{label}</span>
        </div>
        <ChevronRightIcon />
    </a>
);


// Recent Activity Section
const RecentActivity = () => (
    <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-800">Recent Activity</h3>
        <div className="mt-4 space-y-4">
            <ActivityItem 
                icon={<Icon className="bg-green-100 text-green-700 p-2 rounded-full"><HeartIcon /></Icon>}
                title="Donated Vegetable Biryani"
                subtitle="2 hours ago • 15 servings"
            />
            <ActivityItem 
                icon={<Icon className="bg-blue-100 text-blue-700 p-2 rounded-full"><UsersIconSmall /></Icon>}
                title="Joined Mumbai Food Warriors"
                subtitle="1 day ago"
            />
             <ActivityItem 
                icon={<Icon className="bg-yellow-100 text-yellow-700 p-2 rounded-full"><StarIconLarge /></Icon>}
                title="Achieved Level 7 Donor"
                subtitle="3 days ago"
            />
        </div>
    </div>
);

const ActivityItem = ({ icon, title, subtitle }) => (
    <div className="flex items-start gap-3">
        {icon}
        <div className='text-left'>
            <p className="text-sm font-semibold text-brand-800">{title}</p>
            <p className="text-xs text-brand-700/70">{subtitle}</p>
        </div>
    </div>
);


// Logout and Footer
const LogoutButton = () => (
    <div className="px-6">
        <Link to='/login' 
        onClick={() => {
            toast.success("Logout Successfully");
        }}
        className="flex items-center justify-center gap-3 rounded-[28px] border border-red-100 bg-white/95 p-4 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50">
            <LogOutIcon />
            <span>Log Out</span>
        </Link>
    </div>
);

const ProfileFooter = () => (
    <footer className="px-6 pb-8 text-center text-xs text-brand-700/60">
        <p>Annapurna v1.0.0 • Built for volunteers and food champions</p>
    </footer>
);

const NavItem = ({ icon, label, active = false }) => (
    <a href="#" className={`flex flex-col items-center justify-center ${active ? 'text-green-700 font-semibold' : 'text-gray-500 hover:text-green-700'}`}>
        {icon}
        <span className="text-xs">{label}</span>
    </a>
);


export const Profile = () => {
  return (
    <div className="space-y-12 pb-12">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/70 bg-white/85 shadow-[0_32px_90px_-55px_rgba(12,80,58,0.5)] backdrop-blur">
            <ProfileHeader />
            <main className="space-y-6 px-0 pb-8">
                <UserInfo />
                <Stats />
                <div className="grid gap-6 px-6 lg:grid-cols-2">
                    <QuickSettings />
                    <AccountSettings />
                </div>
                <div className="px-6">
                    <AppSettings />
                </div>
                <div className="px-6">
                    <RecentActivity />
                </div>
                <LogoutButton />
                <ProfileFooter />
            </main>
        </div>
    </div>
  );
}

