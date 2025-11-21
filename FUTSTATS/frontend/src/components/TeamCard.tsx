import { Team } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContexts";

interface TeamCardProps {
  team: Team;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (teamId: string) => void;
}

const TeamCard = ({ team, showFavoriteButton = false, isFavorite = false, onToggleFavorite }: TeamCardProps) => {
  const { user } = useAuth();

  const handleFavoriteClick = () => {
    if (onToggleFavorite && user) {
      const teamId = team._id || team.id?.toString();
      if (teamId) {
        onToggleFavorite(teamId);
      }
    }
  };

  const goalDifference = team.goalsFor - team.goalsAgainst;
  
  return (
    <Card className="group overflow-hidden glass-card border-white/10 shadow-glass hover:shadow-glow transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <Badge className="absolute -top-2 -right-2 bg-gradient-primary text-white border-0 h-7 w-7 p-0 flex items-center justify-center shadow-glow">
              {team.position}
            </Badge>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-foreground mb-1">{team.name}</h3>
            <p className="text-sm text-primary font-semibold">{team.points} puntos</p>
          </div>
          {showFavoriteButton && user && (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'text-yellow-500 bg-yellow-500/20' 
                  : 'text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10'
              }`}
            >
              <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 rounded-xl bg-success/10 border border-success/20">
            <div className="text-2xl font-bold text-success">{team.wins}</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-warning/10 border border-warning/20">
            <div className="text-2xl font-bold text-warning">{team.draws}</div>
            <div className="text-xs text-muted-foreground">Draws</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">{team.losses}</div>
            <div className="text-xs text-muted-foreground">Losses</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <div>
            <span className="text-sm text-muted-foreground">Goals: </span>
            <span className="font-bold text-foreground">{team.goalsFor} - {team.goalsAgainst}</span>
          </div>
          <Badge className={goalDifference >= 0 ? "bg-gradient-primary text-white" : "bg-destructive text-white"}>
            {goalDifference >= 0 ? "+" : ""}{goalDifference}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;