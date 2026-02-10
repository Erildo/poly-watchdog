import type { PolymarketUser, Position, Trade } from '@/types';

const POLYMARKET_API = 'https://clob.polymarket.com';
const GAMMA_API = 'https://gamma-api.polymarket.com';

export class PolymarketAPI {
  // Get user by username
  static async getUserByUsername(username: string): Promise<PolymarketUser | null> {
    try {
      const response = await fetch(`${GAMMA_API}/users?username=${username}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get user by address
  static async getUserByAddress(address: string): Promise<PolymarketUser | null> {
    try {
      const response = await fetch(`${GAMMA_API}/users/${address}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get user positions
  static async getPositions(address: string): Promise<Position[]> {
    try {
      const response = await fetch(`${GAMMA_API}/positions?user=${address}`);
      if (!response.ok) return [];
      
      const data = await response.json();
      
      // Transform API response to our Position type
      return data.map((position: any) => ({
        id: position.id,
        marketId: position.market_id,
        market: {
          id: position.market_id,
          question: position.market?.question || 'Unknown Market',
          slug: position.market?.slug || '',
          endDate: position.market?.end_date || '',
          volume: position.market?.volume || 0,
          liquidity: position.market?.liquidity || 0,
        },
        outcome: position.outcome,
        size: parseFloat(position.size),
        averagePrice: parseFloat(position.avg_price),
        currentPrice: parseFloat(position.current_price || position.avg_price),
        pnl: parseFloat(position.pnl || '0'),
        pnlPercentage: parseFloat(position.pnl_percentage || '0'),
        isOpen: position.is_open,
        createdAt: position.created_at,
        closedAt: position.closed_at,
      }));
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  // Get user trade history
  static async getTrades(address: string, limit = 50): Promise<Trade[]> {
    try {
      const response = await fetch(
        `${GAMMA_API}/trades?user=${address}&limit=${limit}`
      );
      if (!response.ok) return [];
      
      const data = await response.json();
      
      // Transform API response to our Trade type
      return data.map((trade: any) => ({
        id: trade.id,
        marketId: trade.market_id,
        market: {
          id: trade.market_id,
          question: trade.market?.question || 'Unknown Market',
          slug: trade.market?.slug || '',
          endDate: trade.market?.end_date || '',
          volume: trade.market?.volume || 0,
          liquidity: trade.market?.liquidity || 0,
        },
        outcome: trade.outcome,
        type: trade.side === 'BUY' ? 'BUY' : 'SELL',
        size: parseFloat(trade.size),
        price: parseFloat(trade.price),
        timestamp: trade.timestamp,
        txHash: trade.tx_hash,
      }));
    } catch (error) {
      console.error('Error fetching trades:', error);
      return [];
    }
  }
}
