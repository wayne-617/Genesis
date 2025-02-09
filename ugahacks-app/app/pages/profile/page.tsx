'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1); // Track active tab
  const router = useRouter();

  interface Card {
    title: string;
    image: string;
    desc: string;
  }

  const cards: Card[] = [
    { title: 'Project 1', image: '/logo.png', desc: 'Description for card 1' },
    { title: 'Project 2', image: '/logo.png', desc: 'Description for card 2' },
    { title: 'Card 3', image: '/landscape.png', desc: 'Description for card 3' },
    { title: 'Card 4', image: '/logo.png', desc: 'Description for card 4' },
    { title: 'Card 5', image: '/logo.png', desc: 'Description for card 5' },
    // Add more cards as needed
  ];

  const handleCardClick = (title: string) => {
    router.push(`/project?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-24">Profile</h1>
      <div className="flex flex-row justify-center items-center">
        <div role="tablist" className="tabs tabs-lifted">
          {/* Tab 1 */}
          <button
            className={`tab ${activeTab === 1 ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Pioneered
          </button>
          <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 1 ? '' : 'hidden'}`}>
            {/* Carousel only displays if Tab 1 is active */}
            {activeTab === 1 && (
              <div className="flex justify-center">
                <div className="carousel carousel-center rounded-box w-2/3">
                  {cards.map((card: Card, index: number) => (
                    <div className="carousel-item p-6" key={index}>
                      <Card title={card.title} image={card.image} desc={card.desc} onClick={() => handleCardClick(card.title)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tab 2 */}
          <button
            className={`tab ${activeTab === 2 ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Contributed
          </button>
          <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 2 ? '' : 'hidden'}`}>
            {activeTab === 2 && (
              <div className="flex justify-center">
                <div className="carousel carousel-center rounded-box w-2/3">
                  {cards.map((card: Card, index: number) => (
                    <div className="carousel-item p-6" key={index}>
                      <Card title={card.title} image={card.image} desc={card.desc} onClick={() => handleCardClick(card.title)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
