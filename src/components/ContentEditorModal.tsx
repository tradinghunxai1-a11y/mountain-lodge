import React, { useState } from 'react';
import { X, RotateCcw, Plus, Check } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';

export const ContentEditorModal: React.FC = () => {
  const {
    isEditorOpen,
    setIsEditorOpen,
    rooms,
    updateRoom,
    dining,
    updateDining,
    offers,
    updateOffer,
    addOffer,
    resetAllEditableData,
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'rooms' | 'dining' | 'offers'>('rooms');
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferRate, setNewOfferRate] = useState('');
  const [newOfferDesc, setNewOfferDesc] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isEditorOpen) return null;

  const triggerSaved = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Editable Hotel Data Structure Manager"
    >
      <div className="bg-[#F6F7F2] rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-[#DCE2D5] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E2E6DC] flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1B2618]">
              Hotel Data Structure Editor
            </h2>
            <p className="text-xs text-[#5A6755]">
              No unverified prices, menus, or offers were invented. Enter official hotel details
              below to display them live.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="w-10 h-10 rounded-xl hover:bg-[#ECEFE6] flex items-center justify-center text-[#1B2618] cursor-pointer"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 bg-white border-b border-[#E2E6DC] flex items-center gap-2">
          {(['rooms', 'dining', 'offers'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold capitalize border-b-2 transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'border-[#3D6135] text-[#1B2618]'
                  : 'border-transparent text-[#5A6755] hover:text-[#1B2618]'
              }`}
            >
              {tab === 'rooms'
                ? 'Room Rates & Specs'
                : tab === 'dining'
                  ? 'Dining Hours & Menu'
                  : 'Seasonal Offers'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'rooms' && (
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl p-4 border border-[#E2E6DC] space-y-3"
                >
                  <div className="font-display text-xl font-semibold text-[#1B2618]">
                    {room.name}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#5A6755] mb-1">
                        Official Price / Night
                      </label>
                      <input
                        type="text"
                        value={room.pricePerNight || ''}
                        onChange={(e) => {
                          updateRoom(room.id, {
                            pricePerNight: e.target.value.trim() ? e.target.value : null,
                          });
                          triggerSaved();
                        }}
                        placeholder="e.g. PKR 28,000 / night"
                        className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs text-[#1B2618]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A6755] mb-1">
                        Occupancy Capacity
                      </label>
                      <input
                        type="text"
                        value={room.occupancy || ''}
                        onChange={(e) => {
                          updateRoom(room.id, {
                            occupancy: e.target.value.trim() ? e.target.value : null,
                          });
                          triggerSaved();
                        }}
                        placeholder="e.g. Up to 2 Adults"
                        className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs text-[#1B2618]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A6755] mb-1">
                        Room Size
                      </label>
                      <input
                        type="text"
                        value={room.roomSize || ''}
                        onChange={(e) => {
                          updateRoom(room.id, {
                            roomSize: e.target.value.trim() ? e.target.value : null,
                          });
                          triggerSaved();
                        }}
                        placeholder="e.g. 420 sq ft"
                        className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs text-[#1B2618]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dining' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-[#E2E6DC] space-y-3">
                <label className="block text-xs font-semibold text-[#1B2618]">
                  Official Dining Service Hours
                </label>
                <input
                  type="text"
                  value={dining.openingHours || ''}
                  onChange={(e) => {
                    updateDining({
                      openingHours: e.target.value.trim() ? e.target.value : null,
                    });
                    triggerSaved();
                  }}
                  placeholder="e.g. 7:30 AM – 10:30 PM Daily"
                  className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs text-[#1B2618]"
                />
              </div>

              <div className="bg-white rounded-xl p-4 border border-[#E2E6DC] space-y-3">
                <div className="text-xs font-semibold text-[#1B2618]">Add Verified Menu Item</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={newMenuName}
                    onChange={(e) => setNewMenuName(e.target.value)}
                    placeholder="Dish name"
                    className="px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                  />
                  <input
                    type="text"
                    value={newMenuDesc}
                    onChange={(e) => setNewMenuDesc(e.target.value)}
                    placeholder="Short description"
                    className="px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                  />
                  <input
                    type="text"
                    value={newMenuPrice}
                    onChange={(e) => setNewMenuPrice(e.target.value)}
                    placeholder="Price (e.g. PKR 1,800)"
                    className="px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newMenuName.trim()) return;
                    updateDining({
                      menuItems: [
                        ...dining.menuItems,
                        {
                          name: newMenuName.trim(),
                          description: newMenuDesc.trim(),
                          price: newMenuPrice.trim() || 'Inquire',
                        },
                      ],
                    });
                    setNewMenuName('');
                    setNewMenuDesc('');
                    setNewMenuPrice('');
                    triggerSaved();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#3D6135] text-white text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Menu Item</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl p-4 border border-[#E2E6DC] space-y-3"
                >
                  <div className="font-display text-lg font-semibold text-[#1B2618]">
                    {offer.title}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#5A6755] mb-1">
                        Package Title
                      </label>
                      <input
                        type="text"
                        value={offer.title}
                        onChange={(e) => {
                          updateOffer(offer.id, { title: e.target.value, isConfigured: true });
                          triggerSaved();
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A6755] mb-1">
                        Official Rate or Offer Label
                      </label>
                      <input
                        type="text"
                        value={offer.rateOrDiscount || ''}
                        onChange={(e) => {
                          updateOffer(offer.id, {
                            rateOrDiscount: e.target.value.trim() ? e.target.value : null,
                            isConfigured: true,
                          });
                          triggerSaved();
                        }}
                        placeholder="e.g. Autumn Skardu Package"
                        className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-xl p-4 border border-[#E2E6DC] space-y-3">
                <div className="text-xs font-semibold text-[#1B2618]">
                  Publish New Official Offer
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={newOfferTitle}
                    onChange={(e) => setNewOfferTitle(e.target.value)}
                    placeholder="Offer title"
                    className="px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                  />
                  <input
                    type="text"
                    value={newOfferRate}
                    onChange={(e) => setNewOfferRate(e.target.value)}
                    placeholder="Official rate / terms"
                    className="px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                  />
                </div>
                <textarea
                  rows={2}
                  value={newOfferDesc}
                  onChange={(e) => setNewOfferDesc(e.target.value)}
                  placeholder="Offer details..."
                  className="w-full px-3 py-2 rounded-lg border border-[#D5DDD0] text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newOfferTitle.trim()) return;
                    addOffer({
                      id: `offer-${Date.now()}`,
                      title: newOfferTitle.trim(),
                      subtitle: 'Official Mountain Lodge Skardu Offer',
                      description:
                        newOfferDesc.trim() ||
                        'Contact Mountain Lodge Skardu directly to reserve this package.',
                      validityNote: 'Check-in: 2:00 PM · Check-out: 12:00 PM',
                      rateOrDiscount: newOfferRate.trim() || null,
                      inclusions: ['Direct booking with Mountain Lodge Skardu (+92 300 9091494)'],
                      isConfigured: true,
                    });
                    setNewOfferTitle('');
                    setNewOfferRate('');
                    setNewOfferDesc('');
                    triggerSaved();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#3D6135] text-white text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Official Offer</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E2E6DC] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              resetAllEditableData();
              triggerSaved();
            }}
            className="text-xs font-medium text-[#687563] hover:text-red-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Verified Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="text-xs font-medium text-[#3D6135] inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Saved</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsEditorOpen(false)}
              className="px-5 py-2 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
