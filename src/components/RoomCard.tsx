import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { RoomItem } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';
import { SmartImage } from './SmartImage';

interface RoomCardProps {
  room: RoomItem;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { navigate, updateBookingSearch, openLightbox } = useHotel();

  const handleBookRoom = () => {
    updateBookingSearch({ selectedRoomId: room.id });
    navigate('/book');
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#E2E6DC] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
      <div>
        {/* 4:3 Room Photograph with Lightbox Preview Button */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-[#E8ECE2] group">
          <SmartImage
            src={room.primaryImage}
            alt={room.primaryImageAlt}
            fallbackLabel={room.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          />
          <button
            type="button"
            onClick={() =>
              openLightbox(
                0,
                room.galleryImages.map((g) => ({
                  src: g.src,
                  alt: g.alt,
                  title: room.name,
                  description: g.caption,
                }))
              )
            }
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/65 hover:bg-black/80 text-white text-xs font-medium inline-flex items-center gap-1.5 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label={`Inspect photos of ${room.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Photo</span>
          </button>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          {/* Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5A6755] mb-2">
            <span>{room.viewType}</span>
            <span aria-hidden="true">·</span>
            <span>{room.bedConfiguration}</span>
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#1B2618] tracking-tight mb-2">
            <a
              href={`/rooms/${room.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/rooms/${room.id}`);
              }}
              className="hover:text-[#3D6135] transition-colors"
            >
              {room.name}
            </a>
          </h3>

          <p className="text-sm text-[#4A5745] leading-relaxed line-clamp-3 mb-4">
            {room.description}
          </p>

          {/* Verified Visual Details & Editable Rate/Capacity Structure */}
          <div className="pt-3 border-t border-[#ECEFE7] space-y-1.5 text-xs text-[#4E5B49]">
            <div className="flex items-center justify-between">
              <span className="text-[#687563]">Tariff / Night:</span>
              <span className="font-medium text-[#1B2618] tabular-nums">
                {room.pricePerNight ? room.pricePerNight : 'Inquire for Seasonal Rate'}
              </span>
            </div>
            {(room.occupancy || room.roomSize) && (
              <div className="flex items-center justify-between">
                <span className="text-[#687563]">Specifications:</span>
                <span className="font-medium text-[#1B2618] tabular-nums">
                  {[room.occupancy, room.roomSize].filter(Boolean).join(' · ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => navigate(`/rooms/${room.id}`)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>View Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleBookRoom}
          className="py-2.5 px-4 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-[#1B2618] text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </article>
  );
};
