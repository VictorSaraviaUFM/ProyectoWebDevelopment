import { Player } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
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
          <Badge className="bg-gradient-primary text-white border-0 shadow-glow">
            {player.rating}
          </Badge>
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
