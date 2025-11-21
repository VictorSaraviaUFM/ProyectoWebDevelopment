import { Trophy } from "lucide-react";
import TeamCard from "@/components/TeamCard";
import StatsTable from "@/components/StatsTable";
import { apiService } from "@/api";
import { useEffect, useState } from "react";

const Teams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await apiService.getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gradient text-xl">Cargando equipos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Equipos</h1>
            <p className="text-muted-foreground">Estadísticas completas y clasificaciones</p>
          </div>
        </div>

        {/* League Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Tabla de Clasificación</h2>
          <StatsTable teams={teams} />
        </section>

        {/* Team Cards Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Todos los Equipos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(team => (
              <TeamCard key={team._id} team={team} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Teams;