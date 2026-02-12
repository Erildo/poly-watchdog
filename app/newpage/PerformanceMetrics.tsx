'use client';

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
      <h3 className="text-lg font-semibold text-gray-300 mb-6">Performance Metrics</h3>

      {/* Overall Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-1">Total Signals</div>
          <div className="text-2xl font-bold text-white">{totalAlerts}</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-1">Wins</div>
          <div className="text-2xl font-bold text-green-400">{wins}</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-1">Losses</div>
          <div className="text-2xl font-bold text-red-400">{losses}</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-1">Win Rate</div>
          <div className="text-2xl font-bold text-blue-400">{winRate}%</div>
        </div>
      </div>

      {/* Win Rate Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Win Rate Progress</span>
          <span className="text-white font-semibold">{winRate}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
            style={{ width: `${Math.min(parseFloat(winRate), 100)}%` }}
          />
        </div>
      </div>

      {/* Stats by Probability Level */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-300 mb-2">By Probability Level</div>
        
        {/* High Probability */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-400">High Probability</span>
            <span className="text-xs text-gray-500">{highStats.total} signals</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {highStats.wins} wins
            </div>
            <div className="text-sm font-semibold text-white">
              {highStats.winRate}% win rate
            </div>
          </div>
        </div>

        {/* Mid Probability */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-yellow-400">Mid Probability</span>
            <span className="text-xs text-gray-500">{midStats.total} signals</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {midStats.wins} wins
            </div>
            <div className="text-sm font-semibold text-white">
              {midStats.winRate}% win rate
            </div>
          </div>
        </div>

        {/* Low Probability */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-400">Low Probability</span>
            <span className="text-xs text-gray-500">{lowStats.total} signals</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              {lowStats.wins} wins
            </div>
            <div className="text-sm font-semibold text-white">
              {lowStats.winRate}% win rate
            </div>
          </div>
        </div>
      </div>

      {/* Pending Alerts Notice */}
      {pending > 0 && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="text-sm text-blue-400">
            {pending} signal{pending > 1 ? 's' : ''} pending outcome
          </div>
        </div>
      )}
    </div>
  );
}
