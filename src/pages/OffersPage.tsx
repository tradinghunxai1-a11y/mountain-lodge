import React from 'react';
import { SlidersHorizontal, Check, MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, getWhatsAppUrl, IMAGES } from '../data/hotelData';
import { SmartImage } from '../components/SmartImage';

export const OffersPage: React.FC = () => {
  const { offers, setIsEditorOpen, navigate } = useHotel();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#3D6135]">
            <span>{hotelData.name}</span>
            <span aria-hidden="true">·</span>
            <span>Seasonal Packages & Direct Tariffs</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1B2618] tracking-tight">
            Seasonal Stays & Direct Inquiries
          </h1>
          <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed max-w-2xl">
            In keeping with our strict commitment to accuracy, no fictional discounts or promotional
            rates are displayed. Official seasonal packages can be published below by hotel
            management or requested directly from our reservations desk at {hotelData.phone}.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Configure Official Offers</span>
            </button>
            <a
              href={getWhatsAppUrl(
                'Assalam-o-Alaikum Mountain Lodge Skardu, I would like to inquire about seasonal rates or group stay packages.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#F6F7F2] border border-[#C5D0BC] text-[#1B2618] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#3D6135]" />
              <span>Ask About Current Rates on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border-4 border-white shadow-md aspect-16/10">
            <SmartImage
              src={IMAGES.exteriorDusk}
              alt="Evening view of Mountain Lodge Skardu chalets and illuminated gazebos"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E6DC] flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A6755]">
                <span>{offer.validityNote}</span>
                <span className="font-semibold text-[#3D6135]">
                  {offer.rateOrDiscount || 'Direct Rate Inquiry'}
                </span>
              </div>

              <h2 className="font-display text-3xl font-semibold text-[#1B2618]">{offer.title}</h2>
              <p className="text-xs sm:text-sm font-medium text-[#3D6135]">{offer.subtitle}</p>
              <p className="text-sm text-[#4A5745] leading-relaxed">{offer.description}</p>

              <div className="pt-4 border-t border-[#ECEFE7] space-y-2">
                {offer.inclusions.map((inc) => (
                  <div key={inc} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3B4738]">
                    <Check className="w-4 h-4 text-[#3D6135] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/book')}
                className="px-5 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Booking Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:${hotelData.phoneClean}`}
                className="px-4 py-3 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-[#1B2618] text-xs font-medium inline-flex items-center gap-1.5 tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#3D6135]" />
                <span>Call {hotelData.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
