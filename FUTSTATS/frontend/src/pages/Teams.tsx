import { Trophy, Search, Filter, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TeamCard from "@/components/TeamCard";
import StatsTable from "@/components/StatsTable";
import { apiService } from "@/api";
import { useAuth } from "@/contexts/AuthContexts";
import { useEffect, useState } from "react";

const Teams = () => {
  const { user, addFavoriteTeam } = useAuth();
  const [teams, setTeams] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("all");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await apiService.getTeams();
        setTeams(teamsData);
        setFilteredTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Filtrar equipos
  useEffect(() => {
    let filtered = teams;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por liga (simulado basado en posición)
    if (leagueFilter !== "all") {
      if (leagueFilter === "premier") {
        filtered = filtered.filter(team => 
          ["Manchester City", "Arsenal", "Liverpool"].includes(team.name)
        );
      } else if (leagueFilter === "laliga") {
        filtered = filtered.filter(team => 
          ["Real Madrid", "Barcelona"].includes(team.name)
        );
      }
    }

    setFilteredTeams(filtered);
  }, [searchTerm, leagueFilter, teams]);

  const handleAddFavorite = async (teamId: string) => {
  if (!user) return;
  
  const team = teams.find(t => t._id === teamId || t.id?.toString() === teamId);
  if (team) {
    addFavoriteTeam(team);
    alert(`¡${team.name} agregado a favoritos!`);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gradient text-xl">Cargando equipos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Equipos</h1>
            <p className="text-muted-foreground">Estadísticas completas y clasificaciones</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card border-white/10 shadow-glass p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filtros y Búsqueda</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar equipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>

              {/* Filtro por liga */}
              <select
                value={leagueFilter}
                onChange={(e) => setLeagueFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="all">Todas las ligas</option>
                <option value="premier">Premier League</option>
                <option value="laliga">La Liga</option>
                <option value="bundesliga">Bundesliga</option>
              </select>
            </div>

            {/* Resultados del filtro */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredTeams.length} de {teams.length} equipos
              </div>
              {(searchTerm || leagueFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setLeagueFilter("all");
                  }}
                  className="border-primary/30"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* League Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Tabla de Clasificación</h2>
          <StatsTable teams={teams} />
        </section>

        {/* Team Cards Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {filteredTeams.length === teams.length ? 'Todos los Equipos' : 'Equipos Filtrados'}
          </h2>
          
          {filteredTeams.length === 0 ? (
            <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron equipos</h3>
              <p className="text-muted-foreground">Intenta con otros términos de búsqueda o filtros</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map(team => (
                <div key={team._id} className="relative group">
                  <TeamCard team={team} />
                  {user && (
                    <Button
                      size="sm"
                      onClick={() => handleAddFavorite(team._id)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-primary text-white hover:opacity-90"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Favorito
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Teams;