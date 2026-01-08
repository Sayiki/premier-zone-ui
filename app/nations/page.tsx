// src/app/nations/page.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

// Nations with their database codes and flag URLs
const nations = [
  { name: "England", code: "ENG", flag: "https://flagcdn.com/w80/gb-eng.png" },
  { name: "France", code: "FRA", flag: "https://flagcdn.com/w80/fr.png" },
  { name: "Brazil", code: "BRA", flag: "https://flagcdn.com/w80/br.png" },
  { name: "Spain", code: "ESP", flag: "https://flagcdn.com/w80/es.png" },
  { name: "Germany", code: "GER", flag: "https://flagcdn.com/w80/de.png" },
  { name: "Portugal", code: "POR", flag: "https://flagcdn.com/w80/pt.png" },
  { name: "Argentina", code: "ARG", flag: "https://flagcdn.com/w80/ar.png" },
  { name: "Netherlands", code: "NED", flag: "https://flagcdn.com/w80/nl.png" },
  { name: "Belgium", code: "BEL", flag: "https://flagcdn.com/w80/be.png" },
  { name: "Italy", code: "ITA", flag: "https://flagcdn.com/w80/it.png" },
  { name: "Scotland", code: "SCO", flag: "https://flagcdn.com/w80/gb-sct.png" },
  { name: "Wales", code: "WAL", flag: "https://flagcdn.com/w80/gb-wls.png" },
  { name: "Ireland", code: "IRL", flag: "https://flagcdn.com/w80/ie.png" },
  { name: "Northern Ireland", code: "NIR", flag: "https://flagcdn.com/w80/gb-nir.png", slug: "Northern-Ireland" },
  { name: "Denmark", code: "DEN", flag: "https://flagcdn.com/w80/dk.png" },
  { name: "Sweden", code: "SWE", flag: "https://flagcdn.com/w80/se.png" },
  { name: "Norway", code: "NOR", flag: "https://flagcdn.com/w80/no.png" },
  { name: "Switzerland", code: "SUI", flag: "https://flagcdn.com/w80/ch.png" },
  { name: "Croatia", code: "CRO", flag: "https://flagcdn.com/w80/hr.png" },
  { name: "Serbia", code: "SRB", flag: "https://flagcdn.com/w80/rs.png" },
  { name: "Poland", code: "POL", flag: "https://flagcdn.com/w80/pl.png" },
  { name: "Ukraine", code: "UKR", flag: "https://flagcdn.com/w80/ua.png" },
  { name: "Turkey", code: "TUR", flag: "https://flagcdn.com/w80/tr.png" },
  { name: "USA", code: "USA", flag: "https://flagcdn.com/w80/us.png" },
  { name: "Japan", code: "JPN", flag: "https://flagcdn.com/w80/jp.png" },
  { name: "South Korea", code: "KOR", flag: "https://flagcdn.com/w80/kr.png", slug: "South-Korea" },
  { name: "Australia", code: "AUS", flag: "https://flagcdn.com/w80/au.png" },
  { name: "Ghana", code: "GHA", flag: "https://flagcdn.com/w80/gh.png" },
  { name: "Nigeria", code: "NGA", flag: "https://flagcdn.com/w80/ng.png" },
  { name: "Senegal", code: "SEN", flag: "https://flagcdn.com/w80/sn.png" },
  { name: "Ivory Coast", code: "CIV", flag: "https://flagcdn.com/w80/ci.png", slug: "Ivory-Coast" },
  { name: "Morocco", code: "MAR", flag: "https://flagcdn.com/w80/ma.png" },
  { name: "Egypt", code: "EGY", flag: "https://flagcdn.com/w80/eg.png" },
  { name: "Cameroon", code: "CMR", flag: "https://flagcdn.com/w80/cm.png" },
  { name: "Colombia", code: "COL", flag: "https://flagcdn.com/w80/co.png" },
  { name: "Mexico", code: "MEX", flag: "https://flagcdn.com/w80/mx.png" },
  { name: "Uruguay", code: "URU", flag: "https://flagcdn.com/w80/uy.png" },
  { name: "Ecuador", code: "ECU", flag: "https://flagcdn.com/w80/ec.png" },
  { name: "Czech Republic", code: "CZE", flag: "https://flagcdn.com/w80/cz.png", slug: "Czech-Republic" },
  { name: "Austria", code: "AUT", flag: "https://flagcdn.com/w80/at.png" },
];

export default function NationsPage() {
  const [search, setSearch] = useState('');
  
  const filteredNations = nations.filter(nation => 
    nation.name.toLowerCase().includes(search.toLowerCase()) ||
    nation.code.toLowerCase().includes(search.toLowerCase())
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
          <Link href="/nations" className="text-purple-400">Nations</Link>
          <Link href="/positions" className="hover:text-purple-400 transition-colors">Positions</Link>
        </div>

        <div className="w-32"></div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-10 pb-10">
        <h1 className="text-3xl font-bold mb-2">Players by Nation</h1>
        <p className="text-gray-400 mb-4">Select a country to view their players in the Premier League</p>
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <input
            type="text"
            placeholder="Search nations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredNations.map((nation) => (
            <Link 
              key={nation.code} 
              href={`/nations/${nation.slug || nation.name}`}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 hover:bg-gray-800 transition-all group"
            >
              <div className="flex flex-col items-center gap-4">
                <img 
                  src={nation.flag} 
                  alt={nation.name}
                  className="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-semibold text-center">{nation.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}