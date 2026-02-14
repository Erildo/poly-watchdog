// Camarilla Pivot Points Calculator
// Converted from Pine Script v4

import { Candle, CamarillaPivots } from '../types';

export interface CamarillaPivotsExtended extends CamarillaPivots {
  h5: number;
  l5: number;
  center: number;
  // Weekly pivots
  weeklyCenter?: number;
  weekly_h3?: number;
  weekly_l3?: number;
  // Monthly pivots
  monthlyCenter?: number;
  monthly_h3?: number;
  monthly_l3?: number;
  monthly_h4?: number;
  monthly_l4?: number;
}

export function calculateCamarillaPivots(
  dailyCandle: Candle,
  weeklyCandle?: Candle,
  monthlyCandle?: Candle
): CamarillaPivotsExtended {
  const { high: shigh, low: slow, close: sclose, open: sopen } = dailyCandle;
  
  // Calculate range
  const r = shigh - slow;

  // Daily Camarilla Pivots (using previous day's data)
  const center = sclose;
  const h1 = sclose + r * (1.1 / 12);
  const h2 = sclose + r * (1.1 / 6);
  const h3 = sclose + r * (1.1 / 4);
  const h4 = sclose + r * (1.1 / 2);
  const h5 = (shigh / slow) * sclose;
  
  const l1 = sclose - r * (1.1 / 12);
  const l2 = sclose - r * (1.1 / 6);
  const l3 = sclose - r * (1.1 / 4);
  const l4 = sclose - r * (1.1 / 2);
  const l5 = sclose - (h5 - sclose);

  const pivots: CamarillaPivotsExtended = {
    r4: Number(h4.toFixed(2)),
    r3: Number(h3.toFixed(2)),
    r2: Number(h2.toFixed(2)),
    r1: Number(h1.toFixed(2)),
    pp: Number(center.toFixed(2)),
    s1: Number(l1.toFixed(2)),
    s2: Number(l2.toFixed(2)),
    s3: Number(l3.toFixed(2)),
    s4: Number(l4.toFixed(2)),
    h5: Number(h5.toFixed(2)),
    l5: Number(l5.toFixed(2)),
    center: Number(center.toFixed(2)),
  };

  // Weekly pivots (if provided)
  if (weeklyCandle) {
    const { high: wh, low: wl, close: wc } = weeklyCandle;
    const r1 = wh - wl;
    pivots.weeklyCenter = Number(wc.toFixed(2));
    pivots.weekly_h3 = Number((wc + r1 * (1.1 / 4)).toFixed(2));
    pivots.weekly_l3 = Number((wc - r1 * (1.1 / 4)).toFixed(2));
  }

  // Monthly pivots (if provided)
  if (monthlyCandle) {
    const { high: mh, low: ml, close: mc } = monthlyCandle;
    const Mr1 = mh - ml;
    pivots.monthlyCenter = Number(mc.toFixed(2));
    pivots.monthly_h3 = Number((mc + Mr1 * (1.1 / 4)).toFixed(2));
    pivots.monthly_l3 = Number((mc - Mr1 * (1.1 / 4)).toFixed(2));
    pivots.monthly_h4 = Number((mc + Mr1 * (1.1 / 2)).toFixed(2));
    pivots.monthly_l4 = Number((mc - Mr1 * (1.1 / 2)).toFixed(2));
  }

  return pivots;
}

// Get daily candle from 1-minute candles (previous day's data)
export function getDailyCandle(candles: Candle[]): Candle | null {
  if (candles.length === 0) return null;

  const now = new Date();
  
  // Get yesterday's date in UTC (00:00:00 to 23:59:59 UTC)
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    0, 0, 0, 0
  ));
  
  const yesterdayEnd = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    23, 59, 59, 999
  ));

  const yesterdayStartTime = yesterday.getTime();
  const yesterdayEndTime = yesterdayEnd.getTime();

  // Filter candles from yesterday (00:00 to 23:59 UTC)
  const yesterdayCandles = candles.filter(
    c => c.time >= yesterdayStartTime && c.time <= yesterdayEndTime
  );

  if (yesterdayCandles.length === 0) {
    console.log('No candles found for yesterday UTC, using fallback');
    // Fallback: use last complete 1440 candles (24 hours)
    const last24h = candles.slice(-2880, -1440);
    if (last24h.length === 0) return null;

    const high = Math.max(...last24h.map(c => c.high));
    const low = Math.min(...last24h.map(c => c.low));
    const close = last24h[last24h.length - 1].close;
    const open = last24h[0].open;

    return { time: last24h[last24h.length - 1].time, open, high, low, close };
  }

  const high = Math.max(...yesterdayCandles.map(c => c.high));
  const low = Math.min(...yesterdayCandles.map(c => c.low));
  const close = yesterdayCandles[yesterdayCandles.length - 1].close;
  const open = yesterdayCandles[0].open;

  console.log('Daily Candle (UTC Yesterday):', { open, high, low, close, candleCount: yesterdayCandles.length });

  return {
    time: yesterdayCandles[yesterdayCandles.length - 1].time,
    open,
    high,
    low,
    close
  };
}

// Get weekly candle (previous week's data)
export function getWeeklyCandle(candles: Candle[]): Candle | null {
  if (candles.length === 0) return null;

  const now = new Date();
  
  // Get last week's Monday 00:00:00
  const lastWeekMonday = new Date(now);
  const dayOfWeek = now.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 13 : (dayOfWeek + 6); // If Sunday, go back 13 days, else current day + 6
  lastWeekMonday.setDate(now.getDate() - daysToSubtract);
  lastWeekMonday.setHours(0, 0, 0, 0);
  
  // Get last week's Sunday 23:59:59
  const lastWeekSunday = new Date(lastWeekMonday);
  lastWeekSunday.setDate(lastWeekMonday.getDate() + 6);
  lastWeekSunday.setHours(23, 59, 59, 999);

  const weekStartTime = lastWeekMonday.getTime();
  const weekEndTime = lastWeekSunday.getTime();

  const weekCandles = candles.filter(
    c => c.time >= weekStartTime && c.time <= weekEndTime
  );

  if (weekCandles.length === 0) {
    console.log('No candles found for last week');
    return null;
  }

  const high = Math.max(...weekCandles.map(c => c.high));
  const low = Math.min(...weekCandles.map(c => c.low));
  const close = weekCandles[weekCandles.length - 1].close;
  const open = weekCandles[0].open;

  return {
    time: weekCandles[weekCandles.length - 1].time,
    open,
    high,
    low,
    close
  };
}

// Get monthly candle (previous month's data)
export function getMonthlyCandle(candles: Candle[]): Candle | null {
  if (candles.length === 0) return null;

  const now = new Date();
  
  // Get previous month (1st day at 00:00:00 to last day at 23:59:59)
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const monthStartTime = lastMonth.getTime();
  const monthEndTime = lastMonthEnd.getTime();

  const monthCandles = candles.filter(c => {
    return c.time >= monthStartTime && c.time <= monthEndTime;
  });

  if (monthCandles.length === 0) {
    console.log('No candles found for last month');
    return null;
  }

  const high = Math.max(...monthCandles.map(c => c.high));
  const low = Math.min(...monthCandles.map(c => c.low));
  const close = monthCandles[monthCandles.length - 1].close;
  const open = monthCandles[0].open;

  return {
    time: monthCandles[monthCandles.length - 1].time,
    open,
    high,
    low,
    close
  };
}