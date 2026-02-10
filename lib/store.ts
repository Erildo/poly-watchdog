import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TrackedTrader, NotificationSettings } from '@/types';

interface TrackerStore {
  trackedTraders: TrackedTrader[];
  notificationSettings: NotificationSettings;
  addTrader: (trader: Omit<TrackedTrader, 'id' | 'addedAt'>) => void;
  removeTrader: (id: string) => void;
  toggleNotifications: (id: string) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
}

export const useTrackerStore = create<TrackerStore>()(
  persist(
    (set) => ({
      trackedTraders: [],
      notificationSettings: {
        enableEntryNotifications: true,
        enableExitNotifications: true,
        whatsappEnabled: false,
      },
      
      addTrader: (trader) =>
        set((state) => ({
          trackedTraders: [
            ...state.trackedTraders,
            {
              ...trader,
              id: crypto.randomUUID(),
              addedAt: new Date().toISOString(),
            },
          ],
        })),
      
      removeTrader: (id) =>
        set((state) => ({
          trackedTraders: state.trackedTraders.filter((t) => t.id !== id),
        })),
      
      toggleNotifications: (id) =>
        set((state) => ({
          trackedTraders: state.trackedTraders.map((t) =>
            t.id === id
              ? { ...t, notificationsEnabled: !t.notificationsEnabled }
              : t
          ),
        })),
      
      updateNotificationSettings: (settings) =>
        set((state) => ({
          notificationSettings: { ...state.notificationSettings, ...settings },
        })),
    }),
    {
      name: 'polymarket-tracker-storage',
    }
  )
);
