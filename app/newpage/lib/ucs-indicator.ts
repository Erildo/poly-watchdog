// UCS_Extreme Snap Back Indicator (OPTIMIZED)
// Converted from Pine Script v3

import { Candle, UCSSignal, IndicatorData } from '../types';

// Simple Moving Average
function sma(data: number[], period: number): number {
  if (data.length < period) return data[data.length - 1] || 0;
  const slice = data.slice(-period);
  return slice.reduce((sum, val) => sum + val, 0) / period;
}

// True Range
function trueRange(candle: Candle, prevClose: number): number {
  const h_l = candle.high - candle.low;
  const h_pc = Math.abs(candle.high - prevClose);
  const l_pc = Math.abs(candle.low - prevClose);
  return Math.max(h_l, h_pc, l_pc);
}

// OHLC4 calculation
function ohlc4(candle: Candle): number {
  return (candle.open + candle.high + candle.low + candle.close) / 4;
}

export class UCSIndicator {
  private len1 = 7;
  private len2 = 14;
  private len3 = 21;
  private len4 = 32;

  // Cache to avoid recalculating all signals every time
  private lastProcessedTime: number = 0;
  private cachedSignals: UCSSignal[] = [];

  calculate(candles: Candle[], config: {
    highProb: boolean;
    midProb: boolean;
    lowProb: boolean;
  }): { signals: UCSSignal[]; indicators: IndicatorData | null } {
    if (candles.length < this.len4) {
      return { signals: [], indicators: null };
    }

    // Only process NEW candles since last time
    const newCandles = candles.filter(c => c.time > this.lastProcessedTime);
    
    if (newCandles.length > 0) {
      // Process each new candle
      for (let i = 0; i < newCandles.length; i++) {
        const currentCandleTime = newCandles[i].time;
        const currentIndex = candles.findIndex(c => c.time === currentCandleTime);
        
        if (currentIndex < this.len4) continue;
        
        // Get window of last 100 candles for calculation (performance optimization)
        const windowStart = Math.max(0, currentIndex - 99);
        const windowCandles = candles.slice(windowStart, currentIndex + 1);
        
        // Build src and tr arrays
        const srcHistory = windowCandles.map(c => ohlc4(c));
        const trHistory = windowCandles.map((c, idx) => {
          if (idx === 0) return c.high - c.low;
          return trueRange(c, windowCandles[idx - 1].close);
        });

        // Calculate MAs
        const ma1 = sma(srcHistory, this.len1);
        const ma2 = sma(srcHistory, this.len2);

        // Calculate ATR ranges
        const rng1 = sma(trHistory, this.len1);
        const rng2 = sma(trHistory, this.len2);
        const rng3 = sma(trHistory, this.len3);

        // Calculate bands
        const up1 = ma1 + rng1 * 1.6;
        const up2 = ma2 + rng2 * 2.4;
        const up3 = ma2 + rng3 * 3.2;

        const dn1 = ma1 - rng1 * 1.6;
        const dn2 = ma2 - rng2 * 2.4;
        const dn3 = ma2 - rng2 * 3.2;

        const currentCandle = windowCandles[windowCandles.length - 1];
        
        // Check previous candle to avoid consecutive duplicates
        let prevHigh = 0;
        let prevLow = 0;
        
        if (currentIndex > 0) {
          const prevCandle = candles[currentIndex - 1];
          // Simplified check using last calculated values
          const ERhigh3_prev = prevCandle.high > up1 && prevCandle.high > up2 && prevCandle.high > up3 ? 1 : 0;
          const ERlow3_prev = prevCandle.low < dn1 && prevCandle.low < dn2 && prevCandle.low < dn3 ? 1 : 0;
          prevHigh = ERhigh3_prev;
          prevLow = ERlow3_prev;
        }

        // Check current candle conditions
        const ERhigh1 = currentCandle.high > up1 ? 1 : 0;
        const ERlow1 = currentCandle.low < dn1 ? 1 : 0;

        const ERhigh2 = currentCandle.high > up1 && currentCandle.high > up2 ? 1 : 0;
        const ERlow2 = currentCandle.low < dn1 && currentCandle.low < dn2 ? 1 : 0;

        const ERhigh3 = currentCandle.high > up1 && currentCandle.high > up2 && currentCandle.high > up3 ? 1 : 0;
        const ERlow3 = currentCandle.low < dn1 && currentCandle.low < dn2 && currentCandle.low < dn3 ? 1 : 0;

        // Detect signals
        const HiPERh = config.highProb && prevHigh !== 1 && ERhigh3 ? 1 : 0;
        const HiPERl = config.highProb && prevLow !== 1 && ERlow3 ? 1 : 0;

        const MiPERh = config.midProb && HiPERh === 0 && prevHigh !== 1 && ERhigh2 ? 1 : 0;
        const MiPERl = config.midProb && HiPERl === 0 && prevLow !== 1 && ERlow2 ? 1 : 0;

        const LoPERh = config.lowProb && HiPERh === 0 && MiPERh === 0 && prevHigh !== 1 && ERhigh1 ? 1 : 0;
        const LoPERl = config.lowProb && HiPERl === 0 && MiPERl === 0 && prevLow !== 1 && ERlow1 ? 1 : 0;

        // Add signals to cache
        if (HiPERh === 1) {
          this.cachedSignals.push({
            time: currentCandle.time,
            price: currentCandle.high,
            type: 'sell',
            probability: 'high',
            confidence: 95
          });
        }
        if (HiPERl === 1) {
          this.cachedSignals.push({
            time: currentCandle.time,
            price: currentCandle.low,
            type: 'buy',
            probability: 'high',
            confidence: 95
          });
        }
        if (MiPERh === 1) {
          this.cachedSignals.push({
            time: currentCandle.time,
            price: currentCandle.high,
            type: 'sell',
            probability: 'mid',
            confidence: 75
          });
        }
        if (MiPERl === 1) {
          this.cachedSignals.push({
            time: currentCandle.time,
            price: currentCandle.low,
            type: 'buy',
            probability: 'mid',
            confidence: 75
          });
        }
        if (LoPERh === 1) {
          this.cachedSignals.push({
            time: currentCandle.time,
            price: currentCandle.high,
            type: 'sell',
            probability: 'low',
            confidence: 55
          });
        }
        if (LoPERl === 1) {
          this.cachedSignals.push({
            time: currentCandle.time,
            price: currentCandle.low,
            type: 'buy',
            probability: 'low',
            confidence: 55
          });
        }
      }
      
      // Update last processed time
      if (newCandles.length > 0) {
        this.lastProcessedTime = newCandles[newCandles.length - 1].time;
      }
    }

    // Calculate indicator values for display (using last 100 candles for performance)
    const recentCandles = candles.slice(-100);
    const srcHistory = recentCandles.map(c => ohlc4(c));
    const trHistory = recentCandles.map((c, i) => {
      if (i === 0) return c.high - c.low;
      return trueRange(c, recentCandles[i - 1].close);
    });

    const ma1 = sma(srcHistory, this.len1);
    const ma2 = sma(srcHistory, this.len2);
    const ma3 = sma(srcHistory, this.len3);
    const ma4 = sma(srcHistory, this.len4);

    const rng1 = sma(trHistory, this.len1);
    const rng2 = sma(trHistory, this.len2);
    const rng3 = sma(trHistory, this.len3);

    const up1 = ma1 + rng1 * 1.6;
    const up2 = ma2 + rng2 * 2.4;
    const up3 = ma2 + rng3 * 3.2;

    const dn1 = ma1 - rng1 * 1.6;
    const dn2 = ma2 - rng2 * 2.4;
    const dn3 = ma2 - rng2 * 3.2;

    return {
      signals: this.cachedSignals,
      indicators: {
        ma1, ma2, ma3, ma4,
        up1, up2, up3,
        dn1, dn2, dn3
      }
    };
  }
}