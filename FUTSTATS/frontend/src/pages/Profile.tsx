import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Star, User, LogOut, Search, Plus, X } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";
import { useAuth } from "@/contexts/AuthContexts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "@/api";

const Profile = () => {
  const { user, logout, addFavoritePlayer, addFavoriteTeam, removeFavoritePlayer, removeFavoriteTeam } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showTeamSearch, setShowTeamSearch] = useState(false);
  const [showPlayerSearch, setShowPlayerSearch] = useState(false);
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const [allTeams, setAllTeams] = useState<any[]>([]);
  const [allPlayers, setAllPlayers] = useState<any[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    bio: user?.bio || "",
    avatar: user?.avatar || ""
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsData = await apiService.getAllTeams();
        setAllTeams(teamsData);
        setFilteredTeams(teamsData.slice(0, 10)); // Mostrar primeros 10 por defecto
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTeams();
    }
  }, [user]);

  // Filtrar equipos basado en búsqueda
  useEffect(() => {
    if (teamSearchTerm) {
      const filtered = allTeams.filter(team =>
        team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
      );
      setFilteredTeams(filtered.slice(0, 10));
    } else {
      setFilteredTeams(allTeams.slice(0, 10));
    }
  }, [teamSearchTerm, allTeams]);

  // Filtrar jugadores basado en búsqueda
  useEffect(() => {
    if (playerSearchTerm) {
      const filtered = allPlayers.filter(player =>
        player.name.toLowerCase().includes(playerSearchTerm.toLowerCase())
      );
      setFilteredPlayers(filtered.slice(0, 10));
    } else {
      setFilteredPlayers(allPlayers.slice(0, 10));
    }
  }, [playerSearchTerm, allPlayers]);

  const handleSave = () => {
    console.log('Guardando cambios:', editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddFavoriteTeam = (team: any) => {
    if (user) {
      addFavoriteTeam(team);
      setShowTeamSearch(false);
      setTeamSearchTerm("");
    }
  };

  const handleAddFavoritePlayer = async () => {
    // Para jugadores, por ahora usaremos los de nuestra base de datos
    try {
      const playersData = await apiService.getPlayers();
      setAllPlayers(playersData);
      setFilteredPlayers(playersData.slice(0, 10));
      setShowPlayerSearch(true);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleAddPlayerToFavorites = (player: any) => {
    if (user) {
      addFavoritePlayer(player);
      setShowPlayerSearch(false);
      setPlayerSearchTerm("");
    }
  };

  const handleRemoveFavoriteTeam = (teamId: string) => {
    removeFavoriteTeam(teamId);
  };

  const handleRemoveFavoritePlayer = (playerId: string) => {
    removeFavoritePlayer(playerId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundParticles />
        <div className="container mx-auto px-6 py-12 relative z-10 flex items-center justify-center">
          <Card className="glass-card border-white/10 shadow-glass p-8 max-w-md text-center">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Perfil No Disponible</h2>
            <p className="text-muted-foreground mb-6">
              Inicia sesión para ver y editar tu perfil
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-primary text-white hover:opacity-90"
            >
              Ir al Inicio
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Profile Header */}
        <Card className="glass-card border-white/10 shadow-glass mb-8">
          <div className="p-8">
            <div className="flex items-start gap-6 mb-6">
              <Avatar className="h-24 w-24 border-4 border-primary/50 ring-4 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                  {user.username.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
                  <Badge className="bg-gradient-primary text-white border-0">PRO</Badge>
                </div>
                <p className="text-muted-foreground mb-4">@{user.username}</p>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Cuéntanos sobre tu pasión por el fútbol..."
                      className="w-full p-3 rounded-lg bg-secondary/30 border border-border/50 text-foreground resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="bg-gradient-primary text-white">
                        Guardar
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="border-primary/30"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground/80 max-w-2xl">
                      {user.bio || "Este usuario aún no ha agregado una biografía."}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <Button 
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-primary text-white hover:opacity-90"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Perfil
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleLogout}
                        className="border-destructive/30 text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex gap-8 pt-6 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">{user.favoritePlayers?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Jugadores Favoritos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{user.favoriteTeams?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Equipos Favoritos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Comentarios</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Favorite Players */}
          <Card className="glass-card border-white/10 shadow-glass">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold text-foreground">Jugadores Favoritos</h2>
                </div>
                <Button
                  onClick={handleAddFavoritePlayer}
                  size="sm"
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>
              
              <div className="space-y-4">
                {user.favoritePlayers && user.favoritePlayers.length > 0 ? (
                  user.favoritePlayers.map((player, index) => (
                    <div key={player._id || player.id || index} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all group">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12 border-2 border-primary/30">
                          <AvatarImage src={player.image} alt={player.name} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {player.name?.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{player.name}</div>
                          <div className="text-sm text-muted-foreground">{player.team}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFavoritePlayer(player._id || player.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 p-1 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No tienes jugadores favoritos aún</p>
                    <Button 
                      variant="outline" 
                      className="mt-3 border-primary/30"
                      onClick={handleAddFavoritePlayer}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar Jugadores
                    </Button>
                  </div>
                )}
              </div>

              {/* Modal de búsqueda de jugadores */}
              {showPlayerSearch && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="glass-card border-white/10 shadow-glass w-full max-w-md max-h-[80vh] overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Buscar Jugadores</h3>
                        <button onClick={() => setShowPlayerSearch(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar jugadores..."
                          value={playerSearchTerm}
                          onChange={(e) => setPlayerSearchTerm(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10"
                        />
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {filteredPlayers.map((player) => (
                          <div
                            key={player._id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                            onClick={() => handleAddPlayerToFavorites(player)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={player.image} />
                              <AvatarFallback className="bg-gradient-primary text-white text-sm">
                                {player.name?.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-foreground">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.team}</div>
                            </div>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Card>

          {/* Favorite Teams */}
          <Card className="glass-card border-white/10 shadow-glass">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold text-foreground">Equipos Favoritos</h2>
                </div>
                <Button
                  onClick={() => setShowTeamSearch(true)}
                  size="sm"
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>
              
              <div className="space-y-4">
                {user.favoriteTeams && user.favoriteTeams.length > 0 ? (
                  user.favoriteTeams.map((team, index) => (
                    <div key={team._id || team.id || index} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all group">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                          {team.logo ? (
                            <img src={team.logo} alt={team.name} className="h-8 w-8 object-contain" />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {team.name?.split(" ").map(n => n[0]).join("")}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.league ? `Liga: ${team.league}` : 'Equipo profesional'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFavoriteTeam(team._id || team.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 p-1 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No tienes equipos favoritos aún</p>
                    <Button 
                      variant="outline" 
                      className="mt-3 border-primary/30"
                      onClick={() => setShowTeamSearch(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Explorar Equipos
                    </Button>
                  </div>
                )}
              </div>

              {/* Modal de búsqueda de equipos */}
              {showTeamSearch && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="glass-card border-white/10 shadow-glass w-full max-w-md max-h-[80vh] overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Buscar Equipos</h3>
                        <button onClick={() => setShowTeamSearch(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar equipos..."
                          value={teamSearchTerm}
                          onChange={(e) => setTeamSearchTerm(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10"
                        />
                      </div>

                      {loading ? (
                        <div className="text-center py-8">
                          <div className="flex items-center gap-2 justify-center text-muted-foreground">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            Cargando equipos...
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {filteredTeams.map((team) => (
                            <div
                              key={team._id}
                              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                              onClick={() => handleAddFavoriteTeam(team)}
                            >
                              <div className="h-10 w-10 rounded-full bg-gradient-accent flex items-center justify-center">
                                {team.logo ? (
                                  <img src={team.logo} alt={team.name} className="h-6 w-6 object-contain" />
                                ) : (
                                  <span className="text-white font-bold text-xs">
                                    {team.name?.split(" ").map(n => n[0]).join("")}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{team.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {team.league ? `Liga: ${team.league}` : 'Equipo profesional'}
                                </div>
                              </div>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;