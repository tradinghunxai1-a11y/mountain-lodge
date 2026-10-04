import React from 'react';
import { Mountain, Trees, BedDouble, Sun, Bath, Compass, SlidersHorizontal } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { AmenityItem } from '../data/hotelData';

const ICON_MAP: Record<AmenityItem['iconName'], React.ReactNode> = {
  mountain: <Mountain className="w-5 h-5 text-[#3D6135]" />,
  trees: <Trees className="w-5 h-5 text-[#3D6135]" />,
  bed: <BedDouble className="w-5 h-5 text-[#3D6135]" />,
  sun: <Sun className="w-5 h-5 text-[#3D6135]" />,
  bath: <Bath className="w-5 h-5 text-[#3D6135]" />,
  compass: <Compass className="w-5 h-5 text-[#3D6135]" />,
};

export const AmenitiesSection: React.FC = () => {
  const { amenities, setIsEditorOpen } = useHotel();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <p className="text-xs font-semibold text-[#3D6135] tracking-wider mb-2">
            Property Features · Verified From Photographs
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B2618] tracking-tight">
            Lodge Grounds & In-Room Comforts
          </h2>
          <p className="text-sm sm:text-base text-[#4E5B49] mt-2 max-w-2xl">
            Every feature listed below reflects the physical spaces documented across Mountain Lodge
            Skardu—from the terraced outdoor gazebos to private en-suite rooms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditorOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-[#C6D1BC] hover:bg-[#E7ECE0] text-[#1B2618] text-xs font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#3D6135]" />
          <span>Customize Amenities Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-[#E2E6DC] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EDF1E7] flex items-center justify-center">
                  {ICON_MAP[item.iconName] || <Mountain className="w-5 h-5 text-[#3D6135]" />}
                </div>
                <span className="text-xs text-[#657360]">{item.category}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#1B2618] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#4C5947] leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
