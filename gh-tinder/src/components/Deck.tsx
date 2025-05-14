'use client';

import { useState, useCallback, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import Card from './Card';

interface User {
  login: string;
  avatar_url: string;
  bio?: string;
  name?: string;
  public_repos?: number;
  followers?: number;
  location?: string;
}

interface DeckProps {
  users: User[];
  onSwipe: (userId: string, direction: 'left' | 'right') => void;
}

export default function Deck({ users, onSwipe }: DeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = users[currentIndex];
  const cardRef = useRef<any>(null);

  const handleSwipe = useCallback(async (direction: string) => {
    if (!currentUser) return;
    
    await onSwipe(currentUser.login, direction as 'left' | 'right');
    setCurrentIndex(prev => prev + 1);
  }, [currentUser, onSwipe]);

  const swipe = useCallback((direction: 'left' | 'right') => {
    if (cardRef.current) {
      cardRef.current.swipe(direction);
    }
  }, []);

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-[480px] w-[360px] bg-white rounded-2xl shadow-xl p-8">
        <div className="w-24 h-24 mb-6">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-300">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V16" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No More Devs</h3>
        <p className="text-gray-500 text-center">Come back later to find more awesome developers!</p>
      </div>
    );
  }

  return (
    <div className="relative w-[360px] h-[480px]">
      <div className="absolute w-full h-full">
        <TinderCard
          ref={cardRef}
          preventSwipe={['up', 'down']}
          onSwipe={handleSwipe}
          className="absolute"
        >
          <Card user={currentUser} />
        </TinderCard>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-[-100px] left-0 right-0 flex justify-center items-center gap-6">
        <button
          onClick={() => swipe('left')}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-500 hover:scale-110 transition-transform duration-200"
        >
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <button
          onClick={() => swipe('right')}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-500 hover:scale-110 transition-transform duration-200"
        >
          <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 