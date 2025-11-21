import { mockMatches } from "@/data/mockData";
import MatchCard from "@/components/MatchCard";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const Matches = () => {
  const liveMatches = mockMatches.filter(m => m.status === 'live');
  const finishedMatches = mockMatches.filter(m => m.status === 'finished');
  const upcomingMatches = mockMatches.filter(m => m.status === 'upcoming');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Matches</h1>
            <p className="text-muted-foreground">All match results and fixtures</p>
          </div>
        </div>

        {/* Match Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <Clock className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Live Matches</p>
                <p className="text-3xl font-bold text-foreground">{liveMatches.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Finished</p>
                <p className="text-3xl font-bold text-foreground">{finishedMatches.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-info/10">
                <Calendar className="h-8 w-8 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-3xl font-bold text-foreground">{upcomingMatches.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="h-3 w-3 bg-destructive rounded-full animate-pulse"></span>
              Live Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Upcoming Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Finished Matches */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishedMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Matches;
