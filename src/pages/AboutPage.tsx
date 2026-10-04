import React from 'react';
import { MapPin, Phone, Clock, Star, Globe, ArrowRight } from 'lucide-react';
import { hotelData, IMAGES, getDirectionsUrl } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';
import { SmartImage } from '../components/SmartImage';
import { AmenitiesSection } from '../components/AmenitiesSection';

export const AboutPage: React.FC = () => {
  const { navigate, openLightbox, gallery } = useHotel();

  return (
    <div className="space-y-8 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-14">
        {/* Editorial Hero Block */}
        <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#3D6135]">
              <span>{hotelData.starClassification}-Star Hotel</span>
              <span aria-hidden="true">·</span>
              <span>{hotelData.city}, {hotelData.country}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {hotelData.googleRating} ★ ({hotelData.googleRatingsCount} Google ratings)
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1B2618] tracking-tight leading-[1.08]">
              About {hotelData.name}
            </h1>

            <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
              {hotelData.name} is a {hotelData.starClassification}-star hotel located at{' '}
              <span className="font-semibold text-[#1B2618]">{hotelData.address}</span>. Set
              directly beneath the dramatic rocky slopes of Skardu along Satpara Road, the property
              pairs private arched-roof chalet rooms and panoramic suites with terraced green lawns
              and white-domed outdoor gazebos.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/book')}
                className="px-6 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Reserve Your Stay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/rooms')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-sm font-medium transition-colors cursor-pointer"
              >
                Explore Accommodations
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              onClick={() => openLightbox(0, gallery)}
              className="rounded-2xl overflow-hidden border-4 border-white shadow-md aspect-16/10 cursor-pointer"
            >
              <SmartImage
                src={IMAGES.exteriorDay}
                alt="Daytime view of Mountain Lodge Skardu chalets, stone wall, flower path, and Karakoram mountains"
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Verified Hotel Fact Sheet */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E6DC] space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-1">
              Official Property Directory
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B2618]">
              Verified Hotel Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#E2E6DC] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D6135]">
                <MapPin className="w-4 h-4" />
                <span>Address</span>
              </div>
              <div className="text-sm font-semibold text-[#1B2618]">{hotelData.address}</div>
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#3D6135] hover:underline inline-block pt-1"
              >
                Open in Google Maps →
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#E2E6DC] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D6135]">
                <Phone className="w-4 h-4" />
                <span>Direct Phone & WhatsApp</span>
              </div>
              <div className="text-sm font-semibold text-[#1B2618] tabular-nums">
                <a href={`tel:${hotelData.phoneClean}`} className="hover:underline">
                  {hotelData.phone}
                </a>
              </div>
              <div className="text-xs text-[#54614F]">
                Reservations, availability & arrival assistance
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#E2E6DC] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D6135]">
                <Clock className="w-4 h-4" />
                <span>Check-in & Check-out</span>
              </div>
              <div className="text-sm font-semibold text-[#1B2618] tabular-nums">
                Check-in: {hotelData.checkInTime}
              </div>
              <div className="text-sm font-semibold text-[#1B2618] tabular-nums">
                Check-out: {hotelData.checkOutTime}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#E2E6DC] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D6135]">
                <Star className="w-4 h-4" />
                <span>Classification & Guest Rating</span>
              </div>
              <div className="text-sm font-semibold text-[#1B2618] tabular-nums">
                {hotelData.starClassification}-Star Hotel · {hotelData.googleRating} / 5
              </div>
              <div className="text-xs text-[#54614F] tabular-nums">
                Based on {hotelData.googleRatingsCount} Google ratings
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#E2E6DC] space-y-1.5 sm:col-span-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3D6135]">
                <Globe className="w-4 h-4" />
                <span>Listed Website Reference</span>
              </div>
              <div className="text-sm font-semibold text-[#1B2618]">
                {hotelData.listedWebsite}
              </div>
              <div className="text-xs text-[#54614F]">
                All property descriptions and visual features on this website are strictly grounded
                in the supplied hotel facts and official photographs of {hotelData.name}.
              </div>
            </div>
          </div>
        </div>
      </div>

      <AmenitiesSection />
    </div>
  );
};
