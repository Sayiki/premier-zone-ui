// src/app/nations/[nationName]/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Nation data mapping display name -> database code and flag
const nationData: Record<string, { name: string; code: string; flag: string }> = {
  "England": { name: "England", code: "ENG", flag: "https://flagcdn.com/w80/gb-eng.png" },
  "France": { name: "France", code: "FRA", flag: "https://flagcdn.com/w80/fr.png" },
  "Brazil": { name: "Brazil", code: "BRA", flag: "https://flagcdn.com/w80/br.png" },
  "Spain": { name: "Spain", code: "ESP", flag: "https://flagcdn.com/w80/es.png" },
  "Germany": { name: "Germany", code: "GER", flag: "https://flagcdn.com/w80/de.png" },
  "Portugal": { name: "Portugal", code: "POR", flag: "https://flagcdn.com/w80/pt.png" },
  "Argentina": { name: "Argentina", code: "ARG", flag: "https://flagcdn.com/w80/ar.png" },
  "Netherlands": { name: "Netherlands", code: "NED", flag: "https://flagcdn.com/w80/nl.png" },
  "Belgium": { name: "Belgium", code: "BEL", flag: "https://flagcdn.com/w80/be.png" },
  "Italy": { name: "Italy", code: "ITA", flag: "https://flagcdn.com/w80/it.png" },
  "Scotland": { name: "Scotland", code: "SCO", flag: "https://flagcdn.com/w80/gb-sct.png" },
  "Wales": { name: "Wales", code: "WAL", flag: "https://flagcdn.com/w80/gb-wls.png" },
  "Ireland": { name: "Ireland", code: "IRL", flag: "https://flagcdn.com/w80/ie.png" },
  "Northern-Ireland": { name: "Northern Ireland", code: "NIR", flag: "https://flagcdn.com/w80/gb-nir.png" },
  "Denmark": { name: "Denmark", code: "DEN", flag: "https://flagcdn.com/w80/dk.png" },
  "Sweden": { name: "Sweden", code: "SWE", flag: "https://flagcdn.com/w80/se.png" },
  "Norway": { name: "Norway", code: "NOR", flag: "https://flagcdn.com/w80/no.png" },
  "Switzerland": { name: "Switzerland", code: "SUI", flag: "https://flagcdn.com/w80/ch.png" },
  "Croatia": { name: "Croatia", code: "CRO", flag: "https://flagcdn.com/w80/hr.png" },
  "Serbia": { name: "Serbia", code: "SRB", flag: "https://flagcdn.com/w80/rs.png" },
  "Poland": { name: "Poland", code: "POL", flag: "https://flagcdn.com/w80/pl.png" },
  "Ukraine": { name: "Ukraine", code: "UKR", flag: "https://flagcdn.com/w80/ua.png" },
  "Turkey": { name: "Turkey", code: "TUR", flag: "https://flagcdn.com/w80/tr.png" },
  "USA": { name: "USA", code: "USA", flag: "https://flagcdn.com/w80/us.png" },
  "Japan": { name: "Japan", code: "JPN", flag: "https://flagcdn.com/w80/jp.png" },
  "South-Korea": { name: "South Korea", code: "KOR", flag: "https://flagcdn.com/w80/kr.png" },
  "Australia": { name: "Australia", code: "AUS", flag: "https://flagcdn.com/w80/au.png" },
  "Ghana": { name: "Ghana", code: "GHA", flag: "https://flagcdn.com/w80/gh.png" },
  "Nigeria": { name: "Nigeria", code: "NGA", flag: "https://flagcdn.com/w80/ng.png" },
  "Senegal": { name: "Senegal", code: "SEN", flag: "https://flagcdn.com/w80/sn.png" },
  "Ivory-Coast": { name: "Ivory Coast", code: "CIV", flag: "https://flagcdn.com/w80/ci.png" },
  "Morocco": { name: "Morocco", code: "MAR", flag: "https://flagcdn.com/w80/ma.png" },
  "Egypt": { name: "Egypt", code: "EGY", flag: "https://flagcdn.com/w80/eg.png" },
  "Cameroon": { name: "Cameroon", code: "CMR", flag: "https://flagcdn.com/w80/cm.png" },
  "Colombia": { name: "Colombia", code: "COL", flag: "https://flagcdn.com/w80/co.png" },
  "Mexico": { name: "Mexico", code: "MEX", flag: "https://flagcdn.com/w80/mx.png" },
  "Uruguay": { name: "Uruguay", code: "URU", flag: "https://flagcdn.com/w80/uy.png" },
  "Ecuador": { name: "Ecuador", code: "ECU", flag: "https://flagcdn.com/w80/ec.png" },
  "Czech-Republic": { name: "Czech Republic", code: "CZE", flag: "https://flagcdn.com/w80/cz.png" },
  "Austria": { name: "Austria", code: "AUT", flag: "https://flagcdn.com/w80/at.png" },
};

