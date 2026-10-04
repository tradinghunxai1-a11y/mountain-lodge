import exteriorDay from '../assets/images/lodge_exterior_day_1791097520191.jpg';
import exteriorDusk from '../assets/images/lodge_exterior_dusk_1791097532930.jpg';
import gazeboTwilight from '../assets/images/skardu_gazebo_twilight_1791097542889.jpg';
import panoramicSuite from '../assets/images/panoramic_mountain_suite_1791097554971.jpg';
import mountainDeluxeRoom from '../assets/images/mountain_view_deluxe_room_1791097564793.jpg';
import heritageWoodRoom from '../assets/images/heritage_wood_room_1791097576079.jpg';
import familySuiteBathroom from '../assets/images/family_suite_bathroom_1791097586087.jpg';

export interface HotelInfo {
  name: string;
  starClassification: number;
  googleRating: number;
  googleRatingsCount: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneClean: string;
  whatsappNumber: string;
  checkInTime: string;
  checkOutTime: string;
  listedWebsite: string;
  tagline: string;
  shortDescription: string;
}

export interface RoomItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  primaryImage: string;
  primaryImageAlt: string;
  galleryImages: { src: string; alt: string; caption: string }[];
  verifiedHighlights: string[];
  // Editable fields left uninvented by default so hotel management can supply official figures
  pricePerNight: string | null;
  roomSize: string | null;
  occupancy: string | null;
  bedConfiguration: string;
  viewType: string;
  additionalFacilities: string[];
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  category: 'Property & Grounds' | 'In-Room Comfort' | 'Hospitality';
  iconName: 'mountain' | 'trees' | 'bed' | 'sun' | 'bath' | 'compass';
  image?: string;
  verifiedFromPhotos: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'Exterior & Grounds' | 'Suites & Rooms' | 'Mountain Views' | 'Garden Gazebos' | 'Interiors & Bath';
  aspect: 'landscape' | 'portrait' | 'wide';
  description: string;
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  settingNote: string;
}

export interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  validityNote: string;
  rateOrDiscount: string | null;
  inclusions: string[];
  isConfigured: boolean;
}

export interface DiningConfig {
  headline: string;
  introduction: string;
  settingDescription: string;
  diningSpaces: {
    id: string;
    name: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  // Editable fields not fabricated unless supplied
  openingHours: string | null;
  cuisineSpecialties: string[];
  menuItems: { name: string; description: string; price: string }[];
}

export const IMAGES = {
  exteriorDay,
  exteriorDusk,
  gazeboTwilight,
  panoramicSuite,
  mountainDeluxeRoom,
  heritageWoodRoom,
  familySuiteBathroom,
} as const;

export const hotelData: HotelInfo = {
  name: 'Mountain Lodge Skardu',
  starClassification: 5,
  googleRating: 4.4,
  googleRatingsCount: 292,
  address: 'Satpara Rd, Devision, Skardu, 16100, Pakistan',
  city: 'Skardu',
  postalCode: '16100',
  country: 'Pakistan',
  phone: '+92 300 9091494',
  phoneClean: '+923009091494',
  whatsappNumber: '923009091494',
  checkInTime: '2:00 PM',
  checkOutTime: '12:00 PM',
  listedWebsite: 'dewanekhas.com',
  tagline: 'Experience Skardu in Comfort',
  shortDescription:
    'Set along Satpara Road in Skardu, Mountain Lodge Skardu is a 5-star mountain retreat offering panoramic views of the Karakoram peaks, private arched-roof chalets, and terraced garden gazebos.',
};

export function getWhatsAppUrl(customMessage?: string): string {
  const base = `https://wa.me/${hotelData.whatsappNumber}`;
  const text =
    customMessage ||
    `Assalam-o-Alaikum Mountain Lodge Skardu, I would like to inquire about room availability and rates.`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function getDirectionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotelData.name}, ${hotelData.address}`
  )}`;
}

