'use client';

import { AddTrader } from '@/components/features/AddTrader';
import { TrackedTradersList } from '@/components/features/TrackedTradersList';
import { NotificationSettings } from '@/components/features/NotificationSettings';
import { TraderPositions } from '@/components/features/TraderPositions';
import { useTrackerStore } from '@/lib/store';
import { useTradeMonitor } from '@/lib/useTradeMonitor';
import { TrendingUp } from 'lucide-react';

export default function Home() {
  const trackedTraders = useTrackerStore((state) => state.trackedTraders);
  
  // Monitor for new trades and send notifications
  useTradeMonitor();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Polymarket Tracker</h1>
              <p className="text-sm text-zinc-500">Monitor traders and get notified instantly</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <AddTrader />
            <NotificationSettings />
            <TrackedTradersList />
          </div>

          {/* Right Column - Trader Positions */}
          <div className="lg:col-span-2 space-y-6">
            {trackedTraders.length === 0 ? (
              <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-zinc-700" />
                  <h2 className="text-xl font-semibold mb-2">Start Tracking Traders</h2>
                  <p className="text-zinc-500 mb-6">
                    Add a Polymarket trader by their username or wallet address to monitor their positions and receive notifications on every trade.
                  </p>
                  <div className="space-y-2 text-sm text-zinc-600 text-left bg-zinc-800 rounded-lg p-4">
                    <p>✓ Track active positions and P&L</p>
                    <p>✓ View complete trade history</p>
                    <p>✓ Get Discord notifications on entries/exits</p>
                    <p>✓ Monitor multiple traders simultaneously</p>
                  </div>
                </div>
              </div>
            ) : (
              trackedTraders.map((trader) => (
                <TraderPositions
                  key={trader.id}
                  address={trader.address}
                  username={trader.username}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-zinc-600">
            Built for tracking Polymarket traders • Data updates every 30 seconds
          </p>
        </div>
      </footer>
    </div>
  );
}
