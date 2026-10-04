import React, { useState } from 'react';
import { ArrowRight, Sun, Moon, MapPin } from 'lucide-react';
import { hotelData, IMAGES } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';
import { SmartImage } from './SmartImage';

export const Hero: React.FC = () => {
  const { navigate } = useHotel();
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'dusk'>('day');

  const activeImage = timeOfDay === 'day' ? IMAGES.exteriorDay : IMAGES.exteriorDusk;
  const activeAlt =
    timeOfDay === 'day'
      ? 'Mountain Lodge Skardu daytime exterior showing arched-roof chalets, stone terrace, marigold flower walk, white-domed gazebos, and Karakoram mountains'
      : 'Mountain Lodge Skardu at blue hour dusk showing illuminated chalets and glowing white-domed garden gazebos beneath the rocky mountain slope';

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] flex items-center shadow-md border border-[#DCE2D5]">
        {/* Hero Background Photograph */}
        <div className="absolute inset-0">
          <SmartImage
            src={activeImage}
            alt={activeAlt}
            priority
            className="w-full h-full object-cover object-center"
          />
          {/* Measured Contrast Scrim for 4.5:1+ legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#11190F]/90 via-[#11190F]/65 to-[#11190F]/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#11190F]/80 via-transparent to-[#11190F]/30"
            aria-hidden="true"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-16 sm:py-20 pb-24 sm:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-5">
            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-[#DDE6D5] tracking-wide">
              <span>{hotelData.name}</span>
              <span aria-hidden="true">·</span>
              <span>{hotelData.starClassification}-Star Mountain Hotel</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F5C451] font-semibold tabular-nums">
                {hotelData.googleRating} ★ · {hotelData.googleRatingsCount} Google ratings
              </span>
            </div>

            {/* Expressive Display Headline matching Reference Visual Hierarchy */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-semibold text-white leading-[1.06] tracking-tight max-w-2xl">
              Experience{' '}
              <span className="text-[#9EC481] italic font-normal">Skardu in Comfort</span>
            </h1>

            {/* Concise Verified Hotel Description */}
            <p className="text-base sm:text-lg text-[#E6ECE1] max-w-xl leading-relaxed font-normal">
              {hotelData.shortDescription}
            </p>

            {/* Location Reference */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#CED8C7] pt-1">
              <MapPin className="w-4 h-4 text-[#9EC481] shrink-0" />
              <span>{hotelData.address}</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => navigate('/book')}
                className="px-6 py-3.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white font-medium text-sm sm:text-base inline-flex items-center gap-2.5 transition-colors shadow-sm cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/rooms')}
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/35 backdrop-blur-xs font-medium text-sm sm:text-base inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Explore Rooms</span>
              </button>
            </div>
          </div>

          {/* Interactive Exterior Lighting Switcher (Daylight vs Blue Hour Photograph) */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-black/45 backdrop-blur-md border border-white/20">
              <button
                type="button"
                onClick={() => setTimeOfDay('day')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  timeOfDay === 'day'
                    ? 'bg-white text-[#1B2618] shadow-xs'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Daylight View</span>
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay('dusk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  timeOfDay === 'dusk'
                    ? 'bg-white text-[#1B2618] shadow-xs'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Twilight View</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
