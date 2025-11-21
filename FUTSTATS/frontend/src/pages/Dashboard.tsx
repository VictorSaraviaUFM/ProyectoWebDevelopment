import { Trophy, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BackgroundParticles from "@/components/BackgroundParticles";
import PlayerCard from "@/components/PlayerCard";
import TeamCard from "@/components/TeamCard";
import MatchCard from "@/components/MatchCard";
import StatsTable from "@/components/StatsTable";
import { apiService } from "@/api";
import { useEffect, useState } from "react";

// Mantenemos matches como mock por ahora (no hay endpoint)
const mockMatches = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Arsenal", 
    homeScore: 2,
    awayScore: 1,
    date: "2024-03-31",
    status: "finished" as const,
    homeLogo: "/placeholder.svg",
    awayLogo: "/placeholder.svg"
  },
  {
    id: 2,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 3,
    awayScore: 2,
    date: "2024-04-21",
    status: "live" as const,
    homeLogo: "/placeholder.svg", 
    awayLogo: "/placeholder.svg"
  }
];

const Dashboard = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersData, teamsData] = await Promise.all([
          apiService.getPlayers(),
          apiService.getTeams()
        ]);
        setPlayers(playersData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const topPlayers = players.slice(0, 3);
  const recentMatches = mockMatches.filter(m => m.status === "finished").slice(0, 2);
  const liveMatches = mockMatches.filter(m => m.status === "live");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gradient text-xl">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">{teams.length}</div>
                <div className="text-sm text-muted-foreground">Equipos</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-accent flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{players.length}</div>
                <div className="text-sm text-muted-foreground">Jugadores</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-card flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1,284</div>
                <div className="text-sm text-muted-foreground">Partidos</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{liveMatches.length}</div>
                <div className="text-sm text-muted-foreground">En Vivo</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-gradient-primary text-white border-0 animate-pulse">
                <Zap className="h-3 w-3 mr-1" />
                EN VIVO
              </Badge>
              <h2 className="text-2xl font-bold text-foreground">Partidos en Directo</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {/* Top Players */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Top Jugadores</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topPlayers.map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </div>

        {/* Teams */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Equipos Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teams.slice(0, 3).map((team) => (
              <TeamCard key={team._id} team={team} />
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Partidos Recientes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* League Table */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Tabla de Clasificación</h2>
          <StatsTable teams={teams} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;