import React from 'react';
import { RoomItem } from '../data/hotelData';
import { RoomCard } from './RoomCard';

interface RoomGridProps {
  rooms: RoomItem[];
  columns?: 2 | 3;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms, columns = 3 }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${
        columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
      } gap-6 sm:gap-8`}
    >
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};
