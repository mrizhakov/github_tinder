import { NextResponse } from 'next/server';

// Sample users data
const sampleUsers = [
  {
    login: 'torvalds',
    name: 'Linus Torvalds',
    avatar_url: 'https://avatars.githubusercontent.com/u/1024025',
    bio: 'Creator of Linux and Git',
    public_repos: 10,
    followers: 190000,
    location: 'Portland, OR'
  },
  {
    login: 'gaearon',
    name: 'Dan Abramov',
    avatar_url: 'https://avatars.githubusercontent.com/u/810438',
    bio: 'Co-creator of Redux and Create React App',
    public_repos: 247,
    followers: 78000,
    location: 'London, UK'
  },
  {
    login: 'yyx990803',
    name: 'Evan You',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550',
    bio: 'Creator of Vue.js',
    public_repos: 155,
    followers: 82000,
    location: 'Singapore'
  },
  {
    login: 'sindresorhus',
    name: 'Sindre Sorhus',
    avatar_url: 'https://avatars.githubusercontent.com/u/170270',
    bio: 'Full-time open-source developer',
    public_repos: 1000,
    followers: 73000,
    location: 'Norway'
  },
  {
    login: 'tj',
    name: 'TJ Holowaychuk',
    avatar_url: 'https://avatars.githubusercontent.com/u/25254',
    bio: 'Creator of Express.js',
    public_repos: 250,
    followers: 45000,
    location: 'Canada'
  }
];

// Keep track of current index for rotation
let currentIndex = 0;

export async function GET() {
  try {
    // Get current user
    const user = sampleUsers[currentIndex];
    
    // Rotate to next user for next request
    currentIndex = (currentIndex + 1) % sampleUsers.length;

    return NextResponse.json({ users: [user] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch developers' }, { status: 500 });
  }
} 