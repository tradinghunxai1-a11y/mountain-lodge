import React, { useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { hotelData } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';
import { MobileMenu } from './MobileMenu';

const DESKTOP_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Experience', path: '/experience' },
  { label: 'Dining', path: '/dining' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const { currentPath, navigate } = useHotel();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F6F7F2]/95 backdrop-blur-md border-b border-[#E2E6DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element Brand wordmark (Strict Top Bar Contract) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1B2618] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3D6135] rounded-xs"
          >
            {hotelData.name}
          </a>

          {/* Zone 2: Clean navigation links with active/hover underline */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#465341]"
            aria-label="Primary navigation"
          >
            {DESKTOP_NAV.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath === item.path || currentPath.startsWith(`${item.path}/`);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'border-[#3D6135] text-[#1B2618] font-semibold'
                      : 'border-transparent hover:text-[#1B2618] hover:border-[#A3B899]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${hotelData.phoneClean}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#2F3E2B] hover:bg-[#E7ECE0] transition-colors whitespace-nowrap tabular-nums"
              aria-label={`Call ${hotelData.name} at ${hotelData.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>{hotelData.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => navigate('/book')}
              className="px-5 py-2.5 rounded-lg bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D6135]"
            >
              Book Now
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-11 h-11 rounded-lg flex items-center justify-center text-[#1B2618] hover:bg-[#E7ECE0] transition-colors focus-visible:outline-2 focus-visible:outline-[#3D6135]"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={currentPath}
        onNavigate={navigate}
      />
    </>
  );
};
