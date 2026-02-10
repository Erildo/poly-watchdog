import { NextResponse } from 'next/server';
import { DiscordNotifier } from '@/lib/discord';
import type { Trade, Position } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { webhookUrl, username, trade, position, type } = body;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL required' },
        { status: 400 }
      );
    }

    const notifier = new DiscordNotifier(webhookUrl);

    if (type === 'trade' && trade) {
      const isEntry = trade.type === 'BUY';
      await notifier.sendTradeNotification(username, trade as Trade, isEntry);
    } else if (type === 'position' && position) {
      await notifier.sendPositionUpdate(username, position as Position);
    } else {
      return NextResponse.json(
        { error: 'Invalid notification type or missing data' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
