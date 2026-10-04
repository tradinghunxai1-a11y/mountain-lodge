import React, { useState, useMemo } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  BedDouble,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';
import { SmartImage } from '../components/SmartImage';
import { BookingWidget } from '../components/BookingWidget';

type BookingStep = 'rooms' | 'guest-details' | 'review' | 'confirmation';

export const BookPage: React.FC = () => {
  const { bookingSearch, updateBookingSearch, rooms } = useHotel();

  const [step, setStep] = useState<BookingStep>(() =>
    bookingSearch.selectedRoomId ? 'guest-details' : 'rooms'
  );

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [referenceCode, setReferenceCode] = useState('');

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === bookingSearch.selectedRoomId) || rooms[0],
    [rooms, bookingSearch.selectedRoomId]
  );

  const nightsCount = useMemo(() => {
    if (!bookingSearch.checkIn || !bookingSearch.checkOut) return 1;
    const d1 = new Date(bookingSearch.checkIn);
    const d2 = new Date(bookingSearch.checkOut);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [bookingSearch.checkIn, bookingSearch.checkOut]);

  const handleSelectRoom = (roomId: string) => {
    updateBookingSearch({ selectedRoomId: roomId });
    setStep('guest-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateGuestDetails = () => {
    const errs: Record<string, string> = {};
    if (!guestName.trim() || guestName.trim().length < 2) {
      errs.guestName = 'Please enter the primary guest full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guestEmail.trim() || !emailRegex.test(guestEmail.trim())) {
      errs.guestEmail = 'Please enter a valid email address.';
    }
    if (!guestPhone.trim() || guestPhone.trim().length < 7) {
      errs.guestPhone = 'Please enter a valid phone or WhatsApp number.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGuestDetails()) return;
    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteBookingRequest = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(`MLS-${randomDigits}`);
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappBookingMessage = getWhatsAppUrl(
    `Assalam-o-Alaikum Mountain Lodge Skardu,\nI would like to confirm my reservation request:\n• Reference: ${referenceCode || 'Pending'}\n• Room: ${selectedRoom?.name}\n• Check-in: ${bookingSearch.checkIn} (${hotelData.checkInTime})\n• Check-out: ${bookingSearch.checkOut} (${hotelData.checkOutTime})\n• Duration: ${nightsCount} ${nightsCount === 1 ? 'Night' : 'Nights'}\n• Guests: ${bookingSearch.guests} Guests, ${bookingSearch.roomsCount} ${bookingSearch.roomsCount === 1 ? 'Room' : 'Rooms'}\n• Guest Name: ${guestName}\n• Phone: ${guestPhone}\n• Email: ${guestEmail}\n• Special Requests: ${specialRequests || 'None'}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Page Header & Search Bar */}
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 border border-[#DCE2D5] space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-1">
              {hotelData.name} · Satpara Rd, Skardu
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B2618] tracking-tight">
              Reservation & Availability System
            </h1>
          </div>
          <div className="text-xs text-[#4E5B49] tabular-nums">
            Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
          </div>
        </div>

        <BookingWidget
          variant="inline"
          onSearchSubmit={() => {
            setStep('rooms');
          }}
        />
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E6DC] flex flex-wrap items-center justify-between gap-3">
        {[
          { id: 'rooms', num: '01', label: 'Available Rooms' },
          { id: 'guest-details', num: '02', label: 'Guest Information' },
          { id: 'review', num: '03', label: 'Review Request' },
          { id: 'confirmation', num: '04', label: 'Confirmation Summary' },
        ].map((item, idx) => {
          const isCurrent = step === item.id;
          return (
            <div key={item.id} className="flex items-center gap-2.5 text-xs sm:text-sm">
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                  isCurrent
                    ? 'bg-[#3D6135] text-white'
                    : 'bg-[#ECEFE6] text-[#4E5B49]'
                }`}
              >
                {item.num}
              </span>
              <span
                className={`${
                  isCurrent ? 'font-semibold text-[#1B2618]' : 'text-[#5A6755]'
                }`}
              >
                {item.label}
              </span>
              {idx < 3 && <span className="hidden md:inline text-[#C5D0BC] ml-3">/</span>}
            </div>
          );
        })}
      </div>

      {/* STEP 1: AVAILABLE ROOMS & SELECTION */}
      {step === 'rooms' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618]">
                Select Your Preferred Room ({nightsCount}{' '}
                {nightsCount === 1 ? 'Night' : 'Nights'})
              </h2>
              <p className="text-xs sm:text-sm text-[#54614F]">
                Showing simulated availability for {bookingSearch.checkIn} to{' '}
                {bookingSearch.checkOut} · {bookingSearch.guests}{' '}
                {bookingSearch.guests === 1 ? 'Guest' : 'Guests'} · {bookingSearch.roomsCount}{' '}
                {bookingSearch.roomsCount === 1 ? 'Room' : 'Rooms'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {rooms.map((room) => {
              const isSelected = bookingSearch.selectedRoomId === room.id;
              return (
                <div
                  key={room.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition-colors grid grid-cols-1 lg:grid-cols-12 ${
                    isSelected ? 'border-[#3D6135] ring-2 ring-[#3D6135]/20' : 'border-[#E2E6DC]'
                  }`}
                >
                  <div className="lg:col-span-4 aspect-16/10 lg:aspect-auto bg-[#243321]">
                    <SmartImage
                      src={room.primaryImage}
                      alt={room.primaryImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[#3D6135]">
                          {room.viewType} · {room.bedConfiguration}
                        </span>
                        <span className="text-xs font-semibold text-[#1B2618] tabular-nums">
                          {room.pricePerNight || 'Seasonal Tariff Confirmed Upon Inquiry'}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618]">
                        {room.name}
                      </h3>
                      <p className="text-sm text-[#4A5745] leading-relaxed">{room.description}</p>

                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {room.verifiedHighlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-[#3B4738]">
                            <Check className="w-3.5 h-3.5 text-[#3D6135] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#ECEFE7] flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-[#5A6755]">
                        Available for Check-in {bookingSearch.checkIn} ({hotelData.checkInTime})
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectRoom(room.id)}
                        className="px-6 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>Select Room & Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: GUEST INFORMATION */}
      {step === 'guest-details' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={handleProceedToReview}
            noValidate
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E6DC] space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#ECEFE7]">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618]">
                  Guest Information
                </h2>
                <p className="text-xs sm:text-sm text-[#54614F]">
                  Enter your contact details so our reservations desk can confirm your stay.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('rooms')}
                className="text-xs font-medium text-[#3D6135] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Room</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="book-guest-name"
                  className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="book-guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (formErrors.guestName) setFormErrors({ ...formErrors, guestName: '' });
                  }}
                  placeholder="Enter full name of primary guest"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] ${
                    formErrors.guestName ? 'border-red-500' : 'border-[#D5DDD0]'
                  }`}
                />
                {formErrors.guestName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.guestName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="book-guest-email"
                    className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="book-guest-email"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => {
                      setGuestEmail(e.target.value);
                      if (formErrors.guestEmail) setFormErrors({ ...formErrors, guestEmail: '' });
                    }}
                    placeholder="guest@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] ${
                      formErrors.guestEmail ? 'border-red-500' : 'border-[#D5DDD0]'
                    }`}
                  />
                  {formErrors.guestEmail && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.guestEmail}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="book-guest-phone"
                    className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="book-guest-phone"
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => {
                      setGuestPhone(e.target.value);
                      if (formErrors.guestPhone) setFormErrors({ ...formErrors, guestPhone: '' });
                    }}
                    placeholder="+92 300 0000000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] tabular-nums ${
                      formErrors.guestPhone ? 'border-red-500' : 'border-[#D5DDD0]'
                    }`}
                  />
                  {formErrors.guestPhone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.guestPhone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="book-special-requests"
                  className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
                >
                  Special Requests (Optional)
                </label>
                <textarea
                  id="book-special-requests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Expected arrival time along Satpara Rd, ground-floor preference, or other notes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5DDD0] text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('rooms')}
                className="px-4 py-2.5 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-xs sm:text-sm font-medium text-[#1B2618] cursor-pointer"
              >
                Back to Rooms
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Review Booking Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Selected Room Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E2E6DC] space-y-4">
            <div className="text-xs font-semibold text-[#3D6135]">Selected Accommodation</div>
            <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#243321]">
              <SmartImage
                src={selectedRoom.primaryImage}
                alt={selectedRoom.primaryImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1B2618]">
              {selectedRoom.name}
            </h3>
            <div className="space-y-2 text-xs text-[#4A5745] pt-2 border-t border-[#ECEFE7] tabular-nums">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#3D6135]" />
                  <span>Check-in ({hotelData.checkInTime}):</span>
                </span>
                <span className="font-semibold text-[#1B2618]">{bookingSearch.checkIn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#3D6135]" />
                  <span>Check-out ({hotelData.checkOutTime}):</span>
                </span>
                <span className="font-semibold text-[#1B2618]">{bookingSearch.checkOut}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#3D6135]" />
                  <span>Guests & Rooms:</span>
                </span>
                <span className="font-semibold text-[#1B2618]">
                  {bookingSearch.guests} Guests · {bookingSearch.roomsCount}{' '}
                  {bookingSearch.roomsCount === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#ECEFE7]">
                <span>Rate Structure:</span>
                <span className="font-semibold text-[#3D6135]">
                  {selectedRoom.pricePerNight || 'Direct Hotel Tariff'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: BOOKING REVIEW */}
      {step === 'review' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E6DC] space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-1">
              Step 03 · Final Verification
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B2618]">
              Review Your Reservation Request
            </h2>
            <p className="text-xs sm:text-sm text-[#54614F] mt-1">
              Please verify your stay details below before generating your reservation request.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F6F7F2] rounded-2xl p-5 border border-[#E2E6DC] text-xs sm:text-sm">
            <div>
              <div className="text-xs text-[#657360]">Selected Room</div>
              <div className="font-semibold text-[#1B2618] mt-0.5">{selectedRoom.name}</div>
            </div>
            <div>
              <div className="text-xs text-[#657360]">Primary Guest</div>
              <div className="font-semibold text-[#1B2618] mt-0.5">{guestName}</div>
            </div>
            <div className="tabular-nums">
              <div className="text-xs text-[#657360]">Check-in / Check-out</div>
              <div className="font-semibold text-[#1B2618] mt-0.5">
                {bookingSearch.checkIn} ({hotelData.checkInTime}) → {bookingSearch.checkOut} (
                {hotelData.checkOutTime})
              </div>
            </div>
            <div className="tabular-nums">
              <div className="text-xs text-[#657360]">Party Size & Duration</div>
              <div className="font-semibold text-[#1B2618] mt-0.5">
                {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'} · {bookingSearch.guests}{' '}
                Guests · {bookingSearch.roomsCount}{' '}
                {bookingSearch.roomsCount === 1 ? 'Room' : 'Rooms'}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#657360]">Contact Details</div>
              <div className="font-semibold text-[#1B2618] mt-0.5 tabular-nums">
                {guestPhone} · {guestEmail}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#657360]">Tariff & Payment</div>
              <div className="font-semibold text-[#3D6135] mt-0.5">
                {selectedRoom.pricePerNight || 'Confirmed Directly by Reservations Desk'}
              </div>
            </div>
            {specialRequests && (
              <div className="sm:col-span-2 pt-2 border-t border-[#DCE2D5]">
                <div className="text-xs text-[#657360]">Special Requests</div>
                <div className="text-[#1B2618] mt-0.5">{specialRequests}</div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#ECEFE6] border border-[#DCE2D5] flex items-start gap-3 text-xs text-[#3B4738]">
            <ShieldAlert className="w-4 h-4 text-[#3D6135] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1B2618]">
                Transparent Reservation & Payment Notice:
              </span>{' '}
              This preview operates with simulated availability and no live payment gateway
              charge. Completing this step prepares your structured booking summary so you can
              finalize confirmation directly with {hotelData.name} via WhatsApp or telephone (
              {hotelData.phone}).
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setStep('guest-details')}
              className="px-4 py-2.5 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-xs sm:text-sm font-medium text-[#1B2618] cursor-pointer"
            >
              Edit Guest Info
            </button>
            <button
              type="button"
              onClick={handleCompleteBookingRequest}
              className="px-6 py-3.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Generate Booking Request Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMATION SCREEN */}
      {step === 'confirmation' && (
        <div
          className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE2D5] space-y-6"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F0E4] text-[#3D6135] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-semibold text-[#3D6135] tabular-nums">
                INQUIRY REFERENCE: {referenceCode}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B2618] mt-0.5">
                Reservation Request Prepared
              </h2>
              <p className="text-sm text-[#4A5745] mt-1 leading-relaxed">
                Thank you, <span className="font-semibold text-[#1B2618]">{guestName}</span>. Your
                booking summary for <span className="font-semibold">{selectedRoom.name}</span> has
                been generated. Because no automated reservation backend or payment processor is
                connected yet, no real reservation or credit card charge has been placed. Send this
                prepared summary directly to our reservations desk via WhatsApp or phone below to
                lock in your stay.
              </p>
            </div>
          </div>

          <div className="bg-[#F6F7F2] rounded-2xl p-5 border border-[#E2E6DC] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm tabular-nums">
            <div>
              <span className="text-[#657360]">Hotel:</span>{' '}
              <span className="font-semibold text-[#1B2618]">{hotelData.name}</span>
            </div>
            <div>
              <span className="text-[#657360]">Room:</span>{' '}
              <span className="font-semibold text-[#1B2618]">{selectedRoom.name}</span>
            </div>
            <div>
              <span className="text-[#657360]">Check-in:</span>{' '}
              <span className="font-semibold text-[#1B2618]">
                {bookingSearch.checkIn} ({hotelData.checkInTime})
              </span>
            </div>
            <div>
              <span className="text-[#657360]">Check-out:</span>{' '}
              <span className="font-semibold text-[#1B2618]">
                {bookingSearch.checkOut} ({hotelData.checkOutTime})
              </span>
            </div>
            <div>
              <span className="text-[#657360]">Guests / Rooms:</span>{' '}
              <span className="font-semibold text-[#1B2618]">
                {bookingSearch.guests} Guests · {bookingSearch.roomsCount}{' '}
                {bookingSearch.roomsCount === 1 ? 'Room' : 'Rooms'}
              </span>
            </div>
            <div>
              <span className="text-[#657360]">Hotel Phone:</span>{' '}
              <span className="font-semibold text-[#1B2618]">{hotelData.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={whatsappBookingMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Request via WhatsApp ({hotelData.phone})</span>
            </a>

            <a
              href={`tel:${hotelData.phoneClean}`}
              className="px-5 py-3.5 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-[#1B2618] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#3D6135]" />
              <span>Call Reservations Desk</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