export const initialRoomsData: RoomItem[] = [
  {
    id: 'panoramic-valley-suite',
    name: 'Panoramic Valley View Suite',
    subtitle: 'Floor-to-ceiling Karakoram & valley vista with warm timber ceiling',
    description:
      'Designed around a sweeping floor-to-ceiling picture window overlooking the Skardu valley and surrounding mountain ridges. Features a natural pine-plank ceiling with recessed track lighting, a plush double bed with crisp white linens, an upholstered foot-bench, and soft woven area rugs.',
    primaryImage: IMAGES.panoramicSuite,
    primaryImageAlt:
      'Panoramic Valley View Suite at Mountain Lodge Skardu featuring timber ceiling, king bed, and floor-to-ceiling window overlooking the Skardu valley',
    galleryImages: [
      {
        src: IMAGES.panoramicSuite,
        alt: 'Panoramic Valley View Suite bedroom and floor-to-ceiling valley window',
        caption: 'Uninterrupted floor-to-ceiling views across the Skardu valley floor and mountain ridges.',
      },
      {
        src: IMAGES.gazeboTwilight,
        alt: 'Evening view from the property gardens toward the Skardu mountain range',
        caption: 'Terraced property grounds outside the suites at twilight.',
      },
    ],
    verifiedHighlights: [
      'Floor-to-ceiling panoramic mountain & valley window',
      'Natural timber-plank ceiling with ambient track lighting',
      'Upholstered lounge bench & bedside lighting',
      'Blackout & sheer drapery for natural light control',
    ],
    pricePerNight: null,
    roomSize: null,
    occupancy: null,
    bedConfiguration: 'Double Bed with upholstered foot-bench',
    viewType: 'Direct Skardu Valley & Mountain Vista',
    additionalFacilities: [],
  },
  {
    id: 'cliffside-mountain-deluxe',
    name: 'Cliffside Mountain View Room',
    subtitle: 'Traditional carved woodwork with direct views of Skardu rock faces',
    description:
      'Featuring warm geometric-paneled walls, a classically carved dark-wood headboard, and polished timber floors. Large double windows frame the dramatic rocky mountain cliffs and greenery along Satpara Road, flooding the room with natural mountain daylight.',
    primaryImage: IMAGES.mountainDeluxeRoom,
    primaryImageAlt:
      'Cliffside Mountain View Room at Mountain Lodge Skardu with carved wooden headboard, geometric wall paneling, and mountain cliff view through the window',
    galleryImages: [
      {
        src: IMAGES.mountainDeluxeRoom,
        alt: 'Cliffside Mountain View Room with carved headboard and sunlit mountain window',
        caption: 'Direct window outlook toward the towering rock faces of Skardu.',
      },
      {
        src: IMAGES.exteriorDay,
        alt: 'Daytime view of the row of chalet rooms and terraced gardens',
        caption: 'Row of private arched-roof rooms set along the upper stone terrace.',
      },
    ],
    verifiedHighlights: [
      'Direct window view of Skardu mountain cliffs & trees',
      'Hand-carved wooden headboard & tufted bench',
      'Warm geometric wall and ceiling craftsmanship',
      'Polished hardwood flooring & bedside reading lamps',
    ],
    pricePerNight: null,
    roomSize: null,
    occupancy: null,
    bedConfiguration: 'Double Bed with tufted foot-bench',
    viewType: 'Mountain Cliff & Valley Greenery View',
    additionalFacilities: [],
  },
  {
    id: 'heritage-wood-chamber',
    name: 'Heritage Wood-Paneled Room',
    subtitle: 'Spacious wooden interior with indoor armchair seating & balcony access',
    description:
      'Showcasing intricate geometric wood paneling across both walls and ceiling, this generous chamber combines resting comfort with a dedicated indoor lounge corner. Includes leather armchairs, a glass-topped coffee table, flat-screen television, and direct access to the exterior terrace.',
    primaryImage: IMAGES.heritageWoodRoom,
    primaryImageAlt:
      'Heritage Wood-Paneled Room at Mountain Lodge Skardu with geometric ceiling, double bed, leather armchairs, and balcony door',
    galleryImages: [
      {
        src: IMAGES.heritageWoodRoom,
        alt: 'Spacious wood-paneled bedroom with armchair seating area and glass balcony door',
        caption: 'Intricate geometric ceiling woodwork and dedicated indoor seating area.',
      },
      {
        src: IMAGES.exteriorDusk,
        alt: 'Evening view of the chalet balconies at Mountain Lodge Skardu',
        caption: 'Private chalet porches illuminated at blue hour.',
      },
    ],
    verifiedHighlights: [
      'Intricate geometric wood-paneled walls & coffered ceiling',
      'Indoor seating lounge with armchairs & glass coffee table',
      'Wall-mounted television & writing desk surface',
      'Large window & glass door opening to terrace',
    ],
    pricePerNight: null,
    roomSize: null,
    occupancy: null,
    bedConfiguration: 'Double Bed + Indoor Armchair Seating',
    viewType: 'Garden Terrace & Mountain Outlook',
    additionalFacilities: [],
  },
  {
    id: 'deluxe-family-chamber',
    name: 'Spacious Comfort Room with Dining Area',
    subtitle: 'Carpeted bedroom with in-room wooden dining table & attached bath',
    description:
      'A bright, generously proportioned room featuring full-floor patterned carpeting, a wooden dining table with chairs positioned beside wide scenic windows, a corner armchair, television, and an en-suite tiled bathroom with pedestal sink and shower.',
    primaryImage: IMAGES.familySuiteBathroom,
    primaryImageAlt:
      'Spacious Comfort Room at Mountain Lodge Skardu showing patterned carpet, bed, wooden dining table by the window, and attached tiled bathroom',
    galleryImages: [
      {
        src: IMAGES.familySuiteBathroom,
        alt: 'Room interior showing bedroom, in-room dining table, and attached tiled bathroom',
        caption: 'Spacious layout with in-room dining table and en-suite tiled bathroom.',
      },
      {
        src: IMAGES.exteriorDay,
        alt: 'Mountain Lodge Skardu exterior cottages and garden path',
        caption: 'Sunny mountain surroundings at Mountain Lodge Skardu.',
      },
    ],
    verifiedHighlights: [
      'En-suite tiled bathroom with pedestal sink & wall shower',
      'In-room wooden table and chairs for private dining',
      'Full-room woven carpet & coffered decorative ceiling',
      'Dual large windows for natural daylight & mountain air',
    ],
    pricePerNight: null,
    roomSize: null,
    occupancy: null,
    bedConfiguration: 'Double Bed + In-Room Dining Table',
    viewType: 'Property Grounds & Mountain View',
    additionalFacilities: [],
  },
];

