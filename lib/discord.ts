import type { Trade, Position } from '@/types';

export class DiscordNotifier {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async sendTradeNotification(
    username: string,
    trade: Trade,
    isEntry: boolean
  ): Promise<void> {
    const action = isEntry ? '🟢 ENTERED' : '🔴 EXITED';
    const color = isEntry ? 0x00ff00 : 0xff0000;

    const embed = {
      title: `${action} Position`,
      description: `**${username}** ${isEntry ? 'opened' : 'closed'} a position`,
      color,
      fields: [
        {
          name: '📊 Market',
          value: trade.market.question,
          inline: false,
        },
        {
          name: '🎯 Outcome',
          value: trade.outcome,
          inline: true,
        },
        {
          name: '💰 Size',
          value: `$${trade.size.toFixed(2)}`,
          inline: true,
        },
        {
          name: '💵 Price',
          value: `${(trade.price * 100).toFixed(1)}¢`,
          inline: true,
        },
        {
          name: '⏰ Time',
          value: new Date(trade.timestamp).toLocaleString(),
          inline: false,
        },
      ],
      footer: {
        text: 'Polymarket Tracker',
      },
      timestamp: new Date(trade.timestamp).toISOString(),
    };

    if (trade.txHash) {
      embed.fields.push({
        name: '🔗 Transaction',
        value: `[View on Explorer](https://polygonscan.com/tx/${trade.txHash})`,
        inline: false,
      });
    }

    await this.sendWebhook({ embeds: [embed] });
  }

  async sendPositionUpdate(
    username: string,
    position: Position
  ): Promise<void> {
    const pnlEmoji = position.pnl >= 0 ? '📈' : '📉';
    const pnlColor = position.pnl >= 0 ? 0x00ff00 : 0xff0000;

    const embed = {
      title: `${pnlEmoji} Position Update`,
      description: `**${username}**'s position status`,
      color: pnlColor,
      fields: [
        {
          name: '📊 Market',
          value: position.market.question,
          inline: false,
        },
        {
          name: '🎯 Outcome',
          value: position.outcome,
          inline: true,
        },
        {
          name: '💰 Size',
          value: `$${position.size.toFixed(2)}`,
          inline: true,
        },
        {
          name: '💵 Avg Price',
          value: `${(position.averagePrice * 100).toFixed(1)}¢`,
          inline: true,
        },
        {
          name: '📈 Current Price',
          value: `${(position.currentPrice * 100).toFixed(1)}¢`,
          inline: true,
        },
        {
          name: '💸 P&L',
          value: `$${position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)} (${position.pnlPercentage >= 0 ? '+' : ''}${position.pnlPercentage.toFixed(2)}%)`,
          inline: true,
        },
        {
          name: '⏰ Opened',
          value: new Date(position.createdAt).toLocaleString(),
          inline: false,
        },
      ],
      footer: {
        text: 'Polymarket Tracker',
      },
      timestamp: new Date().toISOString(),
    };

    await this.sendWebhook({ embeds: [embed] });
  }

  private async sendWebhook(payload: any): Promise<void> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Discord webhook failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending Discord notification:', error);
    }
  }
}
