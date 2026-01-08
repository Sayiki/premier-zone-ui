// src/app/positions/[positionCode]/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Position data
const positionData: Record<string, { name: string; description: string; image: string }> = {
  "GK": { 
    name: "Goalkeepers", 
    description: "Last line of defense",
    image: "/images/GK.jpg"
  },
  "DF": { 
    name: "Defenders", 
    description: "Defensive specialists",
    image: "/images/DF.jpg"
  },
  "MF": { 
    name: "Midfielders", 
    description: "Engine of the team",
    image: "/images/MF.jpg"
  },
  "FW": { 
    name: "Forwards", 
    description: "Goal scorers",
    image: "/images/FW.jpg"
  },
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

export default function PositionDetailPage() {
  const params = useParams();
  const positionCode = (params.positionCode as string).toUpperCase();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const position = positionData[positionCode] || { 
    name: positionCode, 
    description: "Players",
    image: ""
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`/api/player?position=${encodeURIComponent(positionCode)}`);
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else if (Array.isArray(data)) {
          // Filter out "Squad Total" entries and sort by goals then minutes
          const filtered = data
            .filter((p: Player) => p.name && p.name !== 'Squad Total')
            .sort((a: Player, b: Player) => {
              // Sort by goals first, then by minutes
              if ((b.gls || 0) !== (a.gls || 0)) {
                return (b.gls || 0) - (a.gls || 0);
              }
              return (b.min || 0) - (a.min || 0);
            });
          setPlayers(filtered);
        }
      } catch (err) {
        setError('Failed to fetch players');
      }
      setLoading(false);
    };

    fetchPlayers();
  }, [positionCode]);

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
        {/* Back Button */}
        <div className="flex items-center gap-6 mb-8">
          <Link href="/positions" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Positions
          </Link>
        </div>

        {/* Position Header */}
        <div className="flex items-center gap-6 mb-8">
          {position.image && (
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-900 to-gray-900">
              <img src={position.image} alt={position.name} className="w-full h-full object-cover object-top" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold">{position.name}</h1>
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
                  <th className="px-4 py-3 font-semibold">Nation</th>
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
                    <td className="px-4 py-3 text-gray-400">{player.nation?.split(' ').pop() || player.nation}</td>
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
            <p className="text-gray-500">No players found for this position</p>
          </div>
        )}
      </div>
    </div>
  );
}
