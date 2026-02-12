# BTC Reversal Dashboard

Real-time Bitcoin trend reversal prediction system using the UCS Extreme Snap Back indicator and Camarilla Pivot Points.

## Features

✅ **Real-time 1-minute BTC candlesticks** via Binance WebSocket  
✅ **UCS Extreme Snap Back indicator** converted from Pine Script  
✅ **Camarilla Pivot Points** (R3, R4, S3, S4 levels)  
✅ **High/Mid/Low probability signals** with confidence scores  
✅ **Discord webhook alerts** for real-time notifications  
✅ **Performance tracking** with win rate metrics  
✅ **Beautiful dark theme** UI with Lightweight Charts  

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

## How It Works

### UCS Extreme Snap Back Indicator

The indicator detects trend reversals by measuring price deviation from moving averages using ATR (Average True Range) bands:

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
btc-dashboard/
├── components/
│   ├── TradingChart.tsx       # Main candlestick chart
│   ├── SignalPanel.tsx        # Current signal display
│   ├── AlertFeed.tsx          # Alert history
│   ├── SettingsPanel.tsx      # Configuration
│   └── PerformanceMetrics.tsx # Win rate stats
├── lib/
│   ├── ucs-indicator.ts       # UCS algorithm (Pine → TS)
│   ├── camarilla.ts           # Pivot calculations
│   ├── store.ts               # Zustand state
│   └── discord.ts             # Webhook sender
├── hooks/
│   └── useBTCPrice.ts         # WebSocket connection
├── types/
│   └── index.ts               # TypeScript interfaces
└── page.tsx                   # Main dashboard page
```

## Indicator Logic (Pine Script → TypeScript)

### Original Pine Script
```pine
// Moving averages
ma1 = sma(src, 7)
ma2 = sma(src, 14)

// ATR bands
rng1 = sma(tr, 7)
up1 = ma1 + rng1 * 1.6
dn1 = ma1 - rng1 * 1.6

// Signal detection
ERhigh1 = high > up1 ? 1 : 0
HiPERh = ERhigh3[1] != 1 and ERhigh3 ? 1 : 0
```

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

## Customization

### Adjust Indicator Parameters
Edit `lib/ucs-indicator.ts`:
```typescript
private len1 = 7;   // Change MA periods
private len2 = 14;
private len3 = 21;
private len4 = 32;
```

### Modify ATR Multipliers
```typescript
const up1 = ma1 + rng1 * 1.6;  // Increase for fewer signals
const up2 = ma2 + rng2 * 2.4;
const up3 = ma2 + rng3 * 3.2;
```

### Change Chart Colors
Edit `components/TradingChart.tsx`:
```typescript
upColor: '#26a69a',     // Green candles
downColor: '#ef5350',   // Red candles
```

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

Built with ❤️ using UCS Extreme Snap Back indicator
