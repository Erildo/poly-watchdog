'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { TradingChart } from './TradingChart';
import { SignalPanel } from './SignalPanel';
import { AlertFeed } from './AlertFeed';
import { SettingsPanel } from './SettingsPanel';
import { PerformanceMetrics } from './PerformanceMetrics';
import { useBTCStore } from './store';
import { useBTCPriceStream, fetchHistoricalCandles } from './useBTCPrice';
import { UCSIndicator } from './ucs-indicator';
import { calculateCamarillaPivots, getDailyCandle } from './camarilla';
import { sendDiscordAlert } from './discord';
import { Alert } from '@/types';

export default function BTCDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [indicatorEngine] = useState(() => new UCSIndicator());

  const {
    candles,
    currentPrice,
    activeSignals,
    pivots,
    alerts,
    config,
    setCandles,
    addSignal,
    setPivots,
    addAlert,
  } = useBTCStore();

  // Initialize WebSocket connection
  useBTCPriceStream();

  // Load historical data on mount
  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const historical = await fetchHistoricalCandles(500);
        if (historical.length > 0) {
          setCandles(historical);
          
          // Calculate initial pivots
          const dailyCandle = getDailyCandle(historical);
          if (dailyCandle) {
            const initialPivots = calculateCamarillaPivots(dailyCandle);
            setPivots(initialPivots);
          }
        }
      } catch (error) {
        console.error('Failed to load historical data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoricalData();
  }, [setCandles, setPivots]);

  // Run indicator on new candles
  useEffect(() => {
    if (candles.length < 32) return; // Need minimum candles for indicator

    const { signals, indicators } = indicatorEngine.calculate(candles, {
      highProb: config.enableHighProb,
      midProb: config.enableMidProb,
      lowProb: config.enableLowProb,
    });

    // Process new signals
    signals.forEach(signal => {
      // Check if signal already exists
      const isDuplicate = activeSignals.some(
        s => s.time === signal.time && s.type === signal.type
      );

      if (!isDuplicate && signal.confidence >= config.alertThreshold) {
        addSignal(signal);

        // Create alert
        const alert: Alert = {
          id: `${signal.time}-${signal.type}`,
          timestamp: signal.time,
          price: signal.price,
          direction: signal.type === 'buy' ? 'up' : 'down',
          confidence: signal.confidence,
          probability: signal.probability,
          outcome: 'pending',
        };

        addAlert(alert);

        // Send Discord notification
        if (config.discordWebhook) {
          sendDiscordAlert(config.discordWebhook, alert);
        }
      }
    });

    // Update pivots daily
    const dailyCandle = getDailyCandle(candles);
    if (dailyCandle) {
      const newPivots = calculateCamarillaPivots(dailyCandle);
      if (JSON.stringify(newPivots) !== JSON.stringify(pivots)) {
        setPivots(newPivots);
      }
    }
  }, [candles, config, activeSignals, pivots, addSignal, addAlert, setPivots, indicatorEngine]);

  const latestSignal = activeSignals.length > 0 
    ? activeSignals[activeSignals.length - 1] 
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-gray-400">Loading BTC Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="p-6">
        <div className="max-w-[1800px] mx-auto space-y-6">
          {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              BTC Reversal Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Turtle SnapBack
            </p>
          </div>
          
          {/* Live Status */}
          <div className="flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-xl border border-gray-700">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Live</span>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          <TradingChart
            candles={candles}
            signals={activeSignals}
            pivots={pivots}
            currentPrice={currentPrice}
          />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Signal Panel */}
          <SignalPanel latestSignal={latestSignal} currentPrice={currentPrice} />
          
          {/* Alert Feed */}
          <AlertFeed alerts={alerts} />
          
          {/* Settings */}
          <SettingsPanel />
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics alerts={alerts} />

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
          <p>
            Powered by Binance WebSocket • UCS Extreme Snap Back Indicator • Camarilla Pivot Points
          </p>
          <p className="mt-1 text-xs">
            Trading involves risk. Always do your own research.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
