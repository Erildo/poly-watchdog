export interface PolymarketUser {
  id: string;
  username: string;
  address: string;
  profilePicture?: string;
  volume?: number;
  pnl?: number;
}

export interface Market {
  id: string;
  question: string;
  slug: string;
  description?: string;
  icon?: string;
  endDate: string;
  volume: number;
  liquidity: number;
}

export interface Position {
  id: string;
  marketId: string;
  market: Market;
  outcome: 'YES' | 'NO';
  size: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  isOpen: boolean;
  createdAt: string;
  closedAt?: string;
}

export interface Trade {
  id: string;
  marketId: string;
  market: Market;
  outcome: 'YES' | 'NO';
  type: 'BUY' | 'SELL';
  size: number;
  price: number;
  timestamp: string;
  txHash?: string;
}

export interface TrackedTrader {
  id: string;
  username: string;
  address: string;
  addedAt: string;
  notificationsEnabled: boolean;
}

export interface NotificationSettings {
  discordWebhookUrl?: string;
  whatsappEnabled: boolean;
  enableEntryNotifications: boolean;
  enableExitNotifications: boolean;
}
