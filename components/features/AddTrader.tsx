'use client';

import { useState } from 'react';
import { useTrackerStore } from '@/lib/store';
import { PolymarketAPI } from '@/lib/polymarket';
import { Search, Plus } from 'lucide-react';

export function AddTrader() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const addTrader = useTrackerStore((state) => state.addTrader);

  const handleAdd = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Validate address format
      const address = input.trim().toLowerCase();
      
      if (!address.startsWith('0x') || address.length !== 42) {
        throw new Error('Please enter a valid Ethereum wallet address (0x...)');
      }
      
      const response = await fetch(`/api/user?address=${address}`);
      
      if (!response.ok) {
        throw new Error('Could not find user with this address. Make sure the address has Polymarket activity.');
      }

      const user = await response.json();

      addTrader({
        username: user.username || user.address.slice(0, 8),
        address: user.address,
        notificationsEnabled: true,
      });

      setInput('');
    } catch (err: any) {
      setError(err.message || 'Could not add trader. Please check the address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Add Trader to Track
      </h2>
      
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Enter wallet address (0x...)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <button
          onClick={handleAdd}
          disabled={loading || !input.trim()}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-colors"
        >
          {loading ? 'Adding...' : 'Track'}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}