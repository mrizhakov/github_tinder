import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const GITHUB_CLIENT_ID = process.env.GH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GH_CLIENT_SECRET;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/');
  }

  try {
    // Exchange code for access token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    // Set secure HTTP-only cookie with the access token
    cookies().set('gh_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Redirect to home page
    return NextResponse.redirect('/');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect('/?error=auth_failed');
  }
} 