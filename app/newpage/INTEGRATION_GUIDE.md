# Integration Guide: Adding BTC Dashboard to Your Existing Website

This guide shows how to integrate the BTC Reversal Dashboard into your existing Next.js website.

## Method 1: Add as a New Route (Recommended)

### Step 1: Copy Files to Your Project

```bash
# In your existing Next.js project root
mkdir -p app/dashboard/btc
cp -r btc-dashboard/* app/dashboard/btc/
```

### Step 2: Update File Paths

Since the dashboard is now in `app/dashboard/btc/`, update import paths:

**In `app/dashboard/btc/page.tsx`:**
```typescript
// Change relative imports from '../' to './'
import { TradingChart } from './components/TradingChart';
import { SignalPanel } from './components/SignalPanel';
// etc...
```

### Step 3: Add to Navigation

**In your main layout or navigation component:**
```tsx
<nav>
  <Link href="/dashboard/btc">
    <button className="nav-button">
      📊 BTC Reversal Dashboard
    </button>
  </Link>
</nav>
```

### Step 4: Install Dependencies

```bash
npm install zustand lightweight-charts @tanstack/react-query
```

### Step 5: Add Global Styles

**In your main `app/globals.css`:**
```css
@import './dashboard/btc/globals.css';
```

Or copy the custom scrollbar styles directly.

### Step 6: Test the Integration

```bash
npm run dev
```

Navigate to: `http://localhost:3000/dashboard/btc`

---

## Method 2: Add as a Tab in Existing Dashboard

If you already have a dashboard with tabs:

### Step 1: Create Component Wrapper

**`app/dashboard/components/BTCDashboardTab.tsx`:**
```tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues with charts
const BTCDashboard = dynamic(
  () => import('../btc/page'),
  { ssr: false }
);

export function BTCDashboardTab() {
  return <BTCDashboard />;
}
```

### Step 2: Add to Tabs

**In your existing dashboard page:**
```tsx
import { BTCDashboardTab } from './components/BTCDashboardTab';

const tabs = [
  { id: 'overview', label: 'Overview', component: <Overview /> },
  { id: 'analytics', label: 'Analytics', component: <Analytics /> },
  { id: 'btc', label: 'BTC Reversal', component: <BTCDashboardTab /> }, // New
];
```

---

## Method 3: Standalone App (Separate Deployment)

Deploy as a separate app and embed via iframe or subdomain:

### Deploy to Vercel

```bash
cd btc-dashboard
vercel
```

### Embed in Existing Site

```tsx
<iframe
  src="https://your-btc-dashboard.vercel.app"
  className="w-full h-screen border-0"
  title="BTC Reversal Dashboard"
/>
```

---

## Configuration for Multi-User Sites

If your website has multiple users who need separate Discord webhooks:

### Database Schema

```typescript
// prisma/schema.prisma
model UserBTCSettings {
  id              String   @id @default(cuid())
  userId          String   @unique
  discordWebhook  String?
  enableHighProb  Boolean  @default(true)
  enableMidProb   Boolean  @default(false)
  enableLowProb   Boolean  @default(false)
  alertThreshold  Int      @default(75)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### API Route for Settings

**`app/api/btc/settings/route.ts`:**
```typescript
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await db.userBTCSettings.findUnique({
    where: { userId: session.user.id },
  });

  return Response.json(settings || {});
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const settings = await db.userBTCSettings.upsert({
    where: { userId: session.user.id },
    update: body,
    create: {
      userId: session.user.id,
      ...body,
    },
  });

  return Response.json(settings);
}
```

### Update Store to Sync with Backend

**Modify `lib/store.ts`:**
```typescript
export const useBTCStore = create<BTCDashboardStore>()(
  persist(
    (set, get) => ({
      // ... existing code
      
      syncWithServer: async () => {
        const response = await fetch('/api/btc/settings');
        if (response.ok) {
          const settings = await response.json();
          set({ config: { ...get().config, ...settings } });
        }
      },
      
      saveToServer: async (config: DashboardConfig) => {
        await fetch('/api/btc/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config),
        });
      },
    }),
    {
      name: `btc-dashboard-${session?.user?.id || 'guest'}`,
    }
  )
);
```

---

## Environment Variables

**`.env.local`:**
```bash
# Optional: Rate limiting for WebSocket connections
BINANCE_API_KEY=your_binance_key  # Only if using authenticated endpoints
BINANCE_SECRET_KEY=your_secret

# Optional: Alternative data sources
COINGECKO_API_KEY=your_key        # For CoinGecko Pro

