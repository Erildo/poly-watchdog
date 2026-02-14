'use client';

import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, ColorType } from 'lightweight-charts';
import { Candle, UCSSignal, CamarillaPivots } from '../types';

interface TradingChartProps {
  candles: Candle[];
  signals: UCSSignal[];
  pivots: CamarillaPivots | null;
  currentPrice: number;
}

export function TradingChart({ candles, signals, pivots, currentPrice }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const pivotLinesRef = useRef<ISeriesApi<'Line'>[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0a0a0a' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#1f1f1f' },
        horzLines: { color: '#1f1f1f' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#2a2e39',
      },
      crosshair: {
        mode: 1,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // Update candles - DISPLAY LAST 3 WEEKS
  useEffect(() => {
    if (!candlestickSeriesRef.current || candles.length === 0) return;

    // CHANGE THIS LINE to adjust chart timeframe:
    // 24 hours: const timeAgo = now - (24 * 60 * 60 * 1000);
    // 3 weeks: const timeAgo = now - (21 * 24 * 60 * 60 * 1000);
    const now = Date.now();
    const timeAgo = now - (21 * 24 * 60 * 60 * 1000); // 3 weeks
    const visibleCandles = candles.filter(c => c.time >= timeAgo);

    // Format and deduplicate candles by timestamp
    const candleMap = new Map<number, any>();
    
    visibleCandles.forEach(candle => {
      const timestamp = Math.floor(candle.time / 1000);
      
      // Only keep the latest candle for each timestamp
      if (!candleMap.has(timestamp) || candle.time > (candleMap.get(timestamp).originalTime || 0)) {
        candleMap.set(timestamp, {
          time: timestamp,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          originalTime: candle.time,
        });
      }
    });

    // Convert to array and sort by time (ascending)
    const formattedCandles = Array.from(candleMap.values())
      .sort((a, b) => a.time - b.time)
      .map(({ originalTime, ...candle }) => candle); // Remove originalTime before setting

    try {
      candlestickSeriesRef.current.setData(formattedCandles);
    } catch (error) {
      console.error('Error setting candle data:', error);
      // If there's still an error, try clearing and re-adding
      candlestickSeriesRef.current.setData([]);
      setTimeout(() => {
        if (candlestickSeriesRef.current) {
          candlestickSeriesRef.current.setData(formattedCandles);
        }
      }, 100);
    }
  }, [candles]);

  // Add signal markers (Buy/Sell labels) - DISPLAY LAST 3 WEEKS
  useEffect(() => {
    if (!candlestickSeriesRef.current || signals.length === 0) return;

    // Filter signals to match visible timeframe (3 weeks)
    const now = Date.now();
    const timeAgo = now - (21 * 24 * 60 * 60 * 1000); // 3 weeks
    const visibleSignals = signals.filter(s => s.time >= timeAgo);

    const markers = visibleSignals.map(signal => ({
      time: Math.floor(signal.time / 1000) as any,
      position: signal.type === 'buy' ? 'belowBar' : 'aboveBar' as any,
      color: signal.type === 'buy' ? '#22c55e' : '#ef4444',
      shape: 'arrowUp' as any, // Use arrowUp for both (will be rotated by position)
      text: signal.type === 'buy' ? 'Buy' : 'Sell',
      size: 1,
    }));

    candlestickSeriesRef.current.setMarkers(markers);
  }, [signals]);

  // Add Camarilla pivot lines
  useEffect(() => {
    if (!chartRef.current || !pivots) return;

    // Remove old pivot lines
    pivotLinesRef.current.forEach(line => {
      try {
        chartRef.current?.removeSeries(line);
      } catch (e) {
        // Line already removed
      }
    });
    pivotLinesRef.current = [];

    // Get visible timeframe for line span
    const now = Date.now();
    const timeAgo = now - (21 * 24 * 60 * 60 * 1000); // 3 weeks
    const visibleCandles = candles.filter(c => c.time >= timeAgo);

    if (visibleCandles.length === 0) return;

    // Daily levels with proper colors
    const levels = [
      // Resistance levels (orange - #e05d29)
      { price: pivots.h5, color: '#e05d29', label: 'H5', lineWidth: 2 },
      { price: pivots.r4, color: '#e05d29', label: 'H4', lineWidth: 2 },
      { price: pivots.r3, color: '#e05d29', label: 'H3', lineWidth: 2 },
      { price: pivots.r2, color: '#e05d29', label: 'H2', lineWidth: 2 },
      { price: pivots.r1, color: '#e05d29', label: 'H1', lineWidth: 2 },
      
      // Center (white - #e4e3e7)
      { price: pivots.center, color: '#e4e3e7', label: 'Center', lineWidth: 2 },
      
      // Support levels (teal - #008080)
      { price: pivots.s1, color: '#008080', label: 'L1', lineWidth: 2 },
      { price: pivots.s2, color: '#008080', label: 'L2', lineWidth: 2 },
      { price: pivots.s3, color: '#008080', label: 'L3', lineWidth: 2 },
      { price: pivots.s4, color: '#008080', label: 'L4', lineWidth: 2 },
      { price: pivots.l5, color: '#008080', label: 'L5', lineWidth: 2 },
    ];

    // Weekly levels (cyan - rgb(64, 215, 235))
    if (pivots.weeklyCenter !== undefined) {
      levels.push(
        { price: pivots.weeklyCenter, color: 'rgb(64, 215, 235)', label: 'WCenter', lineWidth: 1 },
        { price: pivots.weekly_h3!, color: 'rgb(64, 215, 235)', label: 'WH3', lineWidth: 1 },
        { price: pivots.weekly_l3!, color: 'rgb(64, 215, 235)', label: 'WL3', lineWidth: 1 }
      );
    }

    // Monthly levels (light green - #8cfcc4)
    if (pivots.monthlyCenter !== undefined) {
      levels.push(
        { price: pivots.monthlyCenter, color: '#8cfcc4', label: 'MCenter', lineWidth: 1 },
        { price: pivots.monthly_h3!, color: '#8cfcc4', label: 'MH3', lineWidth: 1 },
        { price: pivots.monthly_h4!, color: '#8cfcc4', label: 'MH4', lineWidth: 1 },
        { price: pivots.monthly_l3!, color: '#8cfcc4', label: 'ML3', lineWidth: 1 },
        { price: pivots.monthly_l4!, color: '#8cfcc4', label: 'ML4', lineWidth: 1 }
      );
    }

    levels.forEach(level => {
      const lineSeries = chartRef.current!.addLineSeries({
        color: level.color,
        lineWidth: level.lineWidth,
        lineStyle: 0, // Solid line
        priceLineVisible: true,
        lastValueVisible: true,
        title: level.label,
      });

      // Store reference to remove later
      pivotLinesRef.current.push(lineSeries);

      // Create horizontal line data spanning the visible range (3 weeks)
      const lineData = [
        { time: Math.floor(visibleCandles[0].time / 1000) as any, value: level.price },
        { time: Math.floor(visibleCandles[visibleCandles.length - 1].time / 1000) as any, value: level.price },
      ];
      lineSeries.setData(lineData);
    });
  }, [pivots, candles]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="rounded-lg overflow-hidden border border-gray-800" />
      
      {/* Current Price Overlay */}
      {currentPrice > 0 && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-400">BTC/USDT</div>
          <div className="text-2xl font-bold text-white">${currentPrice.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}