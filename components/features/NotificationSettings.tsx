'use client';

import { useState } from 'react';
import { useTrackerStore } from '@/lib/store';
import { Settings, Save, TestTube } from 'lucide-react';

export function NotificationSettings() {
  const notificationSettings = useTrackerStore((state) => state.notificationSettings);
  const updateNotificationSettings = useTrackerStore((state) => state.updateNotificationSettings);
  
  const [webhookUrl, setWebhookUrl] = useState(notificationSettings.discordWebhookUrl || '');
  const [testing, setTesting] = useState(false);

  const handleSave = () => {
    updateNotificationSettings({ discordWebhookUrl: webhookUrl });
  };

  const handleTest = async () => {
    if (!webhookUrl) return;

    setTesting(true);
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl,
          username: 'TestUser',
          type: 'trade',
          trade: {
            id: 'test',
            marketId: 'test',
            market: {
              question: 'Will this notification work?',
              slug: 'test',
              endDate: new Date().toISOString(),
              volume: 100000,
              liquidity: 50000,
            },
            outcome: 'YES',
            type: 'BUY',
            size: 100,
            price: 0.65,
            timestamp: new Date().toISOString(),
          },
        }),
      });
      alert('Test notification sent! Check your Discord channel.');
    } catch (error) {
      alert('Failed to send test notification');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Notification Settings
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Discord Webhook URL
          </label>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Create a webhook in your Discord server: Server Settings → Integrations → Webhooks
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!webhookUrl}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Webhook
          </button>

          <button
            onClick={handleTest}
            disabled={!webhookUrl || testing}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-colors"
          >
            <TestTube className="w-4 h-4" />
            {testing ? 'Sending...' : 'Test Notification'}
          </button>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={notificationSettings.enableEntryNotifications}
              onChange={(e) =>
                updateNotificationSettings({ enableEntryNotifications: e.target.checked })
              }
              className="rounded"
            />
            <span>Notify on position entries</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer mt-2">
            <input
              type="checkbox"
              defaultChecked={notificationSettings.enableExitNotifications}
              onChange={(e) =>
                updateNotificationSettings({ enableExitNotifications: e.target.checked })
              }
              className="rounded"
            />
            <span>Notify on position exits</span>
          </label>
        </div>
      </div>
    </div>
  );
}
