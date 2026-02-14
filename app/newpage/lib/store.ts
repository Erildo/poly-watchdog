// BTC Dashboard State Store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Candle, UCSSignal, CamarillaPivots, Alert, DashboardConfig } from '../types';

interface BTCDashboardStore {
  // Price & Chart Data
  currentPrice: number;
  candles: Candle[];
  
  // Signals & Indicators
  activeSignals: UCSSignal[];
  pivots: CamarillaPivots | null;
  
  // Alerts
  alerts: Alert[];
  
  // Configuration
  config: DashboardConfig;
  
  // Actions
  setCurrentPrice: (price: number) => void;
  addCandle: (candle: Candle) => void;
  setCandles: (candles: Candle[]) => void;
  addSignal: (signal: UCSSignal) => void;
  setPivots: (pivots: CamarillaPivots) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (id: string, update: Partial<Alert>) => void;
  updateConfig: (config: Partial<DashboardConfig>) => void;
  clearAlerts: () => void;
}

export const useBTCStore = create<BTCDashboardStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentPrice: 0,
      candles: [],
      activeSignals: [],
      pivots: null,
      alerts: [],
      config: {
        discordWebhook: '',
        enableHighProb: true,
        enableMidProb: false,
        enableLowProb: false,
        alertThreshold: 75,
        timeframe: '1m',
      },

      // Actions
      setCurrentPrice: (price) => set({ currentPrice: price }),
      
      addCandle: (candle) => set((state) => {
        // Check if candle with same timestamp already exists
        const existingIndex = state.candles.findIndex(c => c.time === candle.time);
        
        if (existingIndex !== -1) {
          // Update existing candle instead of adding duplicate
          const updatedCandles = [...state.candles];
          updatedCandles[existingIndex] = candle;
          return { candles: updatedCandles.slice(-30240) }; // Keep last 3 weeks
        }
        
        // Add new candle
        return { candles: [...state.candles.slice(-30240), candle] }; // Keep last 3 weeks
      }),
      
      setCandles: (candles) => set({ candles }),
      
      addSignal: (signal) => set((state) => ({
        activeSignals: [...state.activeSignals.slice(-50), signal]
      })),
      
      setPivots: (pivots) => set({ pivots }),
      
      addAlert: (alert) => set((state) => ({
        alerts: [alert, ...state.alerts.slice(0, 99)] // Keep last 100 alerts
      })),
      
      updateAlert: (id, update) => set((state) => ({
        alerts: state.alerts.map(alert =>
          alert.id === id ? { ...alert, ...update } : alert
        )
      })),
      
      updateConfig: (config) => set((state) => ({
        config: { ...state.config, ...config }
      })),
      
      clearAlerts: () => set({ alerts: [] }),
    }),
    {
      name: 'btc-dashboard-storage',
      partialize: (state) => ({
        alerts: state.alerts,
        config: state.config,
      }),
    }
  )
);