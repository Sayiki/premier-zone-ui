// src/app/teams/[teamName]/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Team data with HD logos - 2025/2026 Premier League
// Maps URL slug -> { display name, logo, database team name }
const teamData: Record<string, { name: string; logo: string; dbName: string }> = {
  "Arsenal": { name: "Arsenal", logo: "https://crests.football-data.org/57.png", dbName: "Arsenal" },
  "Aston-Villa": { name: "Aston Villa", logo: "https://crests.football-data.org/58.png", dbName: "Aston Villa" },
  "Bournemouth": { name: "Bournemouth", logo: "https://crests.football-data.org/1044.png", dbName: "Bournemouth" },
  "Brentford": { name: "Brentford", logo: "https://crests.football-data.org/402.png", dbName: "Brentford" },
  "Brighton": { name: "Brighton", logo: "https://crests.football-data.org/397.png", dbName: "Brighton" },
  "Burnley": { name: "Burnley", logo: "https://crests.football-data.org/328.png", dbName: "Burnley" },
  "Chelsea": { name: "Chelsea", logo: "https://crests.football-data.org/61.png", dbName: "Chelsea" },
  "Crystal-Palace": { name: "Crystal Palace", logo: "https://crests.football-data.org/354.png", dbName: "Crystal Palace" },
  "Everton": { name: "Everton", logo: "https://crests.football-data.org/62.png", dbName: "Everton" },
  "Fulham": { name: "Fulham", logo: "https://crests.football-data.org/63.png", dbName: "Fulham" },
  "Leeds-United": { name: "Leeds United", logo: "https://crests.football-data.org/341.png", dbName: "Leeds United" },
  "Liverpool": { name: "Liverpool", logo: "https://crests.football-data.org/64.png", dbName: "Liverpool" },
  "Manchester-City": { name: "Manchester City", logo: "https://crests.football-data.org/65.png", dbName: "Manchester City" },
  "Manchester-United": { name: "Manchester United", logo: "https://crests.football-data.org/66.png", dbName: "Manchester Utd" },
  "Newcastle-United": { name: "Newcastle United", logo: "https://crests.football-data.org/67.png", dbName: "Newcastle Utd" },
  "Nottingham-Forest": { name: "Nottingham Forest", logo: "https://crests.football-data.org/351.png", dbName: "Nott'ham Forest" },
  "Sunderland": { name: "Sunderland", logo: "https://crests.football-data.org/71.png", dbName: "Sunderland" },
  "Tottenham": { name: "Tottenham", logo: "https://crests.football-data.org/73.png", dbName: "Tottenham" },
  "West-Ham": { name: "West Ham", logo: "https://crests.football-data.org/563.png", dbName: "West Ham" },
  "Wolverhampton-Wanderers": { name: "Wolverhampton Wanderers", logo: "https://crests.football-data.org/76.png", dbName: "Wolves" },
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

export default function TeamDetailPage() {
  const params = useParams();
  const teamName = params.teamName as string;
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const team = teamData[teamName] || { name: teamName.replace(/-/g, ' '), logo: '', dbName: teamName.replace(/-/g, ' ') };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Use the database team name for the API query
        const dbTeamName = team.dbName;
        const res = await fetch(`/api/player?team=${encodeURIComponent(dbTeamName)}`);
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
  }, [teamName]);

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
        {/* Team Header */}
        <div className="flex items-center gap-6 mb-8">
          <Link href="/teams" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Teams
          </Link>
        </div>

        <div className="flex items-center gap-6 mb-8">
          {team.logo && (
            <img src={team.logo} alt={team.name} className="w-24 h-24 object-contain" />
          )}
          <div>
            <h1 className="text-4xl font-bold">{team.name}</h1>
            <p className="text-gray-400 mt-1">{players.length} Players</p>
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
                  <th className="px-4 py-3 font-semibold">Nation</th>
                  <th className="px-4 py-3 font-semibold">Pos</th>
                  <th className="px-4 py-3 font-semibold text-center">Age</th>
                  <th className="px-4 py-3 font-semibold text-center">MP</th>
                  <th className="px-4 py-3 font-semibold text-center">Starts</th>
                  <th className="px-4 py-3 font-semibold text-center">Min</th>
                  <th className="px-4 py-3 font-semibold text-center">Gls</th>
                  <th className="px-4 py-3 font-semibold text-center">Ast</th>
                  <th className="px-4 py-3 font-semibold text-center">G+A</th>
                  <th className="px-4 py-3 font-semibold text-center">PK</th>
                  <th className="px-4 py-3 font-semibold text-center">YC</th>
                  <th className="px-4 py-3 font-semibold text-center">RC</th>
                  <th className="px-4 py-3 font-semibold text-center">xG</th>
                  <th className="px-4 py-3 font-semibold text-center">xAG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {players.map((player, index) => (
                  <tr 
                    key={`${player.name}-${index}`} 
                    className="hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{player.name}</td>
                    <td className="px-4 py-3 text-gray-400">{player.nation?.split(' ').pop() || '-'}</td>
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
                    <td className="px-4 py-3 text-center text-gray-300">{player.pk || 0}</td>
                    <td className="px-4 py-3 text-center text-yellow-500">{player.crdy || 0}</td>
                    <td className="px-4 py-3 text-center text-red-500">{player.crdr || 0}</td>
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
            <p className="text-gray-500">No players found for this team</p>
          </div>
        )}
      </div>
    </div>
  );
}
