"use client";

import { UCSSignal } from '../types';

interface SignalPanelProps {
  latestSignal: UCSSignal | null;
  currentPrice: number;
}

export function SignalPanel({ latestSignal, currentPrice }: SignalPanelProps) {
  if (!latestSignal) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Current Signal</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm">No active signals</div>
          <div className="text-xs text-gray-600 mt-2">Waiting for reversal setup...</div>
        </div>
      </div>
    );
  }

  const isRecent = Date.now() - latestSignal.time < 5 * 60 * 1000; // 5 minutes
  const priceDiff = currentPrice - latestSignal.price;
  const priceDiffPercent = (priceDiff / latestSignal.price) * 100;

  const signalColor = latestSignal.type === 'buy' ? 'text-green-400' : 'text-red-400';
  const bgColor = latestSignal.type === 'buy' 
    ? 'bg-green-500/10 border-green-500/30' 
    : 'bg-red-500/10 border-red-500/30';

  const probabilityColor = {
    high: 'text-green-400 bg-green-500/20',
    mid: 'text-yellow-400 bg-yellow-500/20',
    low: 'text-orange-400 bg-orange-500/20',
  }[latestSignal.probability];

  return (
    <div className={`rounded-xl p-6 border-2 ${bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Latest Signal</h3>
        {isRecent && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full animate-pulse">
            Active
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Direction */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Direction</div>
          <div className={`text-3xl font-bold ${signalColor} uppercase`}>
            {latestSignal.type === 'buy' ? '↗ Buy' : '↘ Sell'}
          </div>
        </div>

        {/* Confidence */}
        <div>
          <div className="text-xs text-gray-500 mb-2">Confidence</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full ${latestSignal.type === 'buy' ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`}
                style={{ width: `${latestSignal.confidence}%` }}
              />
            </div>
            <span className="text-lg font-bold text-white">{latestSignal.confidence}%</span>
          </div>
        </div>

        {/* Probability Level */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Probability</div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${probabilityColor}`}>
            {latestSignal.probability.toUpperCase()}
          </span>
        </div>

        {/* Signal Price */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Signal Price</div>
          <div className="text-xl font-mono text-white">${latestSignal.price.toFixed(2)}</div>
        </div>

        {/* Price Movement */}
        {currentPrice > 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Movement Since Signal</div>
            <div className={`text-lg font-mono ${priceDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(2)} ({priceDiffPercent.toFixed(2)}%)
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Signal Time</div>
          <div className="text-sm text-gray-400">
            {new Date(latestSignal.time).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
