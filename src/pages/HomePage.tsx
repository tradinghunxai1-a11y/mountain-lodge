import React from 'react';
import { ArrowRight, MapPin, Star, Clock, Phone, Eye } from 'lucide-react';
import { hotelData, IMAGES } from '../data/hotelData';
import { useHotel } from '../context/HotelDataContext';
import { Hero } from '../components/Hero';
import { BookingWidget } from '../components/BookingWidget';
import { RoomGrid } from '../components/RoomGrid';
import { AmenitiesSection } from '../components/AmenitiesSection';
import { LocationSection } from '../components/LocationSection';
import { SmartImage } from '../components/SmartImage';

export const HomePage: React.FC = () => {
  const { rooms, navigate, openLightbox, gallery } = useHotel();

  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Prominent Overlapping Booking Search Bar */}
      <BookingWidget variant="hero-overlap" />

      {/* 3. Asymmetric "Welcome to Mountain Lodge Skardu" Feature Block (Inspired by Reference Design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Framed Photograph with Architectural Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-md aspect-4/3 bg-[#243321]">
              <SmartImage
                src={IMAGES.gazeboTwilight}
                alt="Twilight view of white-domed garden gazebos and the Karakoram mountain range at Mountain Lodge Skardu"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => openLightbox(1, gallery)}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/65 hover:bg-black/80 text-white text-xs font-medium inline-flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Twilight Grounds</span>
              </button>
            </div>

            {/* Subtle Verified Rating Seal */}
            <div className="hidden sm:flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-md border border-[#DCE2D5] absolute -bottom-5 left-6">
              <div className="w-10 h-10 rounded-xl bg-[#3D6135] text-white flex items-center justify-center font-display text-lg font-bold tabular-nums">
                {hotelData.googleRating}
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#1B2618] flex items-center gap-1">
                  <span>Google Guest Rating</span>
                  <Star className="w-3.5 h-3.5 text-[#E5A93B] fill-current" />
                </div>
                <div className="text-[#5A6755] tabular-nums">
                  Based on {hotelData.googleRatingsCount} verified ratings
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:pt-2">
            <p className="text-xs sm:text-sm font-semibold text-[#3D6135] tracking-wide">
              Welcome to {hotelData.name}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2618] leading-[1.12] tracking-tight">
              Where Karakoram Peaks Meet Quiet Comfort
            </h2>
            <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
              Situated on <span className="font-medium text-[#1B2618]">{hotelData.address}</span>,{' '}
              {hotelData.name} is a {hotelData.starClassification}-star hotel designed to bring
              guests closer to the raw majesty of Skardu. From private arched-roof chalets to
              white-domed garden gazebos overlooking the valley, every corner frames the mountain
              landscape.
            </p>

            {/* Unboxed Key Facts */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#3B4738] border-t border-[#D8E0D0]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3D6135] shrink-0" />
                <span className="tabular-nums">
                  Check-in: {hotelData.checkInTime} · Check-out: {hotelData.checkOutTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3D6135] shrink-0" />
                <span className="tabular-nums">{hotelData.phone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/experience')}
                className="px-6 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-sm font-medium inline-flex items-center gap-2 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                <span>Explore Skardu Setting</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/about')}
                className="px-3 py-2 text-sm font-semibold text-[#1B2618] hover:text-[#3D6135] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>About the Lodge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Rooms & Suites Section (Modeled on Reference Property Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-2">
              Accommodations · Real Property Photography
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2618] tracking-tight">
              Featured <span className="text-[#3D6135] italic font-normal">Rooms & Suites</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/rooms')}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-[#1B2618] text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>View All {rooms.length} Rooms</span>
            <ArrowRight className="w-4 h-4 text-[#3D6135]" />
          </button>
        </div>

        <RoomGrid rooms={rooms.slice(0, 3)} columns={3} />
      </section>

      {/* 5. Asymmetric Bento Gallery & Experience Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-2">
              Visual Journey · Satpara Rd, Skardu
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2618] tracking-tight">
              Life Inside & Around the Lodge
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/gallery')}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dominant 7-col Card */}
          <div
            onClick={() => openLightbox(3, gallery)}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#DCE2D5] aspect-16/10 cursor-pointer group"
          >
            <SmartImage
              src={IMAGES.exteriorDusk}
              alt="Blue hour evening view of Mountain Lodge Skardu chalets and illuminated gazebos"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs text-[#A8CC8E] font-medium">
                01. Evening Ambiance · Satpara Road
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-1">
                Illuminated Chalets & Garden Pavilions at Dusk
              </h3>
            </div>
          </div>

          {/* Secondary 5-col Card */}
          <div
            onClick={() => openLightbox(2, gallery)}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#DCE2D5] aspect-16/10 lg:aspect-auto cursor-pointer group"
          >
            <SmartImage
              src={IMAGES.panoramicSuite}
              alt="Panoramic Valley View Suite with floor-to-ceiling window overlooking Skardu"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs text-[#A8CC8E] font-medium">
                02. Uninterrupted Horizon · Suite Interior
              </span>
              <h3 className="font-display text-2xl font-semibold mt-1">
                Floor-to-Ceiling Skardu Valley Vistas
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Verified Amenities Section */}
      <AmenitiesSection />

      {/* 7. Location & Directions Section */}
      <LocationSection />
    </div>
  );
};
