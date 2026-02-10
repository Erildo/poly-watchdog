import { NextResponse } from 'next/server';
import { PolymarketAPI } from '@/lib/polymarket';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const address = searchParams.get('address');

  if (!username && !address) {
    return NextResponse.json(
      { error: 'Username or address required' },
      { status: 400 }
    );
  }

  try {
    const user = username
      ? await PolymarketAPI.getUserByUsername(username)
      : await PolymarketAPI.getUserByAddress(address!);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
