import { Users, TrendingUp, Target, Search, Filter, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlayerCard from "@/components/PlayerCard";
import { apiService } from "@/api";
import { useAuth } from "@/contexts/AuthContexts";
import { useEffect, useState } from "react";

const Players = () => {
  const { user } = useAuth();
  const [players, setPlayers] = useState<any[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await apiService.getPlayers();
        setPlayers(playersData);
        setFilteredPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filtrar jugadores
  useEffect(() => {
    let filtered = players;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por posición
    if (positionFilter !== "all") {
      filtered = filtered.filter(player => player.position === positionFilter);
    }

    // Filtro por equipo
    if (teamFilter !== "all") {
      filtered = filtered.filter(player => player.team === teamFilter);
    }

    setFilteredPlayers(filtered);
  }, [searchTerm, positionFilter, teamFilter, players]);

  const handleAddFavorite = async (playerId: string) => {
    if (!user) return;
    
    try {
      // En una implementación real, llamaríamos a la API
      console.log('Agregando jugador favorito:', playerId);
      // await apiService.addFavoritePlayer(playerId);
      
      // Por ahora, solo mostramos un mensaje
      alert(`¡${players.find(p => p._id === playerId)?.name} agregado a favoritos!`);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  // Obtener posiciones y equipos únicos para los filtros
  const positions = [...new Set(players.map(p => p.position))];
  const teams = [...new Set(players.map(p => p.team))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gradient text-xl">Cargando jugadores...</div>
      </div>
    );
  }

  const topScorer = players.reduce((prev, current) => 
    prev.goals > current.goals ? prev : current
  );
  
  const topAssister = players.reduce((prev, current) => 
    prev.assists > current.assists ? prev : current
  );
  
  const topRated = players.reduce((prev, current) => 
    prev.rating > current.rating ? prev : current
  );
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Jugadores</h1>
            <p className="text-muted-foreground">Estadísticas y rankings en tiempo real</p>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-5 w-5" />
                <span className="text-sm">Máximo Goleador</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{topScorer.name}</p>
              <p className="text-3xl font-bold text-primary">{topScorer.goals} goles</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Máximo Asistente</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{topAssister.name}</p>
              <p className="text-3xl font-bold text-info">{topAssister.assists} asistencias</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span className="text-sm">Mejor Calificado</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{topRated.name}</p>
              <p className="text-3xl font-bold text-warning">{topRated.rating} rating</p>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card border-white/10 shadow-glass p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filtros y Búsqueda</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar jugador o equipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>

              {/* Filtro por posición */}
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="all">Todas las posiciones</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>

              {/* Filtro por equipo */}
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="all">Todos los equipos</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* Resultados del filtro */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredPlayers.length} de {players.length} jugadores
              </div>
              {(searchTerm || positionFilter !== "all" || teamFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setPositionFilter("all");
                    setTeamFilter("all");
                  }}
                  className="border-primary/30"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* All Players */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {filteredPlayers.length === players.length ? 'Todos los Jugadores' : 'Jugadores Filtrados'}
          </h2>
          
          {filteredPlayers.length === 0 ? (
            <Card className="glass-card border-white/10 shadow-glass p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron jugadores</h3>
              <p className="text-muted-foreground">Intenta con otros términos de búsqueda o filtros</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map(player => (
                <div key={player._id} className="relative group">
                  <PlayerCard player={player} />
                  {user && (
                    <Button
                      size="sm"
                      onClick={() => handleAddFavorite(player._id)}
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

export default Players;