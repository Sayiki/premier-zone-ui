// src/app/positions/page.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

// Positions with Premier League action images
const positions = [
  { 
    code: "GK", 
    name: "Goalkeeper", 
    description: "Last line of defense",
    image: "/images/GK.jpg",
    bgColor: "from-red-600 to-red-800"
  },
  { 
    code: "DF", 
    name: "Defender", 
    description: "Defensive specialists",
    image: "/images/DF.jpg",
    bgColor: "from-red-600 to-orange-500"
  },
  { 
    code: "MF", 
    name: "Midfielder", 
    description: "Engine of the team",
    image: "/images/MF.jpg",
    bgColor: "from-red-800 to-black"
  },
  { 
    code: "FW", 
    name: "Forward", 
    description: "Goal scorers",
    image: "/images/FW.jpg",
    bgColor: "from-sky-400 to-blue-600"
  },
];

export default function PositionsPage() {
  const [search, setSearch] = useState('');
  
  const filteredPositions = positions.filter(position => 
    position.name.toLowerCase().includes(search.toLowerCase()) ||
    position.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <Link href="/" className="font-bold text-lg">Premier Zone</Link>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link href="/teams" className="hover:text-purple-400 transition-colors">Teams</Link>
          <Link href="/nations" className="hover:text-purple-400 transition-colors">Nations</Link>
          <Link href="/positions" className="text-purple-400">Positions</Link>
        </div>

        <div className="w-32"></div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-10 pb-10">
        <h1 className="text-3xl font-bold mb-2">Players by Position</h1>
        <p className="text-gray-400 mb-4">Select a position to view players</p>
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <input
            type="text"
            placeholder="Search positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filteredPositions.map((position, index) => (
            <Link 
              key={position.code} 
              href={`/positions/${position.code}`}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
                group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/30">
                
                {/* Inner card */}
                <div className="relative h-48 md:h-56 rounded-xl overflow-hidden">
                  {/* Player image */}
                  <img 
                    src={position.image} 
                    alt={position.name}
                    className="absolute inset-0 w-full h-full object-cover
                      transition-transform duration-500 ease-out
                      group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Position info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <span className="font-bold text-2xl md:text-3xl block text-white drop-shadow-lg
                      transition-transform duration-300 group-hover:scale-110">
                      {position.code}
                    </span>
                    <span className="text-gray-300 text-sm">{position.name}</span>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-r from-transparent via-white/10 to-transparent
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}