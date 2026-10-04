import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  hotelData,
  initialRoomsData,
  initialAmenitiesData,
  initialGalleryData,
  initialExperienceData,
  initialDiningData,
  initialOffersData,
  RoomItem,
  AmenityItem,
  GalleryItem,
  ExperienceItem,
  DiningConfig,
  OfferItem,
} from '../data/hotelData';

export interface BookingSearchState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  selectedRoomId: string | null;
}

interface LightboxState {
  isOpen: boolean;
  index: number;
  items: { src: string; alt: string; title: string; description?: string }[];
}

interface HotelContextValue {
  currentPath: string;
  navigate: (to: string) => void;
  bookingSearch: BookingSearchState;
  updateBookingSearch: (patch: Partial<BookingSearchState>) => void;
  rooms: RoomItem[];
  updateRoom: (id: string, patch: Partial<RoomItem>) => void;
  amenities: AmenityItem[];
  addAmenity: (item: AmenityItem) => void;
  experiences: ExperienceItem[];
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  dining: DiningConfig;
  updateDining: (patch: Partial<DiningConfig>) => void;
  offers: OfferItem[];
  updateOffer: (id: string, patch: Partial<OfferItem>) => void;
  addOffer: (item: OfferItem) => void;
  gallery: GalleryItem[];
  resetAllEditableData: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  lightbox: LightboxState;
  openLightbox: (
    index: number,
    items?: { src: string; alt: string; title: string; description?: string }[]
  ) => void;
  closeLightbox: () => void;
  nextLightbox: () => void;
  prevLightbox: () => void;
}

const HotelDataContext = createContext<HotelContextValue | null>(null);

function getDefaultDates() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const checkOut = new Date(now);
  checkOut.setDate(now.getDate() + 3);
  return {
    checkIn: tomorrow.toISOString().split('T')[0],
    checkOut: checkOut.toISOString().split('T')[0],
  };
}

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Mountain Lodge Skardu – 5-Star Hotel on Satpara Rd, Skardu',
    description:
      'Experience Skardu in comfort at Mountain Lodge Skardu, a 5-star hotel on Satpara Rd, Devision, Skardu, Pakistan. Rated 4.4/5 across 292 Google ratings.',
  },
  '/rooms': {
    title: 'Rooms & Suites – Mountain Lodge Skardu, Pakistan',
    description:
      'Explore rooms and panoramic suites at Mountain Lodge Skardu on Satpara Rd. View real room photography, mountain vistas, and check availability.',
  },
  '/experience': {
    title: 'Skardu Mountain Experience – Mountain Lodge Skardu',
    description:
      'Discover the serene Karakoram mountain environment, terraced garden gazebos, and Satpara Road setting at Mountain Lodge Skardu.',
  },
  '/dining': {
    title: 'Dining & Garden Gazebos – Mountain Lodge Skardu',
    description:
      'Experience outdoor gazebo dining and private window-side dining at Mountain Lodge Skardu on Satpara Rd, Skardu, Pakistan.',
  },
  '/gallery': {
    title: 'Photo Gallery – Mountain Lodge Skardu, Pakistan',
    description:
      'Browse real photographs of Mountain Lodge Skardu: arched-roof chalets, panoramic suites, wood-paneled rooms, illuminated gazebos, and Karakoram peaks.',
  },
  '/about': {
    title: 'About Mountain Lodge Skardu – 5-Star Hospitality in Skardu',
    description:
      'Learn about Mountain Lodge Skardu, located at Satpara Rd, Devision, Skardu, 16100, Pakistan. Check-in 2:00 PM, Check-out 12:00 PM.',
  },
  '/contact': {
    title: 'Contact & Location – Mountain Lodge Skardu (+92 300 9091494)',
    description:
      'Contact Mountain Lodge Skardu at +92 300 9091494 or visit us at Satpara Rd, Devision, Skardu, 16100, Pakistan. Direct WhatsApp and online inquiries.',
  },
  '/book': {
    title: 'Reserve Your Stay – Mountain Lodge Skardu',
    description:
      'Check room availability, select your preferred suite or room, and submit your reservation inquiry for Mountain Lodge Skardu.',
  },
  '/offers': {
    title: 'Seasonal Stays & Offers – Mountain Lodge Skardu',
    description:
      'View direct booking inquiries and seasonal stay structures at Mountain Lodge Skardu, Satpara Rd, Skardu.',
  },
};

