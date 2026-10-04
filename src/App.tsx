/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HotelDataProvider, useHotel } from './context/HotelDataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Lightbox } from './components/Lightbox';
import { ContentEditorModal } from './components/ContentEditorModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { DiningPage } from './pages/DiningPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookPage } from './pages/BookPage';
import { OffersPage } from './pages/OffersPage';

const MainRouter: React.FC = () => {
  const { currentPath } = useHotel();

  let pageContent: React.ReactNode;
  if (currentPath === '/' || currentPath === '') {
    pageContent = <HomePage />;
  } else if (currentPath === '/rooms') {
    pageContent = <RoomsPage />;
  } else if (currentPath.startsWith('/rooms/')) {
    const roomId = currentPath.replace('/rooms/', '').split('/')[0];
    pageContent = <RoomDetailPage roomId={roomId} />;
  } else if (currentPath === '/experience') {
    pageContent = <ExperiencePage />;
  } else if (currentPath === '/dining') {
    pageContent = <DiningPage />;
  } else if (currentPath === '/gallery') {
    pageContent = <GalleryPage />;
  } else if (currentPath === '/about') {
    pageContent = <AboutPage />;
  } else if (currentPath === '/contact') {
    pageContent = <ContactPage />;
  } else if (currentPath === '/book') {
    pageContent = <BookPage />;
  } else if (currentPath === '/offers') {
    pageContent = <OffersPage />;
  } else {
    pageContent = <HomePage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F2] text-[#1B2618]">
      <Header />
      <main className="flex-1" id="main-content">
        {pageContent}
      </main>
      <Footer />
      <WhatsAppButton />
      <Lightbox />
      <ContentEditorModal />
    </div>
  );
};

export default function App() {
  return (
    <HotelDataProvider>
      <MainRouter />
    </HotelDataProvider>
  );
}
