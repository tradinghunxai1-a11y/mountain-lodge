import React from 'react';
import { Utensils, Clock, MessageCircle, SlidersHorizontal, Phone } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';
import { SmartImage } from '../components/SmartImage';

export const DiningPage: React.FC = () => {
  const { dining, setIsEditorOpen, openLightbox } = useHotel();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
      {/* Dining Hero */}
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#3D6135]">
              <Utensils className="w-3.5 h-3.5" />
              <span>Hospitality & Dining · {hotelData.name}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1B2618] tracking-tight">
              {dining.headline}
            </h1>
            <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
              {dining.introduction}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#3D6135]" />
              <span>Configure Dining Hours & Menu</span>
            </button>
            <a
              href={getWhatsAppUrl(
                'Assalam-o-Alaikum Mountain Lodge Skardu, I would like to inquire about dining arrangements during my stay.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs font-semibold inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Documented Dining Spaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dining.diningSpaces.map((space) => (
          <div
            key={space.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E2E6DC] flex flex-col"
          >
            <div
              onClick={() =>
                openLightbox(0, [
                  {
                    src: space.image,
                    alt: space.imageAlt,
                    title: space.name,
                    description: space.description,
                  },
                ])
              }
              className="aspect-16/10 w-full overflow-hidden cursor-pointer group"
            >
              <SmartImage
                src={space.image}
                alt={space.imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-2.5">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618]">
                {space.name}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
                {space.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Menu & Service Hours Section (Editable without fabrication) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E6DC] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECEFE7]">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618]">
              Dining Service & Menu Information
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6755] mt-1">{dining.settingDescription}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1B2618] bg-[#F6F7F2] px-4 py-2.5 rounded-xl border border-[#DCE2D5]">
            <Clock className="w-4 h-4 text-[#3D6135]" />
            <span>
              Service Hours: {dining.openingHours || 'Available via Front Desk (+92 300 9091494)'}
            </span>
          </div>
        </div>

        {dining.menuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dining.menuItems.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="p-4 rounded-xl bg-[#F6F7F2] border border-[#E2E6DC] flex items-start justify-between gap-4"
              >
                <div>
                  <div className="font-semibold text-sm text-[#1B2618]">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-[#54614F] mt-0.5">{item.description}</div>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#3D6135] tabular-nums shrink-0">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F6F7F2] rounded-2xl p-6 border border-[#E2E6DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-[#1B2618]">
                Official Menu & Seasonal Specialties
              </div>
              <p className="text-xs text-[#4E5B49] max-w-xl">
                No menu items, prices, or opening hours have been fabricated. Call or message our
                hospitality desk at {hotelData.phone} for current seasonal dining selections, or add
                official menu items using the editor.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${hotelData.phoneClean}`}
                className="px-4 py-2 rounded-xl border border-[#C5D0BC] bg-white hover:bg-[#ECEFE6] text-xs font-medium text-[#1B2618] inline-flex items-center gap-1.5 tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#3D6135]" />
                <span>Call Desk</span>
              </a>
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs font-medium cursor-pointer"
              >
                Add Official Menu Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
