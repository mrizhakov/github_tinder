'use client';

import Image from 'next/image';

interface User {
  login: string;
  avatar_url: string;
  bio?: string;
  name?: string;
  public_repos?: number;
  followers?: number;
  location?: string;
}

interface CardProps {
  user: User;
}

export default function Card({ user }: CardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl w-[360px] h-[480px] overflow-hidden">
      {/* Profile Image with gradient overlay */}
      <div className="w-full h-full relative">
        <Image
          src={user.avatar_url}
          alt={user.name || user.login}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/90" />
      </div>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-bold">
            {user.name || user.login}
          </h2>
          <span className="text-xl">25</span>
        </div>
        
        {/* Location and GitHub Stats */}
        <div className="flex items-center gap-2 mt-2 text-white/80">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>{user.location}</span>
        </div>

        {/* Bio */}
        <p className="mt-3 text-white/90 line-clamp-2">
          {user.bio || 'GitHub Developer'}
        </p>

        {/* GitHub Stats */}
        <div className="flex items-center gap-4 mt-4 text-sm text-white/70 font-medium">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>{user.followers?.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
            </svg>
            <span>{user.public_repos} repos</span>
          </div>
        </div>
      </div>

      {/* Swipe Indicators */}
      <div className="absolute top-8 left-8 rotate-[-30deg] scale-150 opacity-0 transition-all duration-200 swipe-left-indicator">
        <div className="border-4 border-red-500 text-red-500 px-6 py-2 rounded-lg font-bold text-xl">
          NOPE
        </div>
      </div>
      <div className="absolute top-8 right-8 rotate-[30deg] scale-150 opacity-0 transition-all duration-200 swipe-right-indicator">
        <div className="border-4 border-green-500 text-green-500 px-6 py-2 rounded-lg font-bold text-xl">
          LIKE
        </div>
      </div>
    </div>
  );
} 