// Discord Alert System

import { Alert } from '../types';

export async function sendDiscordAlert(
  webhookUrl: string,
  alert: Alert
): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
    console.error('Invalid Discord webhook URL');
    return false;
  }

  const directionEmoji = alert.direction === 'up' ? '🟢' : '🔴';
  const probabilityLabel = alert.probability.toUpperCase();
  const confidenceBar = '█'.repeat(Math.floor(alert.confidence / 10));

  const embed = {
    title: `${directionEmoji} BTC Reversal Signal - ${alert.direction.toUpperCase()}`,
    description: `**${probabilityLabel} Probability Setup**`,
    color: alert.direction === 'up' ? 0x00ff00 : 0xff0000,
    fields: [
      {
        name: '💰 Price',
        value: `$${alert.price.toFixed(2)}`,
        inline: true,
      },
      {
        name: '📊 Confidence',
        value: `${alert.confidence}%\n${confidenceBar}`,
        inline: true,
      },
      {
        name: '⏰ Time',
        value: new Date(alert.timestamp).toLocaleString(),
        inline: true,
      },
      {
        name: '🎯 Direction',
        value: alert.direction === 'up' ? 'BULLISH REVERSAL' : 'BEARISH REVERSAL',
        inline: false,
      },
    ],
    footer: {
      text: 'UCS Extreme Snap Back | BTC Reversal System',
    },
    timestamp: new Date(alert.timestamp).toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'BTC Reversal Bot',
        avatar_url: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    console.log('✅ Discord alert sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send Discord alert:', error);
    return false;
  }
}

export function formatAlertMessage(alert: Alert): string {
  const direction = alert.direction === 'up' ? 'BUY' : 'SELL';
  const emoji = alert.direction === 'up' ? '🟢' : '🔴';
  
  return `${emoji} ${direction} Signal | $${alert.price.toFixed(2)} | ${alert.confidence}% confidence | ${alert.probability.toUpperCase()} prob`;
}
