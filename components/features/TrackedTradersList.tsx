'use client';

import { useTrackerStore } from '@/lib/store';
import { Trash2, Bell, BellOff } from 'lucide-react';

export function TrackedTradersList() {
  const trackedTraders = useTrackerStore((state) => state.trackedTraders);
  const removeTrader = useTrackerStore((state) => state.removeTrader);
  const toggleNotifications = useTrackerStore((state) => state.toggleNotifications);

  if (trackedTraders.length === 0) {
    return (
      <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800 text-center">
        <p className="text-zinc-500">No traders tracked yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold">Tracked Traders ({trackedTraders.length})</h2>
      </div>
      
      <div className="divide-y divide-zinc-800">
        {trackedTraders.map((trader) => (
          <div
            key={trader.id}
            className="p-4 hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{trader.username}</h3>
                <p className="text-sm text-zinc-500 font-mono">
                  {trader.address.slice(0, 6)}...{trader.address.slice(-4)}
                </p>
                <p className="text-xs text-zinc-600 mt-1">
                  Added {new Date(trader.addedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleNotifications(trader.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    trader.notificationsEnabled
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                  title={trader.notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
                >
                  {trader.notificationsEnabled ? (
                    <Bell className="w-4 h-4" />
                  ) : (
                    <BellOff className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => removeTrader(trader.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  title="Remove trader"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
