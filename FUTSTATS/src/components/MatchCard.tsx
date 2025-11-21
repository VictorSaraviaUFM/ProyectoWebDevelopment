import { Match } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const getStatusBadge = () => {
    switch (match.status) {
      case "live":
        return <Badge className="bg-destructive text-white animate-pulse">EN VIVO</Badge>;
      case "finished":
        return <Badge className="bg-secondary/80 text-foreground border border-border/50">FINAL</Badge>;
      case "upcoming":
        return <Badge className="bg-gradient-primary text-white border-0">Próximo</Badge>;
    }
  };
  
  return (
    <Card className="group overflow-hidden glass-card border-white/10 shadow-glass hover:shadow-glow transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(match.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
              </div>
              <span className="font-semibold text-foreground">{match.homeTeam}</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent px-4">
              {match.status === "upcoming" ? "-" : match.homeScore}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
              </div>
              <span className="font-semibold text-foreground">{match.awayTeam}</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent px-4">
              {match.status === "upcoming" ? "-" : match.awayScore}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