export const initialAmenitiesData: AmenityItem[] = [
  {
    id: 'terraced-garden-gazebos',
    title: 'Illuminated Garden Gazebos',
    description:
      'Octagonal white-domed outdoor pavilions set across terraced green lawns, offering shaded daytime seating and warm evening illumination overlooking Skardu.',
    category: 'Property & Grounds',
    iconName: 'sun',
    image: IMAGES.gazeboTwilight,
    verifiedFromPhotos: true,
  },
  {
    id: 'private-chalet-terraces',
    title: 'Arched-Roof Chalet Porches',
    description:
      'Individual chalet-style accommodations elevated along a stone terrace wall with private front porches facing the gardens and Karakoram mountains.',
    category: 'Property & Grounds',
    iconName: 'mountain',
    image: IMAGES.exteriorDay,
    verifiedFromPhotos: true,
  },
  {
    id: 'panoramic-mountain-windows',
    title: 'Panoramic Mountain & Valley Windows',
    description:
      'Guest rooms and suites designed with expansive picture windows framing the rugged rock cliffs, autumn foliage, and vast Skardu valley.',
    category: 'In-Room Comfort',
    iconName: 'compass',
    image: IMAGES.panoramicSuite,
    verifiedFromPhotos: true,
  },
  {
    id: 'landscaped-flower-walkways',
    title: 'Terraced Lawns & Stone Walkways',
    description:
      'Manicured garden grounds lined with seasonal marigold blooms, evergreens, and natural flagstone paths for peaceful strolls in the mountain air.',
    category: 'Property & Grounds',
    iconName: 'trees',
    image: IMAGES.exteriorDusk,
    verifiedFromPhotos: true,
  },
  {
    id: 'in-room-seating-dining',
    title: 'In-Room Lounge & Dining Seating',
    description:
      'Thoughtfully furnished interiors featuring armchair seating areas, upholstered benches, or private wooden dining tables beside scenic windows.',
    category: 'In-Room Comfort',
    iconName: 'bed',
    image: IMAGES.heritageWoodRoom,
    verifiedFromPhotos: true,
  },
  {
    id: 'ensuite-tiled-bathrooms',
    title: 'En-Suite Tiled Bathrooms',
    description:
      'Private attached bathrooms equipped with ceramic pedestal sinks, wall mirrors, tiled floors, and overhead shower fixtures.',
    category: 'In-Room Comfort',
    iconName: 'bath',
    image: IMAGES.familySuiteBathroom,
    verifiedFromPhotos: true,
  },
];

