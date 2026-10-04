import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight, Phone } from 'lucide-react';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';

const QUICK_TOPICS = [
  {
    label: 'Room Availability & Rates',
    message:
      'Assalam-o-Alaikum Mountain Lodge Skardu, I would like to check room availability and seasonal rates for my upcoming visit to Skardu.',
  },
  {
    label: 'Suite & Mountain View Inquiry',
    message:
      'Assalam-o-Alaikum Mountain Lodge Skardu, I have a question regarding the Panoramic Valley View Suite and Cliffside Mountain View Rooms.',
  },
  {
    label: 'Directions & Check-in (2:00 PM)',
    message:
      'Assalam-o-Alaikum Mountain Lodge Skardu, could you share arrival guidance for Satpara Rd, Devision, Skardu?',
  },
];

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-[#DCE2D5] overflow-hidden"
          role="dialog"
          aria-label="WhatsApp Concierge Desk"
        >
          <div className="bg-[#23381E] text-white p-4 flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-semibold leading-tight">
                {hotelData.name}
              </div>
              <div className="text-xs text-[#C4D6B8] tabular-nums mt-0.5">
                WhatsApp Direct: {hotelData.phone}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-[#4A5745] leading-relaxed">
              Select a topic below to open a direct WhatsApp conversation with the reservations team
              at <span className="font-semibold text-[#1B2618] tabular-nums">{hotelData.phone}</span>
              :
            </p>

            <div className="space-y-2">
              {QUICK_TOPICS.map((topic) => (
                <a
                  key={topic.label}
                  href={getWhatsAppUrl(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F7F2] hover:bg-[#E7ECE0] border border-[#DCE2D5] text-xs font-medium text-[#1B2618] flex items-center justify-between transition-colors"
                >
                  <span>{topic.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#3D6135] shrink-0" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[#ECEFE7] flex items-center justify-between">
              <a
                href={`tel:${hotelData.phoneClean}`}
                className="text-xs font-medium text-[#3D6135] hover:underline inline-flex items-center gap-1.5 tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {hotelData.phone}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-[#0D2112] font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Open WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-12 px-4 rounded-full bg-[#23381E] hover:bg-[#1B2C17] text-white shadow-lg border border-white/15 flex items-center gap-2.5 text-xs sm:text-sm font-medium transition-transform duration-150 hover:scale-102 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D6135]"
        aria-label="Contact Mountain Lodge Skardu on WhatsApp"
        aria-expanded={isOpen}
      >
        <span className="w-6 h-6 rounded-full bg-[#25D366] text-[#0D2112] flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
        </span>
        <span className="whitespace-nowrap">WhatsApp Us</span>
      </button>
    </div>
  );
};
