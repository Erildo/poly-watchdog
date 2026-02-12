'use client';

import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, ColorType } from 'lightweight-charts';
import { Candle, UCSSignal, CamarillaPivots } from '@/types';

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

  // Update candles
  useEffect(() => {
    if (!candlestickSeriesRef.current || candles.length === 0) return;

    const formattedCandles = candles.map(candle => ({
      time: Math.floor(candle.time / 1000) as any,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    candlestickSeriesRef.current.setData(formattedCandles);
  }, [candles]);

  // Add signal markers
  useEffect(() => {
    if (!candlestickSeriesRef.current || signals.length === 0) return;

    const markers = signals.map(signal => ({
      time: Math.floor(signal.time / 1000) as any,
      position: signal.type === 'buy' ? 'belowBar' : 'aboveBar' as any,
      color: signal.type === 'buy' ? '#22c55e' : '#ef4444',
      shape: signal.type === 'buy' ? 'arrowUp' : 'arrowDown' as any,
      text: signal.type === 'buy' ? 'Buy' : 'Sell',
      size: signal.probability === 'high' ? 2 : signal.probability === 'mid' ? 1.5 : 1,
    }));

    candlestickSeriesRef.current.setMarkers(markers);
  }, [signals]);

  // Add Camarilla pivot lines
  useEffect(() => {
    if (!chartRef.current || !pivots) return;

    const levels = [
      { price: pivots.r4, color: '#f97316', label: 'R4' },
      { price: pivots.r3, color: '#fb923c', label: 'R3' },
      { price: pivots.s3, color: '#fb923c', label: 'S3' },
      { price: pivots.s4, color: '#f97316', label: 'S4' },
      { price: pivots.pp, color: '#ffffff', label: 'PP' },
    ];

    levels.forEach(level => {
      const lineSeries = chartRef.current!.addLineSeries({
        color: level.color,
        lineWidth: 1,
        lineStyle: 2, // Dashed
        priceLineVisible: false,
        lastValueVisible: true,
        title: level.label,
      });

      // Create horizontal line data
      if (candles.length > 0) {
        const lineData = [
          { time: Math.floor(candles[0].time / 1000) as any, value: level.price },
          { time: Math.floor(candles[candles.length - 1].time / 1000) as any, value: level.price },
        ];
        lineSeries.setData(lineData);
      }
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
