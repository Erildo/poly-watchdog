// Camarilla Pivot Points Calculator

import { Candle, CamarillaPivots } from '../types';

export function calculateCamarillaPivots(dailyCandle: Candle): CamarillaPivots {
  const { high, low, close } = dailyCandle;
  const range = high - low;

  // Camarilla Pivot Formula
  const pp = (high + low + close) / 3;

  const r1 = close + range * 1.1 / 12;
  const r2 = close + range * 1.1 / 6;
  const r3 = close + range * 1.1 / 4;
  const r4 = close + range * 1.1 / 2;

  const s1 = close - range * 1.1 / 12;
  const s2 = close - range * 1.1 / 6;
  const s3 = close - range * 1.1 / 4;
  const s4 = close - range * 1.1 / 2;

  return {
    r4: Number(r4.toFixed(2)),
    r3: Number(r3.toFixed(2)),
    r2: Number(r2.toFixed(2)),
    r1: Number(r1.toFixed(2)),
    pp: Number(pp.toFixed(2)),
    s1: Number(s1.toFixed(2)),
    s2: Number(s2.toFixed(2)),
    s3: Number(s3.toFixed(2)),
    s4: Number(s4.toFixed(2)),
  };
}

export function getDailyCandle(candles: Candle[]): Candle | null {
  if (candles.length === 0) return null;

  // Get last 24 hours of 1-minute candles (1440 candles)
  const last24h = candles.slice(-1440);
  if (last24h.length === 0) return null;

  const high = Math.max(...last24h.map(c => c.high));
  const low = Math.min(...last24h.map(c => c.low));
  const close = last24h[last24h.length - 1].close;
  const open = last24h[0].open;

  return {
    time: last24h[last24h.length - 1].time,
    open,
    high,
    low,
    close
  };
}
