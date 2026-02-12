'use client';

import { useEffect, useRef } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useTrackerStore } from '@/lib/store';
import type { Trade } from '@/types';

export function useTradeMonitor() {
  const trackedTraders = useTrackerStore((state) => state.trackedTraders);
  const notificationSettings = useTrackerStore((state) => state.notificationSettings);
  const lastTradesRef = useRef<Map<string, string>>(new Map());

  // Use useQueries to fetch trades for all traders at once
  const tradesQueries = useQueries({
    queries: trackedTraders
      .filter((trader) => trader.notificationsEnabled)
      .map((trader) => ({
        queryKey: ['trades-monitor', trader.address],
        queryFn: async () => {
          const res = await fetch(`/api/trades?address=${trader.address}&limit=1`);
          if (!res.ok) return [];
          return res.json() as Promise<Trade[]>;
        },
        refetchInterval: 30 * 1000, // Check every 30 seconds
        enabled: trader.notificationsEnabled,
      })),
  });

  useEffect(() => {
    if (!notificationSettings.discordWebhookUrl) return;

    // Process each trader's trades
    trackedTraders.forEach((trader, index) => {
      if (!trader.notificationsEnabled) return;

      const queryResult = tradesQueries[trackedTraders.filter(t => t.notificationsEnabled).indexOf(trader)];
      if (!queryResult?.data) return;

      const trades = queryResult.data;
      if (trades.length === 0) return;

      const latestTrade = trades[0];
      const lastTradeId = lastTradesRef.current.get(trader.address);

      // New trade detected
      if (lastTradeId && lastTradeId !== latestTrade.id) {
        const isEntry = latestTrade.type === 'BUY';

        // Check if this notification type is enabled
        const shouldNotify =
          (isEntry && notificationSettings.enableEntryNotifications) ||
          (!isEntry && notificationSettings.enableExitNotifications);

        if (shouldNotify) {
          // Send notification
          fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              webhookUrl: notificationSettings.discordWebhookUrl,
              username: trader.username,
              type: 'trade',
              trade: latestTrade,
            }),
          }).catch(console.error);
        }
      }

      // Update last trade ID
      lastTradesRef.current.set(trader.address, latestTrade.id);
    });
  }, [tradesQueries, trackedTraders, notificationSettings]);
}