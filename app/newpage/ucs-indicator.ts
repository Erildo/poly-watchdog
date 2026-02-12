// UCS_Extreme Snap Back Indicator
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

  private srcHistory: number[] = [];
  private trHistory: number[] = [];
  private prevSignals: { high: number; low: number } = { high: 0, low: 0 };

  calculate(candles: Candle[], config: {
    highProb: boolean;
    midProb: boolean;
    lowProb: boolean;
  }): { signals: UCSSignal[]; indicators: IndicatorData | null } {
    if (candles.length < this.len4) {
      return { signals: [], indicators: null };
    }

    // Build src and tr arrays
    this.srcHistory = candles.map(c => ohlc4(c));
    this.trHistory = candles.map((c, i) => {
      if (i === 0) return c.high - c.low;
      return trueRange(c, candles[i - 1].close);
    });

    // Calculate MAs
    const ma1 = sma(this.srcHistory, this.len1);
    const ma2 = sma(this.srcHistory, this.len2);
    const ma3 = sma(this.srcHistory, this.len3);
    const ma4 = sma(this.srcHistory, this.len4);

    // Calculate ATR ranges
    const rng1 = sma(this.trHistory, this.len1);
    const rng2 = sma(this.trHistory, this.len2);
    const rng3 = sma(this.trHistory, this.len3);
    const rng4 = sma(this.trHistory, this.len4);

    // Calculate bands (ATR deviation)
    const up1 = ma1 + rng1 * 1.6;
    const up2 = ma2 + rng2 * 2.4;
    const up3 = ma2 + rng3 * 3.2;

    const dn1 = ma1 - rng1 * 1.6;
    const dn2 = ma2 - rng2 * 2.4;
    const dn3 = ma2 - rng2 * 3.2;

    const currentCandle = candles[candles.length - 1];
    const signals: UCSSignal[] = [];

    // Low Probability Setup
    const ERhigh1 = currentCandle.high > up1 ? 1 : 0;
    const ERlow1 = currentCandle.low < dn1 ? 1 : 0;

    // Medium Probability Setup
    const ERhigh2 = currentCandle.high > up1 && currentCandle.high > up2 ? 1 : 0;
    const ERlow2 = currentCandle.low < dn1 && currentCandle.low < dn2 ? 1 : 0;

    // High Probability Setup
    const ERhigh3 = currentCandle.high > up1 && currentCandle.high > up2 && currentCandle.high > up3 ? 1 : 0;
    const ERlow3 = currentCandle.low < dn1 && currentCandle.low < dn2 && currentCandle.low < dn3 ? 1 : 0;

    // Detect High Probability signals (prevent duplicates)
    const HiPERh = config.highProb && this.prevSignals.high !== 1 && ERhigh3 ? 1 : 0;
    const HiPERl = config.highProb && this.prevSignals.low !== 1 && ERlow3 ? 1 : 0;

    // Detect Mid Probability signals
    const MiPERh = config.midProb && HiPERh === 0 && this.prevSignals.high !== 1 && ERhigh2 ? 1 : 0;
    const MiPERl = config.midProb && HiPERl === 0 && this.prevSignals.low !== 1 && ERlow2 ? 1 : 0;

    // Detect Low Probability signals
    const LoPERh = config.lowProb && HiPERh === 0 && MiPERh === 0 && this.prevSignals.high !== 1 && ERhigh1 ? 1 : 0;
    const LoPERl = config.lowProb && HiPERl === 0 && MiPERl === 0 && this.prevSignals.low !== 1 && ERlow1 ? 1 : 0;

    // Generate signals
    if (HiPERh === 1) {
      signals.push({
        time: currentCandle.time,
        price: currentCandle.high,
        type: 'sell',
        probability: 'high',
        confidence: 95
      });
    }
    if (HiPERl === 1) {
      signals.push({
        time: currentCandle.time,
        price: currentCandle.low,
        type: 'buy',
        probability: 'high',
        confidence: 95
      });
    }
    if (MiPERh === 1) {
      signals.push({
        time: currentCandle.time,
        price: currentCandle.high,
        type: 'sell',
        probability: 'mid',
        confidence: 75
      });
    }
    if (MiPERl === 1) {
      signals.push({
        time: currentCandle.time,
        price: currentCandle.low,
        type: 'buy',
        probability: 'mid',
        confidence: 75
      });
    }
    if (LoPERh === 1) {
      signals.push({
        time: currentCandle.time,
        price: currentCandle.high,
        type: 'sell',
        probability: 'low',
        confidence: 55
      });
    }
    if (LoPERl === 1) {
      signals.push({
        time: currentCandle.time,
        price: currentCandle.low,
        type: 'buy',
        probability: 'low',
        confidence: 55
      });
    }

    // Update previous signals
    this.prevSignals = {
      high: ERhigh3,
      low: ERlow3
    };

    return {
      signals,
      indicators: {
        ma1, ma2, ma3, ma4,
        up1, up2, up3,
        dn1, dn2, dn3
      }
    };
  }
}
