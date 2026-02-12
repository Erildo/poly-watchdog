import { NextResponse } from 'next/server';
import { PolymarketAPI } from '@/lib/polymarket';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Wallet address required' },
      { status: 400 }
    );
  }

  // Validate address format
  if (!address.startsWith('0x') || address.length !== 42) {
    return NextResponse.json(
      { error: 'Invalid Ethereum address format' },
      { status: 400 }
    );
  }

  try {
    const user = await PolymarketAPI.getUserByAddress(address);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or has no Polymarket activity' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}