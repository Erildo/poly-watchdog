# Polymarket Tracker

A real-time dashboard for monitoring Polymarket traders with Discord notifications.

## Features

Features
- ✅ Real-time 1-minute BTC candlesticks via Binance WebSocket
- ✅ 3 weeks of historical data stored for analysis (30,240 candles)
- ✅ Configurable chart timeframe - Display last 3 weeks of price action
- ✅ Discord webhook alerts for real-time notifications
- ✅ Performance tracking with win rate metrics by probability level
- ✅ Timeframe selector - Switch between 1m, 15m, 45m intervals
- ✅ Buy/Sell signal labels on chart for all historical signals
- ✅ Beautiful dark theme UI with Lightweight Charts library
- ✅ Optimized performance - Smart caching for fast signal calculation
- ✅ UTC timezone for accurate daily pivot calculations

- ✅ Camarilla Pivot Points - Daily, Weekly, and Monthly levels (H1-H5, L1-L5, Center)
- ✅ UCS Extreme Snap Back indicator - High/Mid/Low probability reversal signals
## Setup

### Prerequisites

- Node.js 18+ installed
- A Discord server with webhook access (optional, for notifications)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Usage

### 1. Add a Trader

- Enter a Polymarket username or wallet address (0x...)
- Click "Track" to start monitoring

### 2. Set Up Discord Notifications (Optional)

1. In your Discord server:
   - Go to Server Settings → Integrations → Webhooks
   - Click "New Webhook"
   - Copy the webhook URL

2. In the app:
   - Paste the webhook URL in "Notification Settings"
   - Click "Save Webhook"
   - Click "Test Notification" to verify it works

3. Configure notification preferences:
   - Enable/disable entry notifications (when trader opens a position)
   - Enable/disable exit notifications (when trader closes a position)

### 3. Monitor Traders

- View all open positions with real-time P&L
- Switch to "Recent Trades" tab to see trade history
- Toggle notifications per trader using the bell icon
- Remove traders using the trash icon

## How It Works

### Data Fetching

- Uses Polymarket's Gamma API for user data, positions, and trades
- Auto-refreshes every 30 seconds via TanStack Query
- Server-side API routes prevent CORS issues

### Notifications

When a tracked trader makes a trade, the app:
1. Detects the new trade via polling
2. Determines if it's an entry (BUY) or exit (SELL)
3. Sends a Discord webhook with trade details including:
   - Market question
   - Outcome (YES/NO)
   - Trade size and price
   - Timestamp and transaction link

### P&L Calculation

For each position:
- **Entry Price**: Average price paid across all buys
- **Current Price**: Latest market price
- **P&L**: (Current Price - Entry Price) × Position Size
- **P&L %**: ((Current Price / Entry Price) - 1) × 100

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **API**: Polymarket Gamma API
- **Notifications**: Discord Webhooks

## API Endpoints

- `GET /api/user?username={username}` - Fetch user by username
- `GET /api/user?address={address}` - Fetch user by wallet address
- `GET /api/positions?address={address}` - Get user's positions
- `GET /api/trades?address={address}&limit={n}` - Get trade history
- `POST /api/notify` - Send Discord notification

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t polymarket-tracker .
docker run -p 3000:3000 polymarket-tracker
```

## Limitations

- Polymarket API rate limits may apply
- Real-time notifications depend on 30-second polling interval
- Historical P&L calculation may not account for partial closes

## Future Enhancements

- [ ] Real-time WebSocket updates instead of polling
- [ ] Telegram notifications
- [ ] Email notifications
- [ ] Portfolio analytics and charts
- [ ] Export trade data to CSV
- [ ] Custom alert rules (e.g., notify when P&L > X%)
- [ ] Multi-user authentication
- [ ] Mobile app

## Contributing

Pull requests welcome! Please open an issue first to discuss proposed changes.

## License

MIT
