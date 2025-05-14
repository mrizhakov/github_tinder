'use client';

import { useEffect, useState, useCallback } from 'react';
import Deck from '@/components/Deck';

interface User {
  login: string;
  avatar_url: string;
  bio?: string;
  name?: string;
  public_repos?: number;
  followers?: number;
  location?: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch developers
  const fetchDevelopers = useCallback(async () => {
    try {
      const response = await fetch('/api/devs');
      if (!response.ok) {
        throw new Error('Failed to fetch developers');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle swipe
  const handleSwipe = useCallback(async (userId: string, direction: 'left' | 'right') => {
    try {
      const response = await fetch('/api/swipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUser: userId,
          direction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to record swipe');
      }

      const data = await response.json();
      if (data.isMatch) {
        alert(`It's a match with ${userId}!`);
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
    }
  }, []);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              DevSwipe
            </span>
          </div>
          
          <nav className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-[480px] w-[360px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <Deck users={users} onSwipe={handleSwipe} />
          )}
        </div>
      </main>
    </div>
  );
} 