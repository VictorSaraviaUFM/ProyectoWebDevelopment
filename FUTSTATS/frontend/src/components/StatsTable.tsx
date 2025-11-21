import { Team } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StatsTableProps {
  teams: Team[];
}

const StatsTable = ({ teams }: StatsTableProps) => {
  const sortedTeams = [...teams].sort((a, b) => a.position - b.position);
  
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden glass-card shadow-glass">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-secondary/30">
            <TableHead className="w-16 text-center text-muted-foreground">#</TableHead>
            <TableHead className="text-foreground font-semibold">Equipo</TableHead>
            <TableHead className="text-center text-muted-foreground">PJ</TableHead>
            <TableHead className="text-center text-muted-foreground">G</TableHead>
            <TableHead className="text-center text-muted-foreground">E</TableHead>
            <TableHead className="text-center text-muted-foreground">P</TableHead>
            <TableHead className="text-center text-muted-foreground">GF</TableHead>
            <TableHead className="text-center text-muted-foreground">GC</TableHead>
            <TableHead className="text-center text-muted-foreground">DG</TableHead>
            <TableHead className="text-center text-foreground font-semibold">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeams.map((team) => {
            const matchesPlayed = team.wins + team.draws + team.losses;
            const goalDifference = team.goalsFor - team.goalsAgainst;
            
            return (
              <TableRow 
                key={team.id} 
                className="border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <TableCell className="text-center font-bold">
                  {team.position <= 3 ? (
                    <Badge className="bg-gradient-primary text-white border-0 shadow-glow">
                      {team.position}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">{team.position}</span>
                  )}
                </TableCell>
                <TableCell className="font-semibold text-foreground">{team.name}</TableCell>
                <TableCell className="text-center text-muted-foreground">{matchesPlayed}</TableCell>
                <TableCell className="text-center text-success font-medium">{team.wins}</TableCell>
                <TableCell className="text-center text-warning font-medium">{team.draws}</TableCell>
                <TableCell className="text-center text-destructive font-medium">{team.losses}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.goalsFor}</TableCell>
                <TableCell className="text-center text-muted-foreground">{team.goalsAgainst}</TableCell>
                <TableCell className={`text-center font-medium ${goalDifference >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {goalDifference >= 0 ? '+' : ''}{goalDifference}
                </TableCell>
                <TableCell className="text-center font-bold text-primary text-lg">{team.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatsTable;
