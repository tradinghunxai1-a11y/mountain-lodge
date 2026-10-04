import React from 'react';
import { ArrowRight, MapPin, Eye } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, getDirectionsUrl } from '../data/hotelData';
import { SmartImage } from '../components/SmartImage';

export const ExperiencePage: React.FC = () => {
  const { experiences, navigate, openLightbox, gallery } = useHotel();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Header Banner */}
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#3D6135]">
            <span>Skardu, Gilgit-Baltistan</span>
            <span aria-hidden="true">·</span>
            <span>{hotelData.address}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1B2618] tracking-tight">
            The Skardu Mountain Environment
          </h1>
          <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed max-w-2xl">
            At Mountain Lodge Skardu, the experience is defined by the surrounding Karakoram
            landscape—sheer rock faces rising behind our arched-roof chalets, golden autumn poplars
            along Satpara Road, and quiet twilight views across the valley floor.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/book')}
              className="px-6 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#3D6135]" />
              <span>View Satpara Rd Location</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            onClick={() => openLightbox(0, gallery)}
            className="relative rounded-2xl overflow-hidden border-4 border-white shadow-md aspect-4/3 cursor-pointer group"
          >
            <SmartImage
              src={experiences[0]?.image}
              alt={experiences[0]?.imageAlt || 'Mountain Lodge Skardu exterior and mountain peaks'}
              priority
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/65 text-white text-xs font-medium inline-flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Photograph</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Numbered Experience Chapters */}
      <div className="space-y-12">
        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={exp.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E6DC] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div
                  onClick={() =>
                    openLightbox(0, [
                      {
                        src: exp.image,
                        alt: exp.imageAlt,
                        title: exp.title,
                        description: exp.description,
                      },
                    ])
                  }
                  className="relative rounded-2xl overflow-hidden aspect-16/10 border border-[#DCE2D5] cursor-pointer group"
                >
                  <SmartImage
                    src={exp.image}
                    alt={exp.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="text-xs font-semibold text-[#3D6135] tracking-wider">
                  {exp.number}. {exp.settingNote}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B2618]">
                  {exp.title}
                </h2>
                <p className="text-sm font-medium text-[#3D6135]">{exp.subtitle}</p>
                <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
