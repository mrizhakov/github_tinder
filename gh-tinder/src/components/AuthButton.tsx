'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface AuthButtonProps {
  isAuthenticated?: boolean;
}

export default function AuthButton({ isAuthenticated }: AuthButtonProps) {
  const router = useRouter();

  const handleAuth = useCallback(async () => {
    if (isAuthenticated) {
      // Handle logout
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.refresh();
      }
    } else {
      // Handle login
      window.location.href = '/api/auth';
    }
  }, [isAuthenticated, router]);

  return (
    <button
      onClick={handleAuth}
      className="px-6 py-2 font-semibold text-sm bg-black text-white rounded-full shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
    >
      {isAuthenticated ? 'Logout' : 'Login with GitHub'}
    </button>
  );
} 