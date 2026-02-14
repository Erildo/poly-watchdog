# BTC Reversal Dashboard

Real-time Bitcoin trend reversal prediction system using the UCS Extreme Snap Back indicator and Camarilla Pivot Points.

## Features

✅ **Real-time 1-minute BTC candlesticks** via Binance WebSocket  
✅ **3 weeks of historical data** stored for analysis (30,240 candles)  
✅ **Configurable chart timeframe** - Display last 3 weeks of price action  
✅ **UCS Extreme Snap Back indicator** - High/Mid/Low probability reversal signals  
✅ **Camarilla Pivot Points** - Daily, Weekly, and Monthly levels (H1-H5, L1-L5, Center)  
✅ **Buy/Sell signal labels** on chart for all historical signals  
✅ **Discord webhook alerts** for real-time notifications  
✅ **Performance tracking** with win rate metrics by probability level  
✅ **Timeframe selector** - Switch between 1m, 15m, 45m intervals  
✅ **Beautiful dark theme** UI with Lightweight Charts library  
✅ **Optimized performance** - Smart caching for fast signal calculation  
✅ **UTC timezone** for accurate daily pivot calculations  

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Discord Webhook

1. Go to your Discord server
2. Navigate to: **Server Settings** → **Integrations** → **Webhooks**
3. Click **New Webhook** or edit an existing one
4. Copy the **Webhook URL**
5. Paste it into the dashboard settings panel

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Production Build

```bash
npm run build
npm start
```

## Dashboard Overview

### Main Chart
- **3 weeks of 1-minute candlestick data** (configurable display range)
- **Buy/Sell signal labels** from UCS Extreme Snap Back indicator
- **Camarilla pivot lines**:
  - Daily levels: H1-H5 (orange), L1-L5 (teal), Center (white)
  - Weekly levels: WH3, WL3, WCenter (cyan)
  - Monthly levels: MH3, MH4, ML3, ML4, MCenter (light green)
- **Real-time price overlay** with current BTC/USDT price

### Right Panel Components

**1. Current Signal + Recent Alerts**
- Latest reversal signal with direction, confidence, and price movement
- Last 5 alerts displayed with outcomes (win/loss/pending)
- Color-coded by direction (green/red)

**2. Performance Metrics**
- Overall win rate percentage
- Total signals, wins, losses
- Breakdown by probability level (High/Mid/Low)
- Win rate progress bar

**3. Settings**
- Discord webhook URL input
- Enable/disable signal types (High/Mid/Low probability)
- Alert confidence threshold slider (50-100%)
- **Timeframe selector** - 1m, 15m, 45m buttons
- Discord connection status indicator

## How It Works

### UCS Extreme Snap Back Indicator

The indicator detects trend reversals by measuring price deviation from moving averages using ATR (Average True Range) bands:

- **High Probability (95% confidence)**: Price exceeds all 3 deviation bands
- **Mid Probability (75% confidence)**: Price exceeds 2 deviation bands
- **Low Probability (55% confidence)**: Price exceeds 1 deviation band

**Parameters:**
- MA Periods: 7, 14, 21, 32
- ATR Multipliers: 1.6x, 2.4x, 3.2x

**Signal Detection:**
- Scans all historical candles (last 3 weeks)
- Uses smart caching to avoid recalculation
- Only processes new candles in real-time
- Prevents duplicate consecutive signals

### Camarilla Pivot Points

Calculated using **previous period's OHLC data** (UTC timezone):

**Daily Pivots:**
- Uses yesterday's High, Low, Close (00:00-23:59 UTC)
- Formula: `Close ± Range × (1.1 / divisor)`
- Levels: H1-H5, L1-L5, Center

**Weekly Pivots:**
- Uses last week's data (Monday-Sunday)
- WH3, WL3, WCenter displayed

**Monthly Pivots:**
- Uses previous month's data (1st to last day)
- MH3, MH4, ML3, ML4, MCenter displayed

Pivots remain static throughout the day/week/month and update at period boundaries.

### Data Flow

1. **Initial Load**: Fetches 3 weeks (30,240 candles) from Binance API
2. **Real-time Updates**: WebSocket streams new 1-minute candles
3. **Signal Calculation**: Runs once on load, then only on new candles
4. **Pivot Updates**: Recalculates daily at UTC midnight
5. **Alert Dispatch**: Sends Discord webhook for high-confidence signals
6. **Performance Tracking**: Stores last 100 alerts with outcomes

## Configuration

### Signal Types

