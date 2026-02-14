'use client';

import { useEffect, useState } from 'react';
import { TradingChart } from './components/TradingChart';
import { CombinedSignalAlerts } from './components/CombinedSignalAlerts';
import { SettingsPanel } from './components/SettingsPanel';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { useBTCStore } from './lib/store';
import { useBTCPriceStream, fetchHistoricalCandles } from './hooks/useBTCPrice';
import { UCSIndicator } from './lib/ucs-indicator';
import { calculateCamarillaPivots, getDailyCandle, getWeeklyCandle, getMonthlyCandle } from './lib/camarilla';
import { sendDiscordAlert } from './lib/discord';
import { Alert } from './types';

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
        const historical = await fetchHistoricalCandles(1000); // Will fetch 48 hours
        if (historical.length > 0) {
          setCandles(historical);
          
          // Calculate initial pivots (daily, weekly, monthly)
          const dailyCandle = getDailyCandle(historical);
          const weeklyCandle = getWeeklyCandle(historical);
          const monthlyCandle = getMonthlyCandle(historical);
          
          if (dailyCandle) {
            const initialPivots = calculateCamarillaPivots(
              dailyCandle,
              weeklyCandle || undefined,
              monthlyCandle || undefined
            );
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

  // Run indicator ONCE on initial load only
  const [signalsCalculated, setSignalsCalculated] = useState(false);

  useEffect(() => {
    if (candles.length < 32 || signalsCalculated) return; // Skip if already calculated

    console.log('Calculating UCS signals for', candles.length, 'candles...');
    
    const { signals } = indicatorEngine.calculate(candles, {
      highProb: config.enableHighProb,
      midProb: config.enableMidProb,
      lowProb: config.enableLowProb,
    });

    console.log('Found', signals.length, 'signals');

    // Add all signals at once
    signals.forEach(signal => {
      const isDuplicate = activeSignals.some(
        s => s.time === signal.time && s.type === signal.type
      );

      if (!isDuplicate && signal.confidence >= config.alertThreshold) {
        addSignal(signal);

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

        // Send Discord notification only for new real-time signals
        if (signal.time > Date.now() - 60000 && config.discordWebhook) {
          sendDiscordAlert(config.discordWebhook, alert);
        }
      }
    });

    setSignalsCalculated(true);
  }, [candles.length >= 32]); // Only run when we have enough candles

  // Recalculate pivots only once per day (check every minute, but only update if day changed)
  useEffect(() => {
    if (candles.length === 0) return;

    const checkAndUpdatePivots = () => {
      const dailyCandle = getDailyCandle(candles);
      const weeklyCandle = getWeeklyCandle(candles);
      const monthlyCandle = getMonthlyCandle(candles);
      
      if (dailyCandle) {
        const newPivots = calculateCamarillaPivots(
          dailyCandle,
          weeklyCandle || undefined,
          monthlyCandle || undefined
        );
        
        // Only update if pivots actually changed (different day)
        if (JSON.stringify(newPivots) !== JSON.stringify(pivots)) {
          console.log('Pivots updated for new day/week/month');
          setPivots(newPivots);
        }
      }
    };

    checkAndUpdatePivots();
  }, [candles, pivots, setPivots]);

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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-[1920px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              BTC Reversal Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              UCS Extreme Snap Back • Real-time 1-min candles • Camarilla Pivots
            </p>
          </div>
          
          {/* Live Status */}
          <div className="flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-xl border border-gray-700">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Live</span>
          </div>
        </div>

        {/* Main Layout: Chart (Left) | Panels (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Trading Chart */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <TradingChart
              candles={candles}
              signals={activeSignals}
              pivots={pivots}
              currentPrice={currentPrice}
            />
          </div>

          {/* Right Side: Panels */}
          <div className="space-y-6">
            {/* Combined Signal + Alerts */}
            <CombinedSignalAlerts
              latestSignal={latestSignal}
              currentPrice={currentPrice}
              alerts={alerts}
            />

            {/* Performance Metrics */}
            <PerformanceMetrics alerts={alerts} />

            {/* Settings */}
            <SettingsPanel />
          </div>
        </div>

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
  );
}