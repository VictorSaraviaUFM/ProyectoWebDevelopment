import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Star } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";

const Profile = () => {
  const user = {
    name: "Carlos Fernández",
    username: "@carlosfutbol",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    bio: "Fanático del fútbol español. Seguidor del Real Madrid desde 1998. Analista amateur de estadísticas y tácticas.",
    favoritePlayers: [
      { name: "Luka Modrić", team: "Real Madrid", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Modric" },
      { name: "Kevin De Bruyne", team: "Manchester City", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KDB" },
      { name: "Robert Lewandowski", team: "Barcelona", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lewa" }
    ],
    favoriteTeams: [
      { name: "Real Madrid", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=RealMadrid", league: "La Liga" },
      { name: "Manchester City", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ManCity", league: "Premier League" }
    ]
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
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                  CF
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                  <Badge className="bg-gradient-primary text-white border-0">PRO</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{user.username}</p>
                <p className="text-foreground/80 max-w-2xl">{user.bio}</p>
              </div>
              
              <Button className="bg-gradient-primary text-white hover:opacity-90">
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
            
            <div className="flex gap-8 pt-6 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">247</div>
                <div className="text-sm text-muted-foreground">Comentarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1,842</div>
                <div className="text-sm text-muted-foreground">Me gusta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">128</div>
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
                {user.favoritePlayers.map((player, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all">
                    <Avatar className="h-12 w-12 border-2 border-primary/30">
                      <AvatarImage src={player.image} alt={player.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {player.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.team}</div>
                    </div>
                  </div>
                ))}
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
                {user.favoriteTeams.map((team, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all">
                    <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                      <img src={team.logo} alt={team.name} className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{team.name}</div>
                      <div className="text-sm text-muted-foreground">{team.league}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
