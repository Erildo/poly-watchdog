import { NextResponse } from 'next/server';
import { PolymarketAPI } from '@/lib/polymarket';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const limit = parseInt(searchParams.get('limit') || '50');

  if (!address) {
    return NextResponse.json(
      { error: 'Address required' },
      { status: 400 }
    );
  }

  try {
    const trades = await PolymarketAPI.getTrades(address, limit);
    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}