export const initialGalleryData: GalleryItem[] = [
  {
    id: 'gal-exterior-day',
    src: IMAGES.exteriorDay,
    alt: 'Daytime view of Mountain Lodge Skardu arched-roof chalets, stone terrace, flower-lined path, white-domed gazebos, and Karakoram mountains',
    title: 'Chalet Row & Garden Gazebos in Autumn Sunlight',
    category: 'Exterior & Grounds',
    aspect: 'wide',
    description:
      'A clear daytime view of the upper chalet terrace, marigold-lined stone walkway, white-domed outdoor gazebos, and surrounding Skardu peaks.',
  },
  {
    id: 'gal-gazebo-twilight',
    src: IMAGES.gazeboTwilight,
    alt: 'Twilight view of illuminated white-domed garden gazebos at Mountain Lodge Skardu overlooking the misty valley and dark blue mountain range',
    title: 'Terraced Garden Gazebos at Twilight',
    category: 'Garden Gazebos',
    aspect: 'landscape',
    description:
      'Warm evening lighting inside the garden gazebos overlooking the lights of the Skardu valley and the Karakoram range at dusk.',
  },
  {
    id: 'gal-panoramic-suite',
    src: IMAGES.panoramicSuite,
    alt: 'Panoramic Valley View Suite interior with pine wood ceiling, double bed, and floor-to-ceiling window overlooking Skardu landscape',
    title: 'Panoramic Valley View Suite',
    category: 'Suites & Rooms',
    aspect: 'landscape',
    description:
      'Natural wood ceiling, plush bedding, and a floor-to-ceiling picture window framing the wide Skardu valley.',
  },
  {
    id: 'gal-exterior-dusk',
    src: IMAGES.exteriorDusk,
    alt: 'Blue hour evening photograph of Mountain Lodge Skardu chalets and lit gazebos nestled against the rocky mountain slope',
    title: 'Mountain Lodge Skardu at Blue Hour',
    category: 'Exterior & Grounds',
    aspect: 'wide',
    description:
      'The row of private chalets and garden pavilions glowing against the steep rocky mountainside after sunset.',
  },
  {
    id: 'gal-mountain-deluxe',
    src: IMAGES.mountainDeluxeRoom,
    alt: 'Cliffside Mountain View Room with carved wooden headboard, geometric walls, and window framing steep Skardu rock cliffs',
    title: 'Cliffside Mountain View Room',
    category: 'Mountain Views',
    aspect: 'landscape',
    description:
      'Sunlit bedroom with carved dark-wood headboard and a direct window perspective of Skardu’s dramatic rock faces.',
  },
  {
    id: 'gal-heritage-wood',
    src: IMAGES.heritageWoodRoom,
    alt: 'Heritage Wood-Paneled Room featuring geometric wood ceiling and walls, double bed, and armchair lounge area',
    title: 'Heritage Wood-Paneled Chamber',
    category: 'Suites & Rooms',
    aspect: 'landscape',
    description:
      'Warm geometric wood craftsmanship paired with an indoor armchair seating area and balcony access.',
  },
  {
    id: 'gal-family-bath',
    src: IMAGES.familySuiteBathroom,
    alt: 'Spacious Comfort Room showing patterned carpet, bed, wooden dining table, and open door to the attached tiled bathroom',
    title: 'Comfort Room & En-Suite Bathroom',
    category: 'Interiors & Bath',
    aspect: 'landscape',
    description:
      'Interior view highlighting the carpeted sleeping area, window-side wooden dining table, and attached tiled bathroom.',
  },
];

