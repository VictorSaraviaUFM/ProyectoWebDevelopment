import { Team } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
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
