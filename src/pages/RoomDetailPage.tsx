import React from 'react';
import {
  ArrowLeft,
  Check,
  Clock,
  Phone,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';
import { SmartImage } from '../components/SmartImage';

interface RoomDetailPageProps {
  roomId: string;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ roomId }) => {
  const { rooms, navigate, updateBookingSearch, openLightbox, setIsEditorOpen } = useHotel();
  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-4xl font-semibold text-[#1B2618]">Room Not Found</h1>
        <p className="text-sm text-[#4E5B49]">
          The requested room could not be located. Please view all available rooms at{' '}
          {hotelData.name}.
        </p>
        <button
          type="button"
          onClick={() => navigate('/rooms')}
          className="px-5 py-2.5 rounded-xl bg-[#3D6135] text-white text-sm font-medium cursor-pointer"
        >
          Back to All Rooms
        </button>
      </div>
    );
  }

  const handleBookThisRoom = () => {
    updateBookingSearch({ selectedRoomId: room.id });
    navigate('/book');
  };

  const lightboxItems = room.galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: room.name,
    description: img.caption,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb Back Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/rooms')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#3B4738] hover:text-[#1B2618] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#3D6135]" />
          <span>Back to All Rooms</span>
        </button>

        <button
          type="button"
          onClick={() => setIsEditorOpen(true)}
          className="px-3.5 py-2 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-xs font-medium text-[#1B2618] inline-flex items-center gap-1.5 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#3D6135]" />
          <span>Edit Official Rate / Specs</span>
        </button>
      </div>

      {/* Hero Photo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div
          onClick={() => openLightbox(0, lightboxItems)}
          className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#DCE2D5] aspect-16/10 cursor-pointer group bg-[#243321]"
        >
          <SmartImage
            src={room.primaryImage}
            alt={room.primaryImageAlt}
            priority
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(0, lightboxItems);
            }}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-black/70 hover:bg-black/85 text-white text-xs font-medium inline-flex items-center gap-2 backdrop-blur-xs cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Open Full-Screen Lightbox</span>
          </button>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-5">
          {room.galleryImages.slice(1).map((img, idx) => (
            <div
              key={img.src}
              onClick={() => openLightbox(idx + 1, lightboxItems)}
              className="relative flex-1 rounded-2xl overflow-hidden border border-[#DCE2D5] aspect-16/10 cursor-pointer group"
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 text-white">
                <p className="text-xs leading-snug">{img.caption}</p>
              </div>
            </div>
          ))}

          <div className="bg-[#ECEFE6] rounded-2xl p-5 border border-[#DCE2D5] flex flex-col justify-between">
            <div className="text-xs font-semibold text-[#3D6135] mb-1">
              Verified Arrival Schedule
            </div>
            <div className="text-sm font-semibold text-[#1B2618] tabular-nums flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3D6135]" />
              <span>
                Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
              </span>
            </div>
            <p className="text-xs text-[#54614F] mt-2">
              Located at {hotelData.address}. Call {hotelData.phone} for early arrival requests.
            </p>
          </div>
        </div>
      </div>

      {/* Room Details & Reservation Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6755] mb-2">
              <span>{hotelData.name}</span>
              <span aria-hidden="true">·</span>
              <span>{room.viewType}</span>
              <span aria-hidden="true">·</span>
              <span>{room.bedConfiguration}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#1B2618] tracking-tight">
              {room.name}
            </h1>
            <p className="text-base sm:text-lg text-[#3D6135] font-medium mt-1">{room.subtitle}</p>
            <p className="text-sm sm:text-base text-[#465341] leading-relaxed mt-4">
              {room.description}
            </p>
          </div>

          {/* Verified Visual Features from Uploaded Photographs */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E6DC] space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[#1B2618]">
              Documented Room Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {room.verifiedHighlights.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-sm text-[#3B4738]">
                  <Check className="w-4 h-4 text-[#3D6135] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Room Specifications (Editable without fabrication) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E6DC] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-[#1B2618]">
                Room Specifications
              </h2>
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="text-xs font-medium text-[#3D6135] hover:underline cursor-pointer"
              >
                Update Official Figures →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#F6F7F2] border border-[#E2E6DC]">
                <div className="text-xs text-[#657360]">Bed Configuration</div>
                <div className="font-semibold text-[#1B2618] mt-0.5">{room.bedConfiguration}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6F7F2] border border-[#E2E6DC]">
                <div className="text-xs text-[#657360]">Window Outlook</div>
                <div className="font-semibold text-[#1B2618] mt-0.5">{room.viewType}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6F7F2] border border-[#E2E6DC]">
                <div className="text-xs text-[#657360]">Nightly Rate</div>
                <div className="font-semibold text-[#1B2618] mt-0.5 tabular-nums">
                  {room.pricePerNight || 'Contact Lodge for Seasonal Rate'}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6F7F2] border border-[#E2E6DC]">
                <div className="text-xs text-[#657360]">Occupancy & Room Size</div>
                <div className="font-semibold text-[#1B2618] mt-0.5 tabular-nums">
                  {[room.occupancy, room.roomSize].filter(Boolean).join(' · ') ||
                    'Configurable by Management'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Reservation Box */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2D5] shadow-sm space-y-6 sticky top-28">
          <div className="pb-4 border-b border-[#ECEFE7]">
            <div className="text-xs font-medium text-[#657360]">Direct Reservation</div>
            <div className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618] mt-1 tabular-nums">
              {room.pricePerNight ? room.pricePerNight : 'Seasonal Tariff on Inquiry'}
            </div>
            <div className="text-xs text-[#54614F] mt-1 tabular-nums">
              Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleBookThisRoom}
              className="w-full py-3.5 px-5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <span>Book This Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppUrl(
                `Assalam-o-Alaikum Mountain Lodge Skardu, I would like to inquire about availability and rates for the ${room.name}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-[#1B2618] font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#3D6135]" />
              <span>Inquire via WhatsApp</span>
            </a>

            <a
              href={`tel:${hotelData.phoneClean}`}
              className="w-full py-3 px-5 rounded-xl bg-[#F6F7F2] hover:bg-[#E7ECE0] text-[#1B2618] font-medium text-xs flex items-center justify-center gap-2 transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Call {hotelData.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