export const initialExperienceData: ExperienceItem[] = [
  {
    id: 'exp-satpara-corridor',
    number: '01',
    title: 'The Satpara Road Mountain Setting',
    subtitle: 'Positioned along one of Skardu’s most scenic natural corridors',
    description:
      'Located on Satpara Rd, Devision, Skardu, the lodge sits directly beneath towering Karakoram rock formations. Guests wake to crisp high-altitude light moving across sheer stone cliffs and golden valley poplars.',
    image: IMAGES.exteriorDay,
    imageAlt: 'Mountain Lodge Skardu set beneath towering rocky mountains along Satpara Road',
    settingNote: 'Satpara Rd, Devision, Skardu, 16100',
  },
  {
    id: 'exp-twilight-gazebos',
    number: '02',
    title: 'Dusk Over the Skardu Valley',
    subtitle: 'Unbroken horizon views from the terraced garden pavilions',
    description:
      'As evening settles over Gilgit-Baltistan, the lodge’s white-domed garden gazebos glow warmly along the terraced lawn—offering a quiet vantage point to watch twilight deepen over the valley floor and distant mountain ridges.',
    image: IMAGES.gazeboTwilight,
    imageAlt: 'Illuminated garden gazebos overlooking the Skardu valley and mountains at dusk',
    settingNote: 'Terraced Garden Lawns & Pavilions',
  },
  {
    id: 'exp-panoramic-serenity',
    number: '03',
    title: 'Indoor Sanctuary with Open Vistas',
    subtitle: 'Watch the changing mountain light from the comfort of your room',
    description:
      'Whether framed through floor-to-ceiling glass in the Panoramic Suite or double timber windows in the Mountain View rooms, the dramatic geography of Skardu remains ever-present throughout your stay.',
    image: IMAGES.panoramicSuite,
    imageAlt: 'Floor-to-ceiling window inside the Panoramic Suite overlooking the Skardu landscape',
    settingNote: 'In-Room Mountain & Valley Perspectives',
  },
];

export const initialDiningData: DiningConfig = {
  headline: 'Al Fresco Garden Pavilions & Private In-Room Dining',
  introduction:
    'At Mountain Lodge Skardu, dining is shaped by the mountain environment—whether seated beneath the illuminated white-domed gazebos on the terraced lawn or enjoying a quiet meal beside your room’s scenic window.',
  settingDescription:
    'Menu items, seasonal specialties, and dining service hours are maintained directly by the lodge hospitality team. Contact us via phone or WhatsApp during or prior to your stay for current dining arrangements.',
  diningSpaces: [
    {
      id: 'dining-gazebo-lawn',
      name: 'Terraced Garden Gazebos',
      description:
        'Octagonal open-air garden pavilions furnished with circular tables and seating, surrounded by marigold flower beds and panoramic views of the Skardu mountains.',
      image: IMAGES.gazeboTwilight,
      imageAlt: 'White-domed outdoor garden gazebos with circular tables and seating at Mountain Lodge Skardu',
    },
    {
      id: 'dining-in-room',
      name: 'Private Window-Side Room Dining',
      description:
        'Select rooms feature dedicated wooden dining tables and chairs positioned beside bright mountain-facing windows for private, unhurried meals indoors.',
      image: IMAGES.familySuiteBathroom,
      imageAlt: 'In-room wooden dining table and chairs positioned next to a large window at Mountain Lodge Skardu',
    },
  ],
  openingHours: null,
  cuisineSpecialties: [],
  menuItems: [],
};

export const initialOffersData: OfferItem[] = [
  {
    id: 'direct-reservation-inquiry',
    title: 'Direct Stay & Seasonal Rate Inquiry',
    subtitle: 'Contact Mountain Lodge Skardu directly for current seasonal availability',
    description:
      'Official room tariffs, group stay arrangements, and seasonal packages for Skardu are provided directly by our reservations desk. No unverified promotional discounts are listed here until published by hotel management.',
    validityNote: 'Check-in: 2:00 PM · Check-out: 12:00 PM',
    rateOrDiscount: null,
    inclusions: [
      'Direct reservation confirmation with Mountain Lodge Skardu (+92 300 9091494)',
      'Choice of available Chalet Rooms or Panoramic Valley Suites',
      'Access to terraced garden lawns and outdoor viewing gazebos',
    ],
    isConfigured: false,
  },
];
