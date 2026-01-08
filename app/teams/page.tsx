// src/app/teams/page.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

// 2025/2026 Premier League Teams with HD logos
const teams = [
  { name: "Arsenal", logo: "https://crests.football-data.org/57.png" },
  { name: "Aston Villa", logo: "https://crests.football-data.org/58.png", slug: "Aston-Villa" },
  { name: "Bournemouth", logo: "https://crests.football-data.org/1044.png" },
  { name: "Brentford", logo: "https://crests.football-data.org/402.png" },
  { name: "Brighton", logo: "https://crests.football-data.org/397.png" },
  { name: "Burnley", logo: "https://crests.football-data.org/328.png" },
  { name: "Chelsea", logo: "https://crests.football-data.org/61.png" },
  { name: "Crystal Palace", logo: "https://crests.football-data.org/354.png", slug: "Crystal-Palace" },
  { name: "Everton", logo: "https://crests.football-data.org/62.png" },
  { name: "Fulham", logo: "https://crests.football-data.org/63.png" },
  { name: "Leeds United", logo: "https://crests.football-data.org/341.png", slug: "Leeds-United" },
  { name: "Liverpool", logo: "https://crests.football-data.org/64.png" },
  { name: "Manchester City", logo: "https://crests.football-data.org/65.png", slug: "Manchester-City" },
  { name: "Manchester United", logo: "https://crests.football-data.org/66.png", slug: "Manchester-United" },
  { name: "Newcastle United", logo: "https://crests.football-data.org/67.png", slug: "Newcastle-United" },
  { name: "Nottingham Forest", logo: "https://crests.football-data.org/351.png", slug: "Nottingham-Forest" },
  { name: "Sunderland", logo: "https://crests.football-data.org/71.png" },
  { name: "Tottenham", logo: "https://crests.football-data.org/73.png" },
  { name: "West Ham", logo: "https://crests.football-data.org/563.png", slug: "West-Ham" },
  { name: "Wolverhampton", logo: "https://crests.football-data.org/76.png", slug: "Wolverhampton-Wanderers" },
];

export default function TeamsPage() {
  const [search, setSearch] = useState('');
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(search.toLowerCase())
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
          <Link href="/teams" className="text-purple-400">Teams</Link>
          <Link href="/nations" className="hover:text-purple-400 transition-colors">Nations</Link>
          <Link href="/positions" className="hover:text-purple-400 transition-colors">Positions</Link>
        </div>

        <div className="w-32"></div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-10 pb-10">
        <h1 className="text-3xl font-bold mb-2">Premier League Teams</h1>
        <p className="text-gray-400 mb-4">Select a team to view their squad</p>
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredTeams.map((team) => (
            <Link 
              key={team.name} 
              href={`/teams/${team.slug || team.name}`}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 hover:bg-gray-800 transition-all group"
            >
              <div className="flex flex-col items-center gap-4">
                <img 
                  src={team.logo} 
                  alt={team.name}
                  className="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-semibold text-center">{team.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}