Toggle which probability levels trigger alerts:
- ✅ High Probability (recommended) - 95% confidence
- ⬜ Mid Probability - 75% confidence
- ⬜ Low Probability - 55% confidence

### Alert Threshold

Minimum confidence (50-100%) required to send Discord alerts. Default: 75%

### Timeframe Selector

Choose chart resolution:
- **1m** - 1-minute candles (default)
- **15m** - 15-minute candles
- **45m** - 45-minute candles

### Chart Display Range

To adjust visible timeframe, edit `components/TradingChart.tsx`:

```typescript
// Line ~84
const timeAgo = now - (21 * 24 * 60 * 60 * 1000); // 3 weeks

// Options:
// 24 hours:  now - (24 * 60 * 60 * 1000)
// 1 week:    now - (7 * 24 * 60 * 60 * 1000)
// 3 weeks:   now - (21 * 24 * 60 * 60 * 1000)
```

### Discord Webhook Format

Webhook URL should look like:
```
https://discord.com/api/webhooks/[ID]/[TOKEN]
```

Alert payload includes:
- Signal direction (BUY/SELL)
- Price at signal
- Confidence percentage
- Probability level (HIGH/MID/LOW)
- Timestamp
- Color-coded embeds (green for buy, red for sell)

## Data Sources

- **Price Feed**: Binance WebSocket (`wss://stream.binance.com:9443/ws/btcusdt@kline_1m`)
- **Historical Data**: Binance REST API (`/api/v3/klines`)
- **Backup**: CoinGecko API (if Binance unavailable)

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Zustand** - State management with persistence
- **Lightweight Charts** - TradingView's charting library
- **Tailwind CSS** - Styling
- **Binance WebSocket** - Real-time price feed

## Performance Optimizations

- **Smart Caching**: UCS indicator only processes new candles
- **Deduplication**: Prevents duplicate candles in store and chart
- **Lazy Calculation**: Signals calculated once on load, not every minute
- **Efficient Windowing**: Uses 100-candle windows for calculations
- **Memory Management**: Stores max 30,240 candles (3 weeks)

- **High Probability (95% confidence)**: Price exceeds all 3 deviation bands
- **Mid Probability (75% confidence)**: Price exceeds 2 deviation bands
- **Low Probability (55% confidence)**: Price exceeds 1 deviation band

**Parameters:**
- MA Periods: 7, 14, 21, 32
- ATR Multipliers: 1.6x, 2.4x, 3.2x

### Camarilla Pivot Points

Daily support/resistance levels calculated using:
- Previous day's High, Low, Close
- R3/R4 as resistance zones
- S3/S4 as support zones
- PP (Pivot Point) as midpoint

### Signal Flow

1. **Real-time Data**: Binance WebSocket streams 1-min candles
2. **Indicator Calculation**: UCS algorithm runs on each new candle
3. **Signal Detection**: When confidence threshold is met
4. **Alert Creation**: Signal stored in local state
5. **Discord Notification**: Webhook sends formatted alert
6. **Performance Tracking**: Win/loss tracked for metrics

## Configuration

### Signal Types

Toggle which probability levels trigger alerts:
- ✅ High Probability (recommended)
- ⬜ Mid Probability
- ⬜ Low Probability

### Alert Threshold

Minimum confidence (50-100%) required to send Discord alerts.

### Discord Webhook

Paste your webhook URL in Settings panel. Format:
```
https://discord.com/api/webhooks/[ID]/[TOKEN]
```

## Data Sources

