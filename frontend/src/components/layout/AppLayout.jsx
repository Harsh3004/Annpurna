import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from '../../pages/common/BottomNav';
import { useMemo } from 'react';
import { FaLeaf, FaUserCircle } from 'react-icons/fa';
import { PiBowlFoodFill } from 'react-icons/pi';

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Donate', to: '/donate' },
  { label: 'Community', to: '/community' },
  { label: 'Impact', to: '/impact' },
  { label: 'Profile', to: '/profile' },
];

const LogoMark = () => (
  <div className="flex items-center gap-2 text-brand-800">
    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-sm">
      <FaLeaf className="h-5 w-5" />
    </span>
    <div className="leading-tight">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600/85">Annapurna</p>
      <p className="text-lg font-semibold text-brand-800">Food Rescue Hub</p>
    </div>
  </div>
);

const PrimaryButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lift transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-white"
  >
    {children}
  </button>
);

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = useMemo(() => {
    const current = location.pathname === '/' ? '/home' : location.pathname;
    const match = navItems.find((item) => current.startsWith(item.to));
    return match ? match.to : '/home';
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <div className="radial-accent" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="-ml-2 rounded-3xl border border-transparent px-2 py-1 transition hover:border-brand-100 hover:bg-white"
            >
              <LogoMark />
            </button>

            <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/90 p-1 text-sm font-medium text-brand-700 shadow-sm lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-4 py-2 transition ${
                      isActive || activePath === item.to
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-brand-700 hover:bg-brand-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <SecondaryButton onClick={() => navigate('/community')}>
                <FaUserCircle className="h-4 w-4 text-brand-600" />
                My Circle
              </SecondaryButton>
              <PrimaryButton onClick={() => navigate('/donate')}>
                <PiBowlFoodFill className="h-4 w-4" />
                Offer a Meal
              </PrimaryButton>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-24 pt-10">
          <Outlet />
        </main>

        <footer className="relative border-t border-white/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-brand-700 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-semibold text-brand-800">Together we turn surplus into smiles.</p>
              <p className="text-brand-700/70">Join volunteers, restaurants, and communities fighting hunger in real time.</p>
            </div>
            <div className="flex flex-col gap-2 text-brand-700/70 lg:text-right">
              <p>Need help? <button type="button" onClick={() => navigate('/community')} className="font-semibold text-brand-700 underline-offset-4 hover:underline">Visit our community</button></p>
              <p>© {new Date().getFullYear()} Annapurna Collective</p>
            </div>
          </div>
        </footer>
      </div>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;
