'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';
import type { Position, Trade } from '@/types';

interface Props {
  address: string;
  username: string;
}

export function TraderPositions({ address, username }: Props) {
  const [view, setView] = useState<'positions' | 'trades'>('positions');

  const { data: positions, isLoading: positionsLoading } = useQuery({
    queryKey: ['positions', address],
    queryFn: async () => {
      const res = await fetch(`/api/positions?address=${address}`);
      if (!res.ok) throw new Error('Failed to fetch positions');
      return res.json() as Promise<Position[]>;
    },
  });

  const { data: trades, isLoading: tradesLoading } = useQuery({
    queryKey: ['trades', address],
    queryFn: async () => {
      const res = await fetch(`/api/trades?address=${address}&limit=20`);
      if (!res.ok) throw new Error('Failed to fetch trades');
      return res.json() as Promise<Trade[]>;
    },
  });

  const openPositions = positions?.filter((p) => p.isOpen) || [];
  const totalPnL = openPositions.reduce((sum, p) => sum + p.pnl, 0);

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{username}</h3>
            <p className="text-sm text-zinc-500 font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>

          {openPositions.length > 0 && (
            <div className="text-right">
              <div className="text-xs text-zinc-500">Total P&L</div>
              <div
                className={`text-lg font-semibold ${
                  totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView('positions')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              view === 'positions'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              Positions ({openPositions.length})
            </div>
          </button>

          <button
            onClick={() => setView('trades')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              view === 'trades'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Trades
            </div>
          </button>
        </div>
      </div>

      <div className="divide-y divide-zinc-800">
        {view === 'positions' ? (
          positionsLoading ? (
            <div className="p-8 text-center text-zinc-500">Loading positions...</div>
          ) : openPositions.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">No open positions</div>
          ) : (
            openPositions.map((position) => (
              <div key={position.id} className="p-4 hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{position.market.question}</h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          position.outcome === 'YES'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {position.outcome}
                      </span>
                      <span>Size: ${position.size.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div
                      className={`text-sm font-semibold ${
                        position.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </div>
                    <div className={`text-xs ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {position.pnlPercentage >= 0 ? '+' : ''}
                      {position.pnlPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-600">
                  <span>Avg: {(position.averagePrice * 100).toFixed(1)}¢</span>
                  <span>Current: {(position.currentPrice * 100).toFixed(1)}¢</span>
                  <span>Opened: {new Date(position.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )
        ) : tradesLoading ? (
          <div className="p-8 text-center text-zinc-500">Loading trades...</div>
        ) : !trades || trades.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No recent trades</div>
        ) : (
          trades.map((trade) => (
            <div key={trade.id} className="p-4 hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{trade.market.question}</h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        trade.outcome === 'YES'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {trade.outcome}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        trade.type === 'BUY'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}
                    >
                      {trade.type}
                    </span>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="text-sm font-semibold">${trade.size.toFixed(2)}</div>
                  <div className="text-xs text-zinc-500">{(trade.price * 100).toFixed(1)}¢</div>
                </div>
              </div>

              <div className="text-xs text-zinc-600">
                {new Date(trade.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
