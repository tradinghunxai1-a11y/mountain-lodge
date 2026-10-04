import React, { useEffect } from 'react';
import { X, Phone, MapPin, CalendarCheck, ArrowRight } from 'lucide-react';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Experience', path: '/experience' },
  { label: 'Dining', path: '/dining' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Offers', path: '/offers' },
  { label: 'Contact', path: '/contact' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-sm bg-[#F6F7F2] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-l border-[#DCE2D5]">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#DCE2D5]">
            <button
              type="button"
              onClick={() => handleLinkClick('/')}
              className="font-display text-2xl font-semibold text-[#1B2618] tracking-tight text-left"
            >
              {hotelData.name}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 rounded-lg flex items-center justify-center text-[#1B2618] hover:bg-[#E7ECE0] transition-colors focus-visible:outline-2 focus-visible:outline-[#3D6135]"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath === item.path || currentPath.startsWith(`${item.path}/`);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleLinkClick(item.path)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E4E9DC] text-[#1B2618] font-semibold'
                      : 'text-[#3B4738] hover:bg-[#ECEFE6] hover:text-[#1B2618]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3D6135]" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 mt-6 border-t border-[#DCE2D5] space-y-4">
          <div className="space-y-2 text-xs text-[#4E5B49]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#3D6135] shrink-0 mt-0.5" />
              <span>{hotelData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#3D6135] shrink-0" />
              <a
                href={`tel:${hotelData.phoneClean}`}
                className="hover:text-[#1B2618] underline underline-offset-2 tabular-nums"
              >
                {hotelData.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#3D6135] shrink-0" />
              <span className="tabular-nums">
                Check-in {hotelData.checkInTime} · Check-out {hotelData.checkOutTime}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => handleLinkClick('/book')}
              className="w-full py-3 px-5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-xs whitespace-nowrap"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-[#C6D1BC] text-[#1B2618] hover:bg-[#E7ECE0] font-medium text-xs flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
