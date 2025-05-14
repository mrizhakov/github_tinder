type SwipeStore = {
  [key: string]: {
    likes: Set<string>;
    dislikes: Set<string>;
  };
};

// In-memory store
const store: SwipeStore = new Map() as any;

export function recordSwipe(user: string, target: string, direction: 'like' | 'dislike'): boolean {
  // Initialize user data if it doesn't exist
  if (!store[user]) {
    store[user] = {
      likes: new Set(),
      dislikes: new Set(),
    };
  }

  // Record the swipe
  if (direction === 'like') {
    store[user].likes.add(target);
    store[user].dislikes.delete(target);
  } else {
    store[user].dislikes.add(target);
    store[user].likes.delete(target);
  }

  // Check for mutual like
  return direction === 'like' && 
    store[target]?.likes.has(user);
}

export function getMatches(user: string): string[] {
  if (!store[user]) return [];

  // Find all users who have liked the current user
  // and whom the current user has liked back
  return Array.from(store[user].likes)
    .filter(target => store[target]?.likes.has(user));
}

export function getUserSwipes(user: string) {
  return store[user] || { likes: new Set(), dislikes: new Set() };
}

// For debugging/testing
export function clearStore() {
  Object.keys(store).forEach(key => delete store[key]);
} 