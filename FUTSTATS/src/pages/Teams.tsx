import { mockTeams } from "@/data/mockData";
import TeamCard from "@/components/TeamCard";
import StatsTable from "@/components/StatsTable";
import { Trophy } from "lucide-react";

const Teams = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Teams</h1>
            <p className="text-muted-foreground">Complete team statistics and standings</p>
          </div>
        </div>

        {/* League Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">League Standings</h2>
          <StatsTable teams={mockTeams} />
        </section>

        {/* Team Cards Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Team Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTeams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Teams;
