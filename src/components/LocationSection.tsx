import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Globe, ExternalLink } from 'lucide-react';
import { hotelData, getDirectionsUrl, IMAGES } from '../data/hotelData';
import { SmartImage } from './SmartImage';

export const LocationSection: React.FC = () => {
  const [customEmbedUrl, setCustomEmbedUrl] = useState<string>('');
  const [showEmbedInput, setShowEmbedInput] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Address & Directions Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-2">
              Location & Arrival · Skardu, Pakistan
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2618] tracking-tight">
              Along Scenic Satpara Road
            </h2>
            <p className="text-sm sm:text-base text-[#4A5745] mt-3 leading-relaxed">
              Mountain Lodge Skardu is situated on Satpara Rd, Devision, Skardu, 16100, Pakistan—set
              against the dramatic rock faces of the Karakoram mountain range.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DFE5D8] space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#3D6135] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-medium text-[#657360]">Verified Property Address</div>
                <div className="text-sm sm:text-base font-semibold text-[#1B2618] mt-0.5">
                  {hotelData.address}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#ECEFE7]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#3D6135] shrink-0 mt-0.5" />
                <div className="text-xs text-[#4A5745] tabular-nums">
                  <span className="font-semibold text-[#1B2618] block">Check-in & Check-out</span>
                  Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#3D6135] shrink-0 mt-0.5" />
                <div className="text-xs text-[#4A5745] tabular-nums">
                  <span className="font-semibold text-[#1B2618] block">Direct Telephone</span>
                  <a
                    href={`tel:${hotelData.phoneClean}`}
                    className="hover:text-[#3D6135] underline underline-offset-2"
                  >
                    {hotelData.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#ECEFE7] flex items-center justify-between text-xs text-[#5A6755]">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#3D6135]" />
                <span>Listed Web Reference: {hotelData.listedWebsite}</span>
              </span>
              <span className="font-semibold text-[#1B2618] tabular-nums">
                {hotelData.googleRating} ★ ({hotelData.googleRatingsCount} ratings)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white font-medium text-sm inline-flex items-center gap-2 transition-colors shadow-xs whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              type="button"
              onClick={() => setShowEmbedInput((prev) => !prev)}
              className="px-4 py-3 rounded-xl border border-[#C5D0BC] bg-white hover:bg-[#F6F7F2] text-[#1B2618] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {showEmbedInput ? 'Hide Map Embed Config' : 'Connect Google Maps Embed'}
            </button>
          </div>

          {showEmbedInput && (
            <div className="bg-white rounded-xl p-4 border border-[#DCE2D5] space-y-2">
              <label
                htmlFor="custom-map-embed"
                className="block text-xs font-semibold text-[#1B2618]"
              >
                Optional Google Maps Embed URL (No coordinates fabricated)
              </label>
              <input
                id="custom-map-embed"
                type="url"
                value={customEmbedUrl}
                onChange={(e) => setCustomEmbedUrl(e.target.value)}
                placeholder="Paste official Google Maps iframe src URL..."
                className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs text-[#1B2618]"
              />
            </div>
          )}
        </div>

        {/* Right Column: Visual Property Context or Connected Map Embed */}
        <div className="lg:col-span-6">
          {customEmbedUrl ? (
            <div className="rounded-2xl overflow-hidden border border-[#DCE2D5] bg-white aspect-4/3 shadow-sm">
              <iframe
                title="Mountain Lodge Skardu Location Map"
                src={customEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE2D5] bg-white aspect-4/3 shadow-sm group">
              <SmartImage
                src={IMAGES.exteriorDay}
                alt="Mountain Lodge Skardu situated along Satpara Rd, Devision, Skardu, Pakistan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-xs font-medium text-[#A8CC8E]">
                  {hotelData.name} · {hotelData.starClassification}-Star Hotel
                </p>
                <p className="font-display text-2xl font-semibold mt-0.5">{hotelData.address}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={getDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white text-[#1B2618] hover:bg-[#ECEFE6] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#3D6135]" />
                    <span>Open Route in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
