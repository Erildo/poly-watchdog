"use client";

import { Alert } from '../types';

interface PerformanceMetricsProps {
  alerts: Alert[];
}

export function PerformanceMetrics({ alerts }: PerformanceMetricsProps) {
  const totalAlerts = alerts.length;
  const completedAlerts = alerts.filter(a => a.outcome === 'win' || a.outcome === 'loss');
  const wins = alerts.filter(a => a.outcome === 'win').length;
  const losses = alerts.filter(a => a.outcome === 'loss').length;
  const pending = totalAlerts - completedAlerts.length;

  const winRate = completedAlerts.length > 0 
    ? ((wins / completedAlerts.length) * 100).toFixed(1)
    : '0.0';

  // Calculate by probability level
  const highProbAlerts = alerts.filter(a => a.probability === 'high');
  const midProbAlerts = alerts.filter(a => a.probability === 'mid');
  const lowProbAlerts = alerts.filter(a => a.probability === 'low');

  const calculateStats = (alerts: Alert[]) => {
    const completed = alerts.filter(a => a.outcome === 'win' || a.outcome === 'loss');
    const wins = alerts.filter(a => a.outcome === 'win').length;
    return {
      total: alerts.length,
      wins,
      winRate: completed.length > 0 ? ((wins / completed.length) * 100).toFixed(1) : '0.0'
    };
  };

  const highStats = calculateStats(highProbAlerts);
  const midStats = calculateStats(midProbAlerts);
  const lowStats = calculateStats(lowProbAlerts);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Performance Metrics</h3>

      {/* Overall Stats - Compact Grid */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Total</div>
          <div className="text-xl font-bold text-white">{totalAlerts}</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Wins</div>
          <div className="text-xl font-bold text-green-400">{wins}</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Loss</div>
          <div className="text-xl font-bold text-red-400">{losses}</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Rate</div>
          <div className="text-xl font-bold text-blue-400">{winRate}%</div>
        </div>
      </div>

      {/* Win Rate Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Win Rate</span>
          <span className="text-white font-semibold">{winRate}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
            style={{ width: `${Math.min(parseFloat(winRate), 100)}%` }}
          />
        </div>
      </div>

      {/* Stats by Probability Level - Compact */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-400 mb-2">By Probability</div>
        
        {/* High Probability */}
        <div className="flex items-center justify-between bg-gray-800 rounded p-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-400">High</span>
            <span className="text-xs text-gray-500">{highStats.total}</span>
          </div>
          <span className="text-xs font-semibold text-white">{highStats.winRate}%</span>
        </div>

        {/* Mid Probability */}
        <div className="flex items-center justify-between bg-gray-800 rounded p-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs font-medium text-yellow-400">Mid</span>
            <span className="text-xs text-gray-500">{midStats.total}</span>
          </div>
          <span className="text-xs font-semibold text-white">{midStats.winRate}%</span>
        </div>

        {/* Low Probability */}
        <div className="flex items-center justify-between bg-gray-800 rounded p-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-xs font-medium text-orange-400">Low</span>
            <span className="text-xs text-gray-500">{lowStats.total}</span>
          </div>
          <span className="text-xs font-semibold text-white">{lowStats.winRate}%</span>
        </div>
      </div>

      {/* Pending Alerts Notice */}
      {pending > 0 && (
        <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-center">
          <div className="text-xs text-blue-400">
            {pending} pending
          </div>
        </div>
      )}
    </div>
  );
}
