import { NextResponse } from 'next/server';

const GITHUB_CLIENT_ID = process.env.GH_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL 
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`
  : 'http://localhost:3000/api/callback';

export async function GET() {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user`;
  
  return NextResponse.redirect(authUrl);
} 