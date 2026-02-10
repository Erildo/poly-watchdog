'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTrackerStore } from '@/lib/store';
import type { Trade } from '@/types';

export function useTradeMonitor() {
  const trackedTraders = useTrackerStore((state) => state.trackedTraders);
  const notificationSettings = useTrackerStore((state) => state.notificationSettings);
  const lastTradesRef = useRef<Map<string, string>>(new Map());

  // Monitor each trader's latest trade
  trackedTraders.forEach((trader) => {
    const { data: trades } = useQuery({
      queryKey: ['trades', trader.address],
      queryFn: async () => {
        const res = await fetch(`/api/trades?address=${trader.address}&limit=1`);
        if (!res.ok) return [];
        return res.json() as Promise<Trade[]>;
      },
      enabled: trader.notificationsEnabled,
      refetchInterval: 30 * 1000, // Check every 30 seconds
    });

    useEffect(() => {
      if (!trades || trades.length === 0) return;
      if (!trader.notificationsEnabled) return;
      if (!notificationSettings.discordWebhookUrl) return;

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
    }, [trades, trader, notificationSettings]);
  });
}
