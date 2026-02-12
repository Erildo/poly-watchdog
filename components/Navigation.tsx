'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="flex items-center gap-3 py-4 border-b border-zinc-800">
          <div className="p-2 bg-blue-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Polymarket Tracker</h1>
            <p className="text-sm text-zinc-500">Monitor traders and get notified instantly</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-8">
          <Link
            href="/"
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              pathname === '/'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/newpage"
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              pathname === '/newpage'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            BitCoin TurtleSnapBack
          </Link>
        </nav>
      </div>
    </header>
  );
}
