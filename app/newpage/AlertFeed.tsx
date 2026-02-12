'use client';

import { Alert } from '../types';

interface AlertFeedProps {
  alerts: Alert[];
}

export function AlertFeed({ alerts }: AlertFeedProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Alerts</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm">No alerts yet</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">
        Recent Alerts <span className="text-gray-500 text-sm">({alerts.length})</span>
      </h3>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {alerts.map((alert) => {
          const isWin = alert.outcome === 'win';
          const isLoss = alert.outcome === 'loss';
          const isPending = alert.outcome === 'pending' || !alert.outcome;

          const directionColor = alert.direction === 'up' ? 'text-green-400' : 'text-red-400';
          const directionBg = alert.direction === 'up' ? 'bg-green-500/10' : 'bg-red-500/10';
          const directionIcon = alert.direction === 'up' ? '↗' : '↘';

          const outcomeColor = isWin ? 'text-green-400' : isLoss ? 'text-red-400' : 'text-gray-400';
          const outcomeLabel = isWin ? '✓ Win' : isLoss ? '✗ Loss' : '⋯ Pending';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${directionBg} border-gray-700 hover:border-gray-600 transition-colors`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xl ${directionColor}`}>{directionIcon}</span>
                  <span className={`font-semibold ${directionColor} uppercase`}>
                    {alert.direction}
                  </span>
                  <span className="text-xs text-gray-500">
                    {alert.probability.toUpperCase()}
                  </span>
                </div>
                <span className={`text-xs font-medium ${outcomeColor}`}>
                  {outcomeLabel}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="font-mono text-white">${alert.price.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Confidence</div>
                  <div className="font-semibold text-white">{alert.confidence}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Time</div>
                  <div className="text-gray-400">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {alert.exitPrice && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-500">Exit Price</div>
                  <div className="font-mono text-sm text-gray-300">
                    ${alert.exitPrice.toFixed(2)}
                    <span className={`ml-2 ${
                      (alert.direction === 'up' && alert.exitPrice > alert.price) ||
                      (alert.direction === 'down' && alert.exitPrice < alert.price)
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {alert.direction === 'up' 
                        ? (alert.exitPrice - alert.price >= 0 ? '+' : '')
                        : (alert.price - alert.exitPrice >= 0 ? '+' : '')
                      }
                      {Math.abs(
                        alert.direction === 'up' 
                          ? alert.exitPrice - alert.price
                          : alert.price - alert.exitPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