interface Player {
  name: string;
  nation: string;
  pos: string;
  age: number;
  mp: number;
  starts: number;
  min: number;
  gls: number;
  ast: number;
  pk: number;
  crdy: number;
  crdr: number;
  xg: number;
  xag: number;
  team: string;
}

export default function NationDetailPage() {
  const params = useParams();
  const nationName = params.nationName as string;
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nation = nationData[nationName] || { 
    name: nationName.replace(/-/g, ' '), 
    code: nationName.toUpperCase(), 
    flag: '' 
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Use the nation code for the API query
        const res = await fetch(`/api/player?nation=${encodeURIComponent(nation.code)}`);
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else if (Array.isArray(data)) {
          // Filter out "Squad Total" entries and sort by minutes played
          const filtered = data
            .filter((p: Player) => p.name && p.name !== 'Squad Total')
            .sort((a: Player, b: Player) => (b.min || 0) - (a.min || 0));
          setPlayers(filtered);
        }
      } catch (err) {
        setError('Failed to fetch players');
      }
      setLoading(false);
    };

    fetchPlayers();
  }, [nation.code]);

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
        {/* Back Button */}
        <div className="flex items-center gap-6 mb-8">
          <Link href="/nations" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Nations
          </Link>
        </div>

        {/* Nation Header */}
        <div className="flex items-center gap-6 mb-8">
          {nation.flag && (
            <img src={nation.flag} alt={nation.name} className="w-24 h-16 object-cover rounded-lg shadow-lg" />
          )}
          <div>
            <h1 className="text-4xl font-bold">{nation.name}</h1>
            <p className="text-gray-400 mt-1">{players.length} Players in Premier League</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-400">Loading players...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Players Table */}
        {!loading && !error && players.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="px-4 py-3 font-semibold">Player</th>
                  <th className="px-4 py-3 font-semibold">Team</th>
                  <th className="px-4 py-3 font-semibold">Pos</th>
                  <th className="px-4 py-3 font-semibold text-center">Age</th>
                  <th className="px-4 py-3 font-semibold text-center">MP</th>
                  <th className="px-4 py-3 font-semibold text-center">Starts</th>
                  <th className="px-4 py-3 font-semibold text-center">Min</th>
                  <th className="px-4 py-3 font-semibold text-center">Gls</th>
                  <th className="px-4 py-3 font-semibold text-center">Ast</th>
                  <th className="px-4 py-3 font-semibold text-center">G+A</th>
                  <th className="px-4 py-3 font-semibold text-center">xG</th>
                  <th className="px-4 py-3 font-semibold text-center">xAG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {players.map((player, index) => (
                  <tr 
                    key={`${player.name}-${player.team}-${index}`} 
                    className="hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{player.name}</td>
                    <td className="px-4 py-3 text-gray-400">{player.team}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs font-medium">
                        {player.pos || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-300">{player.age || '-'}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{player.mp || 0}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{player.starts || 0}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{player.min?.toLocaleString() || 0}</td>
                    <td className="px-4 py-3 text-center font-semibold text-green-400">{player.gls || 0}</td>
                    <td className="px-4 py-3 text-center font-semibold text-blue-400">{player.ast || 0}</td>
                    <td className="px-4 py-3 text-center font-semibold text-yellow-400">
                      {((player.gls || 0) + (player.ast || 0))}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-300">{player.xg?.toFixed(1) || '-'}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{player.xag?.toFixed(1) || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && players.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No players found from this nation</p>
          </div>
        )}
      </div>
    </div>
  );
}