export const HotelDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return p && p !== '' ? p : '/';
  });

  const defaultDates = getDefaultDates();
  const [bookingSearch, setBookingSearch] = useState<BookingSearchState>({
    checkIn: defaultDates.checkIn,
    checkOut: defaultDates.checkOut,
    guests: 2,
    roomsCount: 1,
    selectedRoomId: null,
  });

  const [rooms, setRooms] = useState<RoomItem[]>(() => {
    try {
      const saved = localStorage.getItem('mls_rooms_v1');
      return saved ? JSON.parse(saved) : initialRoomsData;
    } catch {
      return initialRoomsData;
    }
  });

  const [amenities, setAmenities] = useState<AmenityItem[]>(() => {
    try {
      const saved = localStorage.getItem('mls_amenities_v1');
      return saved ? JSON.parse(saved) : initialAmenitiesData;
    } catch {
      return initialAmenitiesData;
    }
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem('mls_experiences_v1');
      return saved ? JSON.parse(saved) : initialExperienceData;
    } catch {
      return initialExperienceData;
    }
  });

  const [dining, setDining] = useState<DiningConfig>(() => {
    try {
      const saved = localStorage.getItem('mls_dining_v1');
      return saved ? JSON.parse(saved) : initialDiningData;
    } catch {
      return initialDiningData;
    }
  });

  const [offers, setOffers] = useState<OfferItem[]>(() => {
    try {
      const saved = localStorage.getItem('mls_offers_v1');
      return saved ? JSON.parse(saved) : initialOffersData;
    } catch {
      return initialOffersData;
    }
  });

  const [gallery] = useState<GalleryItem[]>(initialGalleryData);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    index: 0,
    items: initialGalleryData,
  });

  // Persist editable structures
  useEffect(() => {
    try {
      localStorage.setItem('mls_rooms_v1', JSON.stringify(rooms));
    } catch {
      // ignore storage quota errors
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem('mls_amenities_v1', JSON.stringify(amenities));
    } catch {
      // ignore
    }
  }, [amenities]);

  useEffect(() => {
    try {
      localStorage.setItem('mls_experiences_v1', JSON.stringify(experiences));
    } catch {
      // ignore
    }
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem('mls_dining_v1', JSON.stringify(dining));
    } catch {
      // ignore
    }
  }, [dining]);

  useEffect(() => {
    try {
      localStorage.setItem('mls_offers_v1', JSON.stringify(offers));
    } catch {
      // ignore
    }
  }, [offers]);

  // Listen to browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO document title and meta description on route change
  useEffect(() => {
    let seo = ROUTE_SEO[currentPath];
    if (!seo && currentPath.startsWith('/rooms/')) {
      const roomId = currentPath.replace('/rooms/', '');
      const found = rooms.find((r) => r.id === roomId);
      if (found) {
        seo = {
          title: `${found.name} – ${hotelData.name}`,
          description: found.description,
        };
      }
    }
    if (!seo) {
      seo = ROUTE_SEO['/'];
    }
    document.title = seo.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', seo.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', seo.description);
    }
  }, [currentPath, rooms]);

  const navigate = useCallback((to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to);
    }
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateBookingSearch = useCallback((patch: Partial<BookingSearchState>) => {
    setBookingSearch((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateRoom = useCallback((id: string, patch: Partial<RoomItem>) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const addAmenity = useCallback((item: AmenityItem) => {
    setAmenities((prev) => [...prev, item]);
  }, []);

  const updateExperience = useCallback((id: string, patch: Partial<ExperienceItem>) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const updateDining = useCallback((patch: Partial<DiningConfig>) => {
    setDining((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateOffer = useCallback((id: string, patch: Partial<OfferItem>) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }, []);

  const addOffer = useCallback((item: OfferItem) => {
    setOffers((prev) => [...prev, item]);
  }, []);

  const resetAllEditableData = useCallback(() => {
    setRooms(initialRoomsData);
    setAmenities(initialAmenitiesData);
    setExperiences(initialExperienceData);
    setDining(initialDiningData);
    setOffers(initialOffersData);
    localStorage.removeItem('mls_rooms_v1');
    localStorage.removeItem('mls_amenities_v1');
    localStorage.removeItem('mls_experiences_v1');
    localStorage.removeItem('mls_dining_v1');
    localStorage.removeItem('mls_offers_v1');
  }, []);

  const openLightbox = useCallback(
    (
      index: number,
      items?: { src: string; alt: string; title: string; description?: string }[]
    ) => {
      setLightbox({
        isOpen: true,
        index,
        items: items && items.length > 0 ? items : initialGalleryData,
      });
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const nextLightbox = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.items.length,
    }));
  }, []);

  const prevLightbox = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.items.length) % prev.items.length,
    }));
  }, []);

  return (
    <HotelDataContext.Provider
      value={{
        currentPath,
        navigate,
        bookingSearch,
        updateBookingSearch,
        rooms,
        updateRoom,
        amenities,
        addAmenity,
        experiences,
        updateExperience,
        dining,
        updateDining,
        offers,
        updateOffer,
        addOffer,
        gallery,
        resetAllEditableData,
        isEditorOpen,
        setIsEditorOpen,
        lightbox,
        openLightbox,
        closeLightbox,
        nextLightbox,
        prevLightbox,
      }}
    >
      {children}
    </HotelDataContext.Provider>
  );
};

export function useHotel() {
  const ctx = useContext(HotelDataContext);
  if (!ctx) {
    throw new Error('useHotel must be used inside HotelDataProvider');
  }
  return ctx;
}
