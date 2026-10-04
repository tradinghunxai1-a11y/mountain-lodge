import React, { useState } from 'react';
import { SlidersHorizontal, Phone, MessageCircle } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';
import { RoomGrid } from '../components/RoomGrid';
import { BookingWidget } from '../components/BookingWidget';

export const RoomsPage: React.FC = () => {
  const { rooms, setIsEditorOpen } = useHotel();
  const [filter, setFilter] = useState<'all' | 'panoramic' | 'heritage'>('all');

  const filteredRooms = rooms.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'panoramic') {
      return r.id === 'panoramic-valley-suite' || r.id === 'cliffside-mountain-deluxe';
    }
    return r.id === 'heritage-wood-chamber' || r.id === 'deluxe-family-chamber';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Page Header */}
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#3D6135]">
              <span>{hotelData.name}</span>
              <span aria-hidden="true">·</span>
              <span>Check-in {hotelData.checkInTime}</span>
              <span aria-hidden="true">·</span>
              <span>Check-out {hotelData.checkOutTime}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1B2618] tracking-tight">
              Rooms & Panoramic Suites
            </h1>
            <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
              Explore our accommodations photographed directly at Mountain Lodge Skardu. In keeping
              with our commitment to accuracy, room tariffs, square footage, and occupancy limits
              are provided via direct inquiry or can be configured in the hotel data structure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Edit Room Rates & Specs</span>
            </button>
            <a
              href={getWhatsAppUrl('Assalam-o-Alaikum, I would like to inquire about room rates at Mountain Lodge Skardu.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire Rates on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Inline Booking Search Bar */}
        <BookingWidget variant="inline" />
      </div>

      {/* Interactive Filter Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 bg-[#E6EAE0] rounded-xl self-start">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white text-[#1B2618] shadow-xs'
                : 'text-[#4E5B49] hover:text-[#1B2618]'
            }`}
          >
            All Accommodations ({rooms.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('panoramic')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'panoramic'
                ? 'bg-white text-[#1B2618] shadow-xs'
                : 'text-[#4E5B49] hover:text-[#1B2618]'
            }`}
          >
            Panoramic & Cliff Views (2)
          </button>
          <button
            type="button"
            onClick={() => setFilter('heritage')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'heritage'
                ? 'bg-white text-[#1B2618] shadow-xs'
                : 'text-[#4E5B49] hover:text-[#1B2618]'
            }`}
          >
            Wood-Paneled & Family Comfort (2)
          </button>
        </div>

        <div className="text-xs text-[#5A6755] flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#3D6135]" />
          <span>Direct Reservations Desk:</span>
          <a
            href={`tel:${hotelData.phoneClean}`}
            className="font-semibold text-[#1B2618] hover:underline tabular-nums"
          >
            {hotelData.phone}
          </a>
        </div>
      </div>

      {/* Room Cards Grid */}
      <RoomGrid rooms={filteredRooms} columns={2} />
    </div>
  );
};
