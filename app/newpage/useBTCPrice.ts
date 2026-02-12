// Custom hook for real-time BTC price data

import { useEffect, useRef } from 'react';
import { useBTCStore } from './store';
import { Candle } from '@/types';

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
          const candle: Candle = {
            time: kline.t,
            open: parseFloat(kline.o),
            high: parseFloat(kline.h),
            low: parseFloat(kline.l),
            close: parseFloat(kline.c),
            volume: parseFloat(kline.v),
          };

          // Update current price
          setCurrentPrice(candle.close);

          // Add candle only if it's closed
          if (kline.x) {
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
  limit: number = 500
): Promise<Candle[]> {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch historical data');
    }

    const data = await response.json();
    
    return data.map((kline: any) => ({
      time: kline[0],
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
    }));
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
