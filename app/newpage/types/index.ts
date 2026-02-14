// BTC Dashboard Types

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface UCSSignal {
  time: number;
  price: number;
  type: 'buy' | 'sell';
  probability: 'high' | 'mid' | 'low';
  confidence: number;
}

export interface CamarillaPivots {
  r4: number;
  r3: number;
  r2: number;
  r1: number;
  pp: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
}

export interface Alert {
  id: string;
  timestamp: number;
  price: number;
  direction: 'up' | 'down';
  confidence: number;
  probability: 'high' | 'mid' | 'low';
  outcome?: 'win' | 'loss' | 'pending';
  exitPrice?: number;
}

export interface IndicatorData {
  ma1: number;
  ma2: number;
  ma3: number;
  ma4: number;
  up1: number;
  up2: number;
  up3: number;
  dn1: number;
  dn2: number;
  dn3: number;
}

export interface DashboardConfig {
  discordWebhook: string;
  enableHighProb: boolean;
  enableMidProb: boolean;
  enableLowProb: boolean;
  alertThreshold: number;
  timeframe: '1m' | '15m' | '45m';
}