# Discord rate limiting (prevent spam)
DISCORD_RATE_LIMIT=10             # Max alerts per hour
```

---

## Security Considerations

### 1. Validate Discord Webhooks

```typescript
function isValidDiscordWebhook(url: string): boolean {
  return url.startsWith('https://discord.com/api/webhooks/') 
    && url.length > 50
    && url.length < 200;
}
```

### 2. Rate Limit Alerts

```typescript
const alertTimestamps: number[] = [];

function canSendAlert(): boolean {
  const now = Date.now();
  const oneHourAgo = now - 3600000;
  
  // Remove old timestamps
  const recent = alertTimestamps.filter(t => t > oneHourAgo);
  
  if (recent.length >= 10) {
    return false; // Max 10 alerts per hour
  }
  
  alertTimestamps.push(now);
  return true;
}
```

### 3. Sanitize User Input

```typescript
function sanitizeWebhook(url: string): string {
  return url.trim().replace(/[<>]/g, '');
}
```

---

## Performance Optimization

### 1. Lazy Load Chart Library

```tsx
const TradingChart = dynamic(
  () => import('./components/TradingChart'),
  { 
    ssr: false,
    loading: () => <ChartSkeleton />
  }
);
```

### 2. Limit Stored Candles

```typescript
// In store.ts
addCandle: (candle) => set((state) => ({
  candles: [...state.candles.slice(-2000), candle] // Keep only 2000
})),
```

### 3. Debounce Indicator Calculations

```typescript
import { debounce } from 'lodash';

const debouncedCalculate = debounce((candles) => {
  const result = indicatorEngine.calculate(candles, config);
  // Process result
}, 500);
```

---

## Monitoring & Logging

### Add Analytics

```typescript
// Track signal generation
if (signal) {
  analytics.track('BTC_Signal_Generated', {
    type: signal.type,
    confidence: signal.confidence,
    probability: signal.probability,
  });
}

// Track Discord alerts
if (alertSent) {
  analytics.track('Discord_Alert_Sent', {
    userId: session.user.id,
    timestamp: Date.now(),
  });
}
```

### Error Tracking

```typescript
try {
  await sendDiscordAlert(webhook, alert);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      component: 'BTCDashboard',
      action: 'discord_alert',
    },
  });
}
```

---

## Testing

### Unit Tests

```typescript
// __tests__/ucs-indicator.test.ts
import { UCSIndicator } from '../lib/ucs-indicator';

describe('UCSIndicator', () => {
  it('detects high probability buy signal', () => {
    const indicator = new UCSIndicator();
    const candles = mockCandles(); // Create test data
    
    const { signals } = indicator.calculate(candles, {
      highProb: true,
      midProb: false,
      lowProb: false,
    });
    
    expect(signals).toHaveLength(1);
    expect(signals[0].type).toBe('buy');
    expect(signals[0].confidence).toBe(95);
  });
});
```

### E2E Tests

```typescript
// __tests__/dashboard.e2e.ts
import { test, expect } from '@playwright/test';

test('can configure Discord webhook', async ({ page }) => {
  await page.goto('/dashboard/btc');
  
  await page.fill('[placeholder*="discord.com"]', 'https://discord.com/api/webhooks/test');
  await page.click('button:has-text("Save")');
  
  await expect(page.locator('text=saved successfully')).toBeVisible();
});
```

---

## Deployment Checklist

- [ ] Install all dependencies
- [ ] Update import paths for your project structure
- [ ] Add navigation links
- [ ] Configure environment variables
- [ ] Test Discord webhook functionality
- [ ] Verify WebSocket connection
- [ ] Check mobile responsiveness
- [ ] Add error boundaries
- [ ] Set up monitoring/analytics
- [ ] Test with real BTC data
- [ ] Deploy to production
- [ ] Monitor for errors in first 24 hours

---

## Support & Resources

- **Binance API Docs**: https://binance-docs.github.io/apidocs/
- **Lightweight Charts**: https://tradingview.github.io/lightweight-charts/
- **Discord Webhooks**: https://discord.com/developers/docs/resources/webhook
- **Zustand Docs**: https://zustand-demo.pmnd.rs/

---

## Common Issues

### Chart Not Rendering
**Solution**: Ensure `lightweight-charts` is loaded client-side:
```tsx
const Chart = dynamic(() => import('./TradingChart'), { ssr: false });
```

### WebSocket Disconnects
**Solution**: Implement reconnection logic (already included in `useBTCPrice.ts`)

### Signals Not Triggering
**Solution**: 
1. Check if enough candles loaded (need 32+)
2. Verify probability settings enabled
3. Wait for price volatility

### Discord Rate Limited
**Solution**: Reduce alert frequency or use rate limiting in code

---

Need help? Open an issue or check the README for more details!
