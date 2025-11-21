import { Trophy, TrendingUp, Users, Zap, Calendar, Loader2, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackgroundParticles from "@/components/BackgroundParticles";
import PlayerCard from "@/components/PlayerCard";
import TeamCard from "@/components/TeamCard";
import MatchCard from "@/components/MatchCard";
import StatsTable from "@/components/StatsTable";
import { apiService } from "@/api";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);
  const [topScorers, setTopScorers] = useState<any[]>([]);
  const [featuredTeams, setFeaturedTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('premier');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          playersData, 
          featuredTeamsData, 
          scorersData,
          liveData,
          upcomingData,
          standingsData
        ] = await Promise.all([
          apiService.getPlayers(),
          apiService.getFeaturedTeams(),
          apiService.getTopScorers('PL', 6),
          apiService.getLiveMatches(),
          apiService.getUpcomingMatches('premier_league'),
          apiService.getStandings('PL')
        ]);
        
        setPlayers(playersData);
        setFeaturedTeams(featuredTeamsData);
        setTopScorers(scorersData);
        setLiveMatches(liveData);
        setUpcomingMatches(upcomingData);
        setStandings(standingsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchMatchesData = async (competition: string) => {
    setMatchesLoading(true);
    try {
      const [liveData, upcomingData, standingsData, scorersData] = await Promise.all([
        apiService.getLiveMatches(),
        apiService.getUpcomingMatches(competition),
        apiService.getStandings(getCompetitionCode(competition)),
        apiService.getTopScorers(getCompetitionCode(competition), 6)
      ]);
      
      // Solo mostrar partidos en vivo reales (no mocks)
      const realLiveMatches = liveData.filter((match: any) => 
        match.status === 'LIVE' && match.competition
      );
      
      setLiveMatches(realLiveMatches);
      setUpcomingMatches(upcomingData);
      setStandings(standingsData);
      setTopScorers(scorersData);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setMatchesLoading(false);
    }
  };

  const getCompetitionCode = (competition: string) => {
    const codes: { [key: string]: string } = {
      'premier_league': 'PL',
      'la_liga': 'PD',
      'serie_a': 'SA',
      'bundesliga': 'BL1',
      'ligue_1': 'FL1',
      'champions_league': 'CL'
    };
    return codes[competition] || 'PL';
  };

  const handleLeagueChange = async (league: string) => {
    setSelectedLeague(league);
    
    const competitionMap: { [key: string]: string } = {
      'premier': 'premier_league',
      'laliga': 'la_liga',
      'seriea': 'serie_a',
      'bundesliga': 'bundesliga',
      'ligue1': 'ligue_1',
      'champions': 'champions_league'
    };

    if (competitionMap[league]) {
      await fetchMatchesData(competitionMap[league]);
    }
  };

  const getCompetitionName = (league: string) => {
    const names: { [key: string]: string } = {
      'premier': 'Premier League',
      'laliga': 'La Liga',
      'seriea': 'Serie A',
      'bundesliga': 'Bundesliga',
      'ligue1': 'Ligue 1',
      'champions': 'Champions League'
    };
    return names[league] || 'Premier League';
  };

  const formatMatchData = (match: any) => {
    return {
      id: match.id,
      homeTeam: match.homeTeam?.name || match.teams?.home?.name || 'TBD',
      awayTeam: match.awayTeam?.name || match.teams?.away?.name || 'TBD',
      homeScore: match.score?.fullTime?.home ?? match.goals?.home ?? 0,
      awayScore: match.score?.fullTime?.away ?? match.goals?.away ?? 0,
      date: match.utcDate || match.fixture?.date,
      status: match.status?.toLowerCase() || 'upcoming',
      homeLogo: match.homeTeam?.crest || match.teams?.home?.logo,
      awayLogo: match.awayTeam?.crest || match.teams?.away?.logo,
      league: match.competition?.name,
      minute: match.minute,
      time: match.utcDate ? new Date(match.utcDate).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) : ''
    };
  };

  const formatPlayerData = (scorer: any) => {
    return {
      _id: scorer.player?.id,
      name: scorer.player?.name,
      team: scorer.team?.name,
      position: 'Forward',
      goals: scorer.goals || 0,
      assists: scorer.assists || 0,
      matches: scorer.playedMatches || 30,
      rating: Math.min(10, (scorer.goals || 0) / 3 + 8),
      nationality: scorer.player?.nationality,
      image: scorer.team?.crest
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-gradient text-xl">
          <Loader2 className="h-6 w-6 animate-spin" />
          Cargando datos en tiempo real...
        </div>
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
                <div className="text-2xl font-bold text-gradient">{featuredTeams.length}</div>
                <div className="text-sm text-muted-foreground">Equipos Top</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-accent flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{topScorers.length}</div>
                <div className="text-sm text-muted-foreground">Goleadores</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-card flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{liveMatches.length}</div>
                <div className="text-sm text-muted-foreground">En Vivo</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/10 shadow-glass p-6 hover:scale-105 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{upcomingMatches.length}</div>
                <div className="text-sm text-muted-foreground">Próximos</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live & Upcoming Matches Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Partidos - {getCompetitionName(selectedLeague)}</h2>
            <div className="flex gap-2 flex-wrap">
              {['premier', 'laliga', 'seriea', 'bundesliga', 'ligue1', 'champions'].map((league) => (
                <Button 
                  key={league}
                  variant={selectedLeague === league ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLeagueChange(league)}
                  className={selectedLeague === league ? "bg-gradient-primary text-white" : "border-primary/30"}
                  disabled={matchesLoading}
                >
                  {matchesLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : getCompetitionName(league)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Live Matches - Solo mostrar si hay partidos reales */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-destructive text-white border-0 animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  EN VIVO
                </Badge>
                <h3 className="text-xl font-bold text-foreground">Partidos en Directo</h3>
              </div>
              
              {matchesLoading ? (
                <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Cargando partidos...</p>
                </Card>
              ) : liveMatches.length > 0 ? (
                <div className="space-y-4">
                  {liveMatches.map((match) => (
                    <MatchCard key={match.id} match={formatMatchData(match)} />
                  ))}
                </div>
              ) : (
                <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No hay partidos en vivo</h3>
                  <p className="text-muted-foreground">No hay partidos en curso en este momento</p>
                </Card>
              )}
            </div>

            {/* Upcoming Matches */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-accent text-accent-foreground border-0">
                  <Calendar className="h-3 w-3 mr-1" />
                  PRÓXIMOS
                </Badge>
                <h3 className="text-xl font-bold text-foreground">Próximos Partidos</h3>
              </div>
              
              {matchesLoading ? (
                <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Cargando partidos...</p>
                </Card>
              ) : upcomingMatches.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMatches.slice(0, 3).map((match) => (
                    <MatchCard key={match.id} match={formatMatchData(match)} />
                  ))}
                </div>
              ) : (
                <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No hay partidos próximos</h3>
                  <p className="text-muted-foreground">No hay partidos programados para esta liga</p>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Top Scorers from API */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Máximos Goleadores - {getCompetitionName(selectedLeague)}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topScorers.map((scorer) => (
              <PlayerCard 
                key={scorer.player?.id} 
                player={formatPlayerData(scorer)}
                showFavoriteButton={true}
              />
            ))}
          </div>
        </div>

        {/* Featured Teams from API */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Equipos Líderes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTeams.map((team) => (
              <TeamCard 
                key={team.team.id} 
                team={{
                  _id: team.team.id,
                  name: team.team.name,
                  logo: team.team.crest,
                  wins: team.won || 0,
                  draws: team.draw || 0,
                  losses: team.lost || 0,
                  points: team.points || 0,
                  goalsFor: team.goalsFor || 0,
                  goalsAgainst: team.goalsAgainst || 0,
                  position: team.position || 1
                }}
                showFavoriteButton={true}
              />
            ))}
          </div>
        </div>

        {/* League Table with Real Data */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Tabla de {getCompetitionName(selectedLeague)}
            </h2>
          </div>
          
          {standings.length > 0 ? (
            <StatsTable teams={standings.map(team => ({
              _id: team.team.id,
              name: team.team.name,
              logo: team.team.crest,
              wins: team.won,
              draws: team.draw,
              losses: team.lost,
              points: team.points,
              goalsFor: team.goalsFor,
              goalsAgainst: team.goalsAgainst,
              position: team.position
            }))} />
          ) : (
            <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Cargando tabla de posiciones...</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;