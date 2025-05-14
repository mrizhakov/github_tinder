import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetUser, direction } = body;

    if (!targetUser || !direction) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, just return a random match chance
    const isMatch = direction === 'right' && Math.random() < 0.3;

    return NextResponse.json({ isMatch });
  } catch (error) {
    console.error('Error processing swipe:', error);
    return NextResponse.json(
      { error: 'Failed to process swipe' },
      { status: 500 }
    );
  }
} 