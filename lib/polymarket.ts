import type { PolymarketUser, Position, Trade } from '@/types';

// Polymarket Data API - official endpoints
const DATA_API = 'https://data-api.polymarket.com';
const GAMMA_API = 'https://gamma-api.polymarket.com';

export class PolymarketAPI {
  // Get user by username - try to search via activity first
  static async getUserByUsername(username: string): Promise<PolymarketUser | null> {
    try {
      // For now, we'll just return a basic user object since username search isn't directly supported
      // User should use wallet address instead
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get user by address - this is the primary method
  static async getUserByAddress(address: string): Promise<PolymarketUser | null> {
    try {
      // First, check if we can get positions to verify the address exists
      const response = await fetch(`${DATA_API}/positions?user=${address.toLowerCase()}`);
      
      if (!response.ok) {
        return null;
      }
      
      const positions = await response.json();
      
      // Return a basic user object with the address
      return {
        id: address.toLowerCase(),
        username: `${address.slice(0, 6)}...${address.slice(-4)}`,
        address: address.toLowerCase(),
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get user positions
  static async getPositions(address: string): Promise<Position[]> {
    try {
      const response = await fetch(`${DATA_API}/positions?user=${address.toLowerCase()}`);
      if (!response.ok) return [];
      
      const data = await response.json();
      
      // Transform API response to our Position type
      return data.map((position: any) => ({
        id: position.conditionId || position.asset,
        marketId: position.conditionId,
        market: {
          id: position.conditionId,
          question: position.title || 'Unknown Market',
          slug: position.slug || '',
          endDate: position.end || '',
          volume: 0,
          liquidity: 0,
        },
        outcome: position.outcome || 'Yes',
        size: parseFloat(position.size || '0'),
        averagePrice: parseFloat(position.avgPrice || '0'),
        currentPrice: parseFloat(position.curPrice || position.avgPrice || '0'),
        pnl: parseFloat(position.cashPnl || '0'),
        pnlPercentage: parseFloat(position.percentPnl || '0'),
        isOpen: parseFloat(position.size || '0') > 0 && !position.redeemable,
        createdAt: new Date().toISOString(),
        closedAt: position.redeemable ? new Date().toISOString() : undefined,
      }));
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  // Get user trade history (activity)
  static async getTrades(address: string, limit = 50): Promise<Trade[]> {
    try {
      const response = await fetch(
        `${DATA_API}/activity?user=${address.toLowerCase()}&type=TRADE&limit=${limit}`
      );
      if (!response.ok) return [];
      
      const data = await response.json();
      
      // Transform API response to our Trade type
      return data.map((activity: any) => ({
        id: activity.transactionHash || activity.timestamp,
        marketId: activity.conditionId,
        market: {
          id: activity.conditionId,
          question: activity.title || 'Unknown Market',
          slug: activity.slug || '',
          endDate: activity.end || '',
          volume: 0,
          liquidity: 0,
        },
        outcome: activity.outcome || 'Yes',
        type: activity.side === 'BUY' ? 'BUY' : 'SELL',
        size: parseFloat(activity.size || '0'),
        price: parseFloat(activity.price || '0'),
        timestamp: new Date(activity.timestamp * 1000).toISOString(),
        txHash: activity.transactionHash,
      }));
    } catch (error) {
      console.error('Error fetching trades:', error);
      return [];
    }
  }
}