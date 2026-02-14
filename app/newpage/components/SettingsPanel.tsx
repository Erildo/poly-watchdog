'use client';

import { useState } from 'react';
import { useBTCStore } from '../lib/store';

export function SettingsPanel() {
  const { config, updateConfig } = useBTCStore();
  const [webhookInput, setWebhookInput] = useState(config.discordWebhook);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveWebhook = () => {
    updateConfig({ discordWebhook: webhookInput });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggle = (key: keyof typeof config, value: boolean) => {
    updateConfig({ [key]: value });
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Settings</h3>

      {/* Discord Webhook - Compact */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-400 mb-2">
          Discord Webhook URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={webhookInput}
            onChange={(e) => setWebhookInput(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
            className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSaveWebhook}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
        {showSuccess && (
          <div className="mt-2 text-xs text-green-400 flex items-center gap-2">
            <span>✓</span>
            <span>Saved!</span>
          </div>
        )}
      </div>

      {/* Signal Probability Toggles - Compact */}
      <div className="space-y-2 mb-4">
        <div className="text-xs font-medium text-gray-400 mb-2">
          Signal Types
        </div>

        {/* High Probability */}
        <label className="flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="text-sm font-medium text-white">High (95%)</div>
          </div>
          <input
            type="checkbox"
            checked={config.enableHighProb}
            onChange={(e) => handleToggle('enableHighProb', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Mid Probability */}
        <label className="flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="text-sm font-medium text-white">Mid (75%)</div>
          </div>
          <input
            type="checkbox"
            checked={config.enableMidProb}
            onChange={(e) => handleToggle('enableMidProb', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Low Probability */}
        <label className="flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="text-sm font-medium text-white">Low (55%)</div>
          </div>
          <input
            type="checkbox"
            checked={config.enableLowProb}
            onChange={(e) => handleToggle('enableLowProb', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      {/* Alert Threshold - Compact */}
      <div>
        <label className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
          <span>Alert Threshold</span>
          <span className="text-white">{config.alertThreshold}%</span>
        </label>
        <input
          type="range"
          min="50"
          max="100"
          step="5"
          value={config.alertThreshold}
          onChange={(e) => updateConfig({ alertThreshold: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Timeframe Selector */}
      <div className="mt-4">
        <div className="text-xs font-medium text-gray-400 mb-2">Chart Timeframe</div>
        <div className="flex gap-2">
          <button
            onClick={() => updateConfig({ timeframe: '1m' })}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              config.timeframe === '1m'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-750'
            }`}
          >
            1m
          </button>
          <button
            onClick={() => updateConfig({ timeframe: '15m' })}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              config.timeframe === '15m'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-750'
            }`}
          >
            15m
          </button>
          <button
            onClick={() => updateConfig({ timeframe: '45m' })}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              config.timeframe === '45m'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-750'
            }`}
          >
            45m
          </button>
        </div>
      </div>

      {/* Status - Compact */}
      <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {config.discordWebhook ? 'Discord connected' : 'No webhook'}
          </div>
          <div className={`w-2 h-2 rounded-full ${
            config.discordWebhook ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
          }`} />
        </div>
      </div>
    </div>
  );
}