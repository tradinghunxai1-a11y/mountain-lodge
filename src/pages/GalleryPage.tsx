import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { hotelData, GalleryItem } from '../data/hotelData';
import { SmartImage } from '../components/SmartImage';

const CATEGORIES: ('All' | GalleryItem['category'])[] = [
  'All',
  'Exterior & Grounds',
  'Suites & Rooms',
  'Mountain Views',
  'Garden Gazebos',
  'Interiors & Bath',
];

export const GalleryPage: React.FC = () => {
  const { gallery, openLightbox } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState<'All' | GalleryItem['category']>('All');

  const filteredItems =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="bg-[#ECEFE6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DCE2D5] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#3D6135]">
            <span>{hotelData.name}</span>
            <span aria-hidden="true">·</span>
            <span>{gallery.length} Property Photographs</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1B2618] tracking-tight">
            Property & Mountain Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#4A5745] leading-relaxed">
            Inspect photographs of {hotelData.name}—from the arched-roof chalets and illuminated
            white-domed garden gazebos to our wood-paneled rooms and panoramic valley suites. Click
            any photograph to launch the full-screen lightbox viewer.
          </p>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E6EAE0] rounded-2xl w-fit">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-white text-[#1B2618] shadow-xs'
                : 'text-[#4E5B49] hover:text-[#1B2618]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Responsive Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {filteredItems.map((item, idx) => {
          const isWide = item.aspect === 'wide' && selectedCategory === 'All';
          return (
            <figure
              key={item.id}
              onClick={() => openLightbox(idx, filteredItems)}
              className={`${
                isWide ? 'lg:col-span-6' : 'lg:col-span-4'
              } bg-white rounded-2xl overflow-hidden border border-[#E2E6DC] flex flex-col justify-between cursor-pointer group`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#243321]">
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3.5 py-2 rounded-xl bg-black/75 text-white text-xs font-medium inline-flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Lightbox</span>
                  </span>
                </div>
              </div>

              <figcaption className="p-5 space-y-1.5">
                <div className="text-xs text-[#657360]">{item.category}</div>
                <h2 className="font-display text-xl font-semibold text-[#1B2618] group-hover:text-[#3D6135] transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-[#4E5B49] leading-relaxed">{item.description}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
};
