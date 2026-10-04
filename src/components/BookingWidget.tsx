import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight, AlertCircle } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData } from '../data/hotelData';

interface BookingWidgetProps {
  variant?: 'hero-overlap' | 'inline';
  onSearchSubmit?: () => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  variant = 'hero-overlap',
  onSearchSubmit,
}) => {
  const { bookingSearch, updateBookingSearch, navigate } = useHotel();
  const [dateError, setDateError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingSearch.checkIn || !bookingSearch.checkOut) {
      setDateError('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(bookingSearch.checkOut) <= new Date(bookingSearch.checkIn)) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }
    setDateError(null);
    if (onSearchSubmit) {
      onSearchSubmit();
    } else {
      navigate('/book');
    }
  };

  return (
    <div
      className={
        variant === 'hero-overlap'
          ? 'relative z-20 -mt-12 sm:-mt-16 max-w-6xl mx-auto px-4 sm:px-6'
          : 'w-full'
      }
    >
      <div className="bg-[#EEF1E8] p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg border border-[#DCE2D5]">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center border border-[#E6EAE0]"
          aria-label="Check room availability"
        >
          {/* Check-in Date */}
          <div className="lg:col-span-3 flex flex-col px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-[#E8ECE3]">
            <label
              htmlFor="booking-checkin"
              className="text-xs font-medium text-[#5A6755] flex items-center gap-1.5 mb-1"
            >
              <Calendar className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Check-in ({hotelData.checkInTime})</span>
            </label>
            <input
              id="booking-checkin"
              type="date"
              value={bookingSearch.checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDateError(null);
                updateBookingSearch({ checkIn: e.target.value });
              }}
              className="text-sm font-semibold text-[#1B2618] bg-transparent focus:outline-none tabular-nums cursor-pointer"
              required
            />
          </div>

          {/* Check-out Date */}
          <div className="lg:col-span-3 flex flex-col px-3 py-1.5 border-b sm:border-b-0 lg:border-r border-[#E8ECE3]">
            <label
              htmlFor="booking-checkout"
              className="text-xs font-medium text-[#5A6755] flex items-center gap-1.5 mb-1"
            >
              <Calendar className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Check-out ({hotelData.checkOutTime})</span>
            </label>
            <input
              id="booking-checkout"
              type="date"
              value={bookingSearch.checkOut}
              min={bookingSearch.checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDateError(null);
                updateBookingSearch({ checkOut: e.target.value });
              }}
              className="text-sm font-semibold text-[#1B2618] bg-transparent focus:outline-none tabular-nums cursor-pointer"
              required
            />
          </div>

          {/* Guests Selector */}
          <div className="lg:col-span-2 flex flex-col px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-[#E8ECE3]">
            <label
              htmlFor="booking-guests"
              className="text-xs font-medium text-[#5A6755] flex items-center gap-1.5 mb-1"
            >
              <Users className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Guests</span>
            </label>
            <select
              id="booking-guests"
              value={bookingSearch.guests}
              onChange={(e) => updateBookingSearch({ guests: Number(e.target.value) })}
              className="text-sm font-semibold text-[#1B2618] bg-transparent focus:outline-none tabular-nums cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Rooms Selector */}
          <div className="lg:col-span-2 flex flex-col px-3 py-1.5">
            <label
              htmlFor="booking-rooms"
              className="text-xs font-medium text-[#5A6755] flex items-center gap-1.5 mb-1"
            >
              <BedDouble className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Rooms</span>
            </label>
            <select
              id="booking-rooms"
              value={bookingSearch.roomsCount}
              onChange={(e) => updateBookingSearch({ roomsCount: Number(e.target.value) })}
              className="text-sm font-semibold text-[#1B2618] bg-transparent focus:outline-none tabular-nums cursor-pointer"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Room' : 'Rooms'}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Search CTA */}
          <div className="lg:col-span-2 sm:col-span-2 flex items-center justify-end">
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D6135]"
            >
              <span>Search Availability</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </form>

        {dateError && (
          <div
            role="alert"
            className="mt-2.5 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{dateError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
