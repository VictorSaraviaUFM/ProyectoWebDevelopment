import { Player } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContexts";

interface PlayerCardProps {
  player: Player;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (playerId: string) => void;
}

const PlayerCard = ({ player, showFavoriteButton = false, isFavorite = false, onToggleFavorite }: PlayerCardProps) => {
  const { user } = useAuth();

  const handleFavoriteClick = () => {
    if (onToggleFavorite && user) {
      // Usar _id si existe (de MongoDB), sino id (de mock data)
      const playerId = player._id || player.id?.toString();
      if (playerId) {
        onToggleFavorite(playerId);
      }
    }
  };

  return (
    <Card className="group overflow-hidden glass-card border-white/10 shadow-glass hover:shadow-glow transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary/50 ring-2 ring-primary/20">
            <AvatarImage src={player.image} alt={player.name} />
            <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
              {player.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-1">{player.name}</h3>
            <p className="text-sm text-muted-foreground">{player.team}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-gradient-primary text-white border-0 shadow-glow">
              {player.rating}
            </Badge>
            {showFavoriteButton && user && (
              <button
                onClick={handleFavoriteClick}
                className={`p-1 rounded-full transition-all ${
                  isFavorite 
                    ? 'text-yellow-500 bg-yellow-500/20' 
                    : 'text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10'
                }`}
              >
                <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Position</span>
            <Badge variant="outline" className="border-primary/30 text-primary">{player.position}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">{player.goals}</div>
              <div className="text-xs text-muted-foreground">Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{player.assists}</div>
              <div className="text-xs text-muted-foreground">Assists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{player.matches}</div>
              <div className="text-xs text-muted-foreground">Matches</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;