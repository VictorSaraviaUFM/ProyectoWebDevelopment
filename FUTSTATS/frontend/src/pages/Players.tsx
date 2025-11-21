import { mockPlayers } from "@/data/mockData";
import PlayerCard from "@/components/PlayerCard";
import { Users, TrendingUp, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const Players = () => {
  const topScorer = mockPlayers.reduce((prev, current) => 
    prev.goals > current.goals ? prev : current
  );
  
  const topAssister = mockPlayers.reduce((prev, current) => 
    prev.assists > current.assists ? prev : current
  );
  
  const topRated = mockPlayers.reduce((prev, current) => 
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
            <h1 className="text-4xl font-bold text-foreground">Players</h1>
            <p className="text-muted-foreground">Player statistics and rankings</p>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-5 w-5" />
                <span className="text-sm">Top Scorer</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{topScorer.name}</p>
              <p className="text-3xl font-bold text-primary">{topScorer.goals} goals</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Top Assister</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{topAssister.name}</p>
              <p className="text-3xl font-bold text-info">{topAssister.assists} assists</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span className="text-sm">Highest Rated</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{topRated.name}</p>
              <p className="text-3xl font-bold text-warning">{topRated.rating} rating</p>
            </div>
          </Card>
        </div>

        {/* All Players */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">All Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Players;
