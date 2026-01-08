// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <span className="font-bold text-lg">Premier Zone</span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link href="/teams" className="hover:text-purple-400 transition-colors">
            Teams
          </Link>
          <Link href="/nations" className="hover:text-purple-400 transition-colors">
            Nations
          </Link>
          <Link href="/positions" className="hover:text-purple-400 transition-colors">
            Positions
          </Link>
        </div>

        <div className="w-32"></div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-16">
        {/* Date Badge */}
        <div className="mb-8">
          <span className="bg-purple-900/60 text-purple-300 px-6 py-2 rounded-full text-sm font-medium border border-purple-700">
            Premier League 2025/26
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-7xl md:text-8xl font-black text-center mb-2 tracking-tight">
          PREMIER
        </h1>
        <h1 className="text-7xl md:text-8xl font-black text-center mb-4 tracking-tight">
          ZONE
        </h1>
        
        {/* Gradient Subtitle */}
        <h2 className="text-6xl md:text-7xl font-black text-center mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent tracking-tight italic pb-4 pr-4 overflow-visible">
          DATABASE
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center max-w-xl mb-10 text-lg">
          A Premier League Statistic Website
        </p>

        {/* CTA Button */}
        <Link href="/teams">
          <button className="bg-white hover:bg-gray-100 text-black px-10 py-4 rounded-xl font-semibold transition-all duration-300 text-lg cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-95">
            Get Started
          </button>
        </Link>
      </main>
    </div>
  );
}