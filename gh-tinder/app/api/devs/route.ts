import { NextResponse } from 'next/server';

// Sample users data with real GitHub developers
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
  },
  {
    login: 'kentcdodds',
    name: 'Kent C. Dodds',
    avatar_url: 'https://avatars.githubusercontent.com/u/1500684',
    bio: 'Making software development more accessible · Husband, Father, Latter-day Saint',
    public_repos: 500,
    followers: 102000,
    location: 'Utah, USA'
  },
  {
    login: 'cassidoo',
    name: 'Cassidy Williams',
    avatar_url: 'https://avatars.githubusercontent.com/u/1454517',
    bio: 'Director of Developer Experience & Education at PlanetScale',
    public_repos: 200,
    followers: 31000,
    location: 'Chicago, IL'
  },
  {
    login: 'thepracticaldev',
    name: 'Ben Halpern',
    avatar_url: 'https://avatars.githubusercontent.com/u/47935',
    bio: 'Creator of dev.to, software developer, writer',
    public_repos: 300,
    followers: 12000,
    location: 'New York'
  },
  {
    login: 'wesbos',
    name: 'Wes Bos',
    avatar_url: 'https://avatars.githubusercontent.com/u/176013',
    bio: 'Full Stack Developer, Educator',
    public_repos: 150,
    followers: 28000,
    location: 'Hamilton, Canada'
  },
  {
    login: 'addyosmani',
    name: 'Addy Osmani',
    avatar_url: 'https://avatars.githubusercontent.com/u/110953',
    bio: 'Engineering leader working on Chrome at Google',
    public_repos: 320,
    followers: 41000,
    location: 'San Francisco, CA'
  }
];

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  try {
    // Return all users in random order
    const shuffledUsers = shuffleArray(sampleUsers);
    return NextResponse.json({ users: shuffledUsers });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch developers' }, { status: 500 });
  }
} 