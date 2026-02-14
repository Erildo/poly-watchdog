// Custom hook for real-time BTC price data

import { useEffect, useRef } from 'react';
import { useBTCStore } from '../lib/store';
import { Candle } from '../types';

// Binance WebSocket for 1-minute candles
export function useBTCPriceStream() {
  const wsRef = useRef<WebSocket | null>(null);
  const { addCandle, setCurrentPrice } = useBTCStore();

  useEffect(() => {
    // Connect to Binance WebSocket for BTC/USDT 1-minute klines
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('✅ Connected to Binance WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.e === 'kline') {
          const kline = data.k;
          
          // Update current price continuously
          const currentClose = parseFloat(kline.c);
          setCurrentPrice(currentClose);

          // Only add candle when it's closed (x = true)
          if (kline.x) {
            const candle: Candle = {
              time: kline.t,
              open: parseFloat(kline.o),
              high: parseFloat(kline.h),
              low: parseFloat(kline.l),
              close: parseFloat(kline.c),
              volume: parseFloat(kline.v),
            };
            
            addCandle(candle);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting...');
      // Reconnect after 3 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          window.location.reload(); // Simple reconnect strategy
        }
      }, 3000);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [addCandle, setCurrentPrice]);
}

// Fetch historical candles from Binance API
export async function fetchHistoricalCandles(
  limit: number = 1000
): Promise<Candle[]> {
  try {
    // Binance API max limit is 1000, so we need multiple calls for 3 weeks (30,240 candles)
    const allCandles: Candle[] = [];
    const maxLimit = 1000;
    const totalCandles = 30240; // 21 days * 24 hours * 60 minutes (3 weeks)
    const calls = Math.ceil(totalCandles / maxLimit);
    
    let endTime = Date.now();
    
    for (let i = 0; i < calls; i++) {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=${maxLimit}&endTime=${endTime}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }

      const data = await response.json();
      
      const candles = data.map((kline: any) => ({
        time: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5]),
      }));
      
      allCandles.unshift(...candles);
      
      // Set endTime to the earliest candle's time for next call
      if (candles.length > 0) {
        endTime = candles[0].time - 1;
      }
      
      // Break if we got less than requested (reached the end)
      if (data.length < maxLimit) {
        break;
      }
    }
    
    return allCandles.slice(-totalCandles); // Return last 3 weeks
  } catch (error) {
    console.error('Error fetching historical candles:', error);
    return [];
  }
}

// Alternative: Use CoinGecko for simple price (backup)
export async function fetchBTCPriceCoinGecko(): Promise<number | null> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    const data = await response.json();
    return data.bitcoin?.usd || null;
  } catch (error) {
    console.error('Error fetching BTC price from CoinGecko:', error);
    return null;
  }
}