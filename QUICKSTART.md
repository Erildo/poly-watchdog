# Polymarket Tracker - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd polymarket-tracker
npm install
```

### Step 2: Run the App
```bash
npm run dev
```

Open http://localhost:3000

### Step 3: Add a Trader
1. Enter a Polymarket username or wallet address
2. Click "Track"
3. View their positions and trades!

---

## 🔔 Enable Discord Notifications (Optional)

### Create Discord Webhook
1. Open your Discord server
2. Go to: Server Settings → Integrations → Webhooks
3. Click "New Webhook"
4. Name it "Polymarket Tracker"
5. Copy the Webhook URL (looks like: `https://discord.com/api/webhooks/...`)

### Configure in App
1. Paste the webhook URL in "Notification Settings"
2. Click "Save Webhook"
3. Click "Test Notification" to verify
4. You'll now get notified on every trade!

---

## 📊 Features Included

✅ **Track Multiple Traders** - Monitor as many as you want
✅ **Live P&L** - See profit/loss on every position in real-time
✅ **Trade History** - View complete trade records
✅ **Discord Alerts** - Get notified instantly on entries/exits
✅ **Auto-Refresh** - Data updates every 30 seconds
✅ **Persistent Storage** - Tracked traders saved locally

---

## 🎯 Example Traders to Track

Try tracking these popular Polymarket traders:
- Username: `polymarket` (official account)
- Or search for any wallet address starting with `0x...`

---

## 🛠 Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- Zustand (state)
- TanStack Query (data fetching)
- Discord Webhooks (notifications)

---

## 📱 Notification Example

When a trader opens a position, you'll receive:
```
🟢 ENTERED Position

polymarket opened a position

📊 Market: Will Bitcoin reach $100k in 2025?
🎯 Outcome: YES
💰 Size: $1,000.00
💵 Price: 65.0¢
⏰ Time: 2/10/2026, 3:45 PM
```

---

## 🔥 Next Steps

1. **Add your first trader** - Start monitoring now!
2. **Set up Discord** - Never miss a trade
3. **Track top traders** - Learn from the best
4. **Monitor P&L** - See what's working

---

## ⚠️ Important Notes

- Notifications depend on 30-second polling (not instant)
- Polymarket API may have rate limits
- Data is stored locally in your browser
- Discord webhook URL is stored locally (not sent to any server)

---

## 🤝 Need Help?

Check README.md for detailed documentation including:
- API endpoints
- Deployment options
- Future enhancements
- Contributing guidelines

---

Happy tracking! 🚀
