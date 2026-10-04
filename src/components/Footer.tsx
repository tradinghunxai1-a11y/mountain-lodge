import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { hotelData, getWhatsAppUrl, getDirectionsUrl } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';

export const Footer: React.FC = () => {
  const { navigate, setIsEditorOpen } = useHotel();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Skardu Experience', path: '/experience' },
    { label: 'Dining', path: '/dining' },
    { label: 'Photo Gallery', path: '/gallery' },
    { label: 'About the Lodge', path: '/about' },
    { label: 'Seasonal Offers', path: '/offers' },
    { label: 'Contact & Location', path: '/contact' },
    { label: 'Book Your Stay', path: '/book' },
  ];

  return (
    <footer className="bg-[#182216] text-[#DCE4D6] border-t border-[#2A3827] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2B3928]">
          {/* Brand & Verified Summary */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="font-display text-3xl font-semibold text-white tracking-tight inline-block"
            >
              {hotelData.name}
            </a>
            <p className="text-xs font-medium text-[#9EC481] tracking-wide">
              {hotelData.starClassification}-Star Hotel · {hotelData.googleRating} ★ ·{' '}
              {hotelData.googleRatingsCount} Google ratings
            </p>
            <p className="text-sm text-[#B8C4B1] max-w-md leading-relaxed">
              {hotelData.shortDescription}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/book')}
                className="px-5 py-2.5 rounded-xl bg-[#3D6135] hover:bg-[#4B7541] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Reserve a Stay
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-[#3E513A] hover:bg-[#243221] text-white text-xs font-medium transition-colors"
              >
                WhatsApp Concierge
              </a>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xl font-semibold text-white">Explore</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B8C4B1]">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact & Timings */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-xl font-semibold text-white">
              Address & Arrival Details
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#B8C4B1]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9EC481] shrink-0 mt-0.5" />
                <span>{hotelData.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9EC481] shrink-0" />
                <a
                  href={`tel:${hotelData.phoneClean}`}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {hotelData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#9EC481] shrink-0" />
                <span className="tabular-nums">
                  Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#9EC481] hover:underline inline-flex items-center gap-1"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[#495A45]">·</span>
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="text-xs font-medium text-[#B8C4B1] hover:text-white inline-flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Manage Editable Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA088]">
          <div>
            © {new Date().getFullYear()} {hotelData.name}. All rights reserved.{' '}
            <span className="text-[#6E8068]">Listed reference: {hotelData.listedWebsite}</span>
          </div>
          <div className="tabular-nums">
            Satpara Rd, Devision, Skardu, 16100, Pakistan · {hotelData.phone}
          </div>
        </div>
      </div>
    </footer>
  );
};
