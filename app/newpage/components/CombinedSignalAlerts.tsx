"use client";

import { UCSSignal, Alert } from '../types';

interface CombinedSignalAlertsProps {
  latestSignal: UCSSignal | null;
  currentPrice: number;
  alerts: Alert[];
}

export function CombinedSignalAlerts({ latestSignal, currentPrice, alerts }: CombinedSignalAlertsProps) {
  const isRecent = latestSignal && Date.now() - latestSignal.time < 5 * 60 * 1000; // 5 minutes
  const priceDiff = latestSignal ? currentPrice - latestSignal.price : 0;
  const priceDiffPercent = latestSignal ? (priceDiff / latestSignal.price) * 100 : 0;

  const signalColor = latestSignal?.type === 'buy' ? 'text-green-400' : 'text-red-400';
  const bgColor = latestSignal?.type === 'buy' 
    ? 'bg-green-500/10 border-green-500/30' 
    : 'bg-red-500/10 border-red-500/30';

  const probabilityColor = latestSignal ? {
    high: 'text-green-400 bg-green-500/20',
    mid: 'text-yellow-400 bg-yellow-500/20',
    low: 'text-orange-400 bg-orange-500/20',
  }[latestSignal.probability] : '';

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Current Signal Section */}
      <div className={`p-6 border-b border-gray-700 ${latestSignal ? bgColor : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Current Signal</h3>
          {isRecent && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full animate-pulse">
              Active
            </span>
          )}
        </div>

        {!latestSignal ? (
          <div className="text-center py-6">
            <div className="text-gray-500 text-sm">No active signals</div>
            <div className="text-xs text-gray-600 mt-2">Waiting for reversal setup...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {/* Direction */}
            <div className="col-span-2">
              <div className="text-xs text-gray-500 mb-1">Direction</div>
              <div className={`text-2xl font-bold ${signalColor} uppercase`}>
                {latestSignal.type === 'buy' ? '↗ Buy' : '↘ Sell'}
              </div>
            </div>

            {/* Confidence */}
            <div className="col-span-2">
              <div className="text-xs text-gray-500 mb-2">Confidence</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${latestSignal.type === 'buy' ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`}
                    style={{ width: `${latestSignal.confidence}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-white">{latestSignal.confidence}%</span>
              </div>
            </div>

            {/* Probability & Price */}
            <div>
              <div className="text-xs text-gray-500 mb-1">Probability</div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${probabilityColor}`}>
                {latestSignal.probability.toUpperCase()}
              </span>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Signal Price</div>
              <div className="text-sm font-mono text-white">${latestSignal.price.toFixed(2)}</div>
            </div>

            {/* Price Movement */}
            {currentPrice > 0 && (
              <div className="col-span-2">
                <div className="text-xs text-gray-500 mb-1">Movement</div>
                <div className={`text-base font-mono ${priceDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(2)} ({priceDiffPercent.toFixed(2)}%)
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Alerts Section */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          Recent Alerts <span className="text-gray-500 text-sm">({alerts.length})</span>
        </h3>
        
        {alerts.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-gray-500 text-sm">No alerts yet</div>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {alerts.slice(0, 5).map((alert) => {
              const isWin = alert.outcome === 'win';
              const isLoss = alert.outcome === 'loss';
              const isPending = alert.outcome === 'pending' || !alert.outcome;

              const directionColor = alert.direction === 'up' ? 'text-green-400' : 'text-red-400';
              const directionBg = alert.direction === 'up' ? 'bg-green-500/5' : 'bg-red-500/5';
              const directionIcon = alert.direction === 'up' ? '↗' : '↘';

              const outcomeColor = isWin ? 'text-green-400' : isLoss ? 'text-red-400' : 'text-gray-400';
              const outcomeLabel = isWin ? '✓' : isLoss ? '✗' : '⋯';

              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${directionBg} border-gray-700 hover:border-gray-600 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg ${directionColor}`}>{directionIcon}</span>
                      <span className={`font-semibold ${directionColor} uppercase text-sm`}>
                        {alert.direction}
                      </span>
                      <span className="text-xs text-gray-500 uppercase">
                        {alert.probability}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${outcomeColor}`}>
                      {outcomeLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">Price</div>
                      <div className="font-mono text-white">${alert.price.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Conf.</div>
                      <div className="font-semibold text-white">{alert.confidence}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Time</div>
                      <div className="text-gray-400">
                        {new Date(alert.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
