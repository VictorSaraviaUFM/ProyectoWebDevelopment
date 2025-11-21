import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Star, User, LogOut } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";
import { useAuth } from "@/contexts/AuthContexts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: user?.bio || "",
    avatar: user?.avatar || ""
  });

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

  const handleSave = () => {
    // En una implementación real, haríamos PATCH a /api/users/profile
    console.log('Guardando cambios:', editData);
    setIsEditing(false);
    // Aquí actualizaríamos el contexto/user con los nuevos datos
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
                <div className="text-2xl font-bold text-gradient">0</div>
                <div className="text-sm text-muted-foreground">Comentarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">Me gusta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Seguidos</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Favorite Players */}
          <Card className="glass-card border-white/10 shadow-glass">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-bold text-foreground">Jugadores Favoritos</h2>
              </div>
              
              <div className="space-y-4">
                {user.favoritePlayers && user.favoritePlayers.length > 0 ? (
                  user.favoritePlayers.map((player, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all">
                      <Avatar className="h-12 w-12 border-2 border-primary/30">
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {player.name?.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">{player.name}</div>
                        <div className="text-sm text-muted-foreground">{player.team}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No tienes jugadores favoritos aún</p>
                    <Button 
                      variant="outline" 
                      className="mt-3 border-primary/30"
                      onClick={() => navigate('/players')}
                    >
                      Explorar Jugadores
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Favorite Teams */}
          <Card className="glass-card border-white/10 shadow-glass">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-bold text-foreground">Equipos Favoritos</h2>
              </div>
              
              <div className="space-y-4">
                {user.favoriteTeams && user.favoriteTeams.length > 0 ? (
                  user.favoriteTeams.map((team, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all">
                      <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                        <img src={team.logo} alt={team.name} className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{team.name}</div>
                        <div className="text-sm text-muted-foreground">{team.league}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No tienes equipos favoritos aún</p>
                    <Button 
                      variant="outline" 
                      className="mt-3 border-primary/30"
                      onClick={() => navigate('/teams')}
                    >
                      Explorar Equipos
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;