- **Price Feed**: Binance WebSocket (wss://stream.binance.com:9443/ws/btcusdt@kline_1m)
- **Historical Data**: Binance REST API (/api/v3/klines)
- **Backup**: CoinGecko API (if Binance unavailable)

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Zustand** - State management
- **Lightweight Charts** - TradingView charts library
- **Tailwind CSS** - Styling
- **Binance WebSocket** - Real-time price feed

## File Structure

```
app/newpage/
├── components/
│   ├── TradingChart.tsx          # Main chart with 3-week display
│   ├── CombinedSignalAlerts.tsx  # Current signal + recent alerts
│   ├── PerformanceMetrics.tsx    # Win rate stats (compact)
│   └── SettingsPanel.tsx         # Discord webhook + timeframe selector
├── hooks/
│   └── useBTCPrice.ts            # WebSocket + 3-week data fetching
├── lib/
│   ├── ucs-indicator.ts          # Signal calculation with caching
│   ├── camarilla.ts              # Daily/weekly/monthly pivots (UTC)
│   ├── store.ts                  # Zustand state (30,240 candles)
│   └── discord.ts                # Webhook sender
├── types/
│   └── index.ts                  # TypeScript interfaces
└── page.tsx                      # Main dashboard (2-column layout)
```

## Troubleshooting

### WebSocket Not Connecting
- Check browser console for errors
- Verify internet connection
- Binance may have rate limits - wait 60 seconds and refresh

### No Signals Appearing
- Ensure at least one probability level is enabled in settings
- Wait for indicator calculation to complete (2-3 seconds on load)
- Signals require price deviation from ATR bands (volatility needed)

### Discord Alerts Not Sending
- Verify webhook URL format is correct
- Check webhook hasn't been deleted in Discord
- Ensure confidence threshold isn't set too high (try 50%)
- Alerts only sent for NEW signals, not historical ones

### Chart Loading Slowly
- 3 weeks of data = ~30,000 candles to fetch
- Initial load takes 5-10 seconds (multiple API calls to Binance)
- After first load, WebSocket provides instant updates

### Pivots Seem Off
- Pivots use UTC timezone (Binance standard)
- Daily pivots based on yesterday's 00:00-23:59 UTC
- Weekly pivots based on last Monday-Sunday
- If still incorrect, check you have 3+ weeks of data loaded

### Browser Freezing
- Should be fixed with optimized indicator (uses caching)
- If still occurs, refresh page - signal calculation runs only once on load
- Check browser console for errors



## Roadmap

### Planned Features
- [ ] Multi-timeframe analysis (5m, 15m, 1h aggregation)
- [ ] Backtesting engine with historical data
- [ ] Additional indicators (RSI divergence, MACD)
- [ ] Trade execution integration
- [ ] Email/SMS alerts
- [ ] Mobile app version
- [ ] Position sizing calculator
- [ ] Risk/reward visualization

### Known Limitations
- Binance API rate limits (10 requests for 3 weeks of data)
- No authentication (single-user deployment)
- WebSocket reconnects on disconnect (auto-refresh may be needed)
- Signals based on 1-minute data only (no aggregation yet)
- Performance tracking manual (no auto win/loss detection)

## License

MIT

## Disclaimer

**This tool is for educational and informational purposes only. Trading cryptocurrencies involves substantial risk of loss. Past performance does not guarantee future results. Always do your own research and never invest more than you can afford to lose.**

---






### TypeScript Implementation
```typescript
const ma1 = sma(srcHistory, 7);
const rng1 = sma(trHistory, 7);
const up1 = ma1 + rng1 * 1.6;
const dn1 = ma1 - rng1 * 1.6;

const ERhigh1 = currentCandle.high > up1 ? 1 : 0;
const HiPERh = prevSignals.high !== 1 && ERhigh3 ? 1 : 0;
```

## Discord Alert Format

Example webhook payload:
```json
{
  "username": "BTC Reversal Bot",
  "embeds": [{
    "title": "🟢 BTC Reversal Signal - UP",
    "description": "**HIGH Probability Setup**",
    "color": 65280,
    "fields": [
      { "name": "💰 Price", "value": "$95,432.50", "inline": true },
      { "name": "📊 Confidence", "value": "95%", "inline": true },
      { "name": "⏰ Time", "value": "2/12/2026, 3:45 PM", "inline": true }
    ]
  }]
}
```

## Performance Metrics

The dashboard tracks:
- **Total Signals**: All generated alerts
- **Win Rate**: Percentage of successful predictions
- **By Probability**: Stats for High/Mid/Low setups
- **Pending Outcomes**: Signals awaiting resolution

## Troubleshooting

### WebSocket Not Connecting
- Check browser console for errors
- Verify internet connection
- Try refreshing the page

### No Signals Appearing
- Ensure at least one probability level is enabled
- Wait for volatility (signals require ATR deviation)
- Check if minimum 32 candles have loaded

### Discord Alerts Not Sending
- Verify webhook URL format
- Check webhook hasn't been deleted in Discord
- Ensure confidence threshold isn't too high

### Chart Not Loading
- Clear browser cache
- Check if Binance API is accessible
- Verify no CORS issues in console


## Roadmap

- [ ] Multi-timeframe analysis (5m, 15m, 1h)
- [ ] Backtesting with historical data
- [ ] Additional indicators (RSI, MACD divergence)
- [ ] Trade execution integration (API)
- [ ] Email/SMS alerts
- [ ] Mobile app version
- [ ] Financial astrology module

## License

MIT

## Disclaimer

**This tool is for educational and informational purposes only. Trading cryptocurrencies involves substantial risk of loss. Always do your own research and never invest more than you can afford to lose.**

---
