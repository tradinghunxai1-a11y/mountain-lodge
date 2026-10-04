import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, CalendarCheck } from 'lucide-react';
import { hotelData, getWhatsAppUrl, getDirectionsUrl } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';
import { ContactForm } from '../components/ContactForm';
import { LocationSection } from '../components/LocationSection';

export const ContactPage: React.FC = () => {
  const { navigate } = useHotel();

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Hotel Contact Details & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-8 border border-[#DCE2D5] space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-1">
                  Direct Reservations & Inquiries
                </p>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2618] tracking-tight">
                  Contact {hotelData.name}
                </h1>
                <p className="text-sm text-[#4A5745] mt-2 leading-relaxed">
                  Reach our hospitality team directly by telephone, WhatsApp, or the inquiry form
                  for room availability and arrival assistance in Skardu.
                </p>
              </div>

              <div className="space-y-4 bg-white rounded-2xl p-5 border border-[#DFE5D8] text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3D6135] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-[#657360]">Address</div>
                    <div className="font-semibold text-[#1B2618]">{hotelData.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#ECEFE7]">
                  <Phone className="w-4 h-4 text-[#3D6135] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-[#657360]">Phone & WhatsApp</div>
                    <a
                      href={`tel:${hotelData.phoneClean}`}
                      className="font-semibold text-[#1B2618] hover:text-[#3D6135] underline underline-offset-2 tabular-nums"
                    >
                      {hotelData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#ECEFE7]">
                  <Clock className="w-4 h-4 text-[#3D6135] shrink-0 mt-1" />
                  <div className="tabular-nums">
                    <div className="text-xs text-[#657360]">Check-in & Check-out Schedule</div>
                    <div className="font-semibold text-[#1B2618]">
                      Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Required by Brief: Call, WhatsApp, Get Directions, Book Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${hotelData.phoneClean}`}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#3D6135]" />
                  <span>Call Hotel</span>
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-[#0D2112] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#3D6135]" />
                  <span>Get Directions</span>
                </a>

                <button
                  type="button"
                  onClick={() => navigate('/book')}
                  className="py-3 px-4 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      <LocationSection />
    </div>
  );
};
