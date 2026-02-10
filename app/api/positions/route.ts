import { NextResponse } from 'next/server';
import { PolymarketAPI } from '@/lib/polymarket';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address required' },
      { status: 400 }
    );
  }

  try {
    const positions = await PolymarketAPI.getPositions(address);
    return NextResponse.json(positions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
}
