'use client';

import { useState } from 'react';
import { useBTCStore } from './store';

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
      <h3 className="text-lg font-semibold text-gray-300 mb-6">Settings</h3>

      {/* Discord Webhook */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Discord Webhook URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={webhookInput}
            onChange={(e) => setWebhookInput(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSaveWebhook}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
        {showSuccess && (
          <div className="mt-2 text-sm text-green-400 flex items-center gap-2">
            <span>✓</span>
            <span>Webhook saved successfully!</span>
          </div>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Get your webhook URL from Discord: Server Settings → Integrations → Webhooks
        </p>
      </div>

      {/* Signal Probability Toggles */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-gray-300 mb-2">
          Enable Signal Types
        </div>

        {/* High Probability */}
        <label className="flex items-center justify-between p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
          <div>
            <div className="font-medium text-white">High Probability (95%)</div>
            <div className="text-xs text-gray-400">Most reliable signals</div>
          </div>
          <input
            type="checkbox"
            checked={config.enableHighProb}
            onChange={(e) => handleToggle('enableHighProb', e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Mid Probability */}
        <label className="flex items-center justify-between p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
          <div>
            <div className="font-medium text-white">Mid Probability (75%)</div>
            <div className="text-xs text-gray-400">Moderate confidence signals</div>
          </div>
          <input
            type="checkbox"
            checked={config.enableMidProb}
            onChange={(e) => handleToggle('enableMidProb', e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Low Probability */}
        <label className="flex items-center justify-between p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
          <div>
            <div className="font-medium text-white">Low Probability (55%)</div>
            <div className="text-xs text-gray-400">Early warning signals</div>
          </div>
          <input
            type="checkbox"
            checked={config.enableLowProb}
            onChange={(e) => handleToggle('enableLowProb', e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      {/* Alert Threshold */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Alert Confidence Threshold: {config.alertThreshold}%
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
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50%</span>
          <span>100%</span>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Only send Discord alerts for signals above this confidence level
        </p>
      </div>

      {/* Status */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-300">Discord Status</div>
            <div className="text-xs text-gray-500 mt-1">
              {config.discordWebhook ? 'Webhook configured' : 'No webhook configured'}
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${
            config.discordWebhook ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
          }`} />
        </div>
      </div>
    </div>
  );
}
