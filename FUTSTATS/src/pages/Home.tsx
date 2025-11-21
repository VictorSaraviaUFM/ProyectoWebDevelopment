import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackgroundParticles from "@/components/BackgroundParticles";

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <BackgroundParticles />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center">
          <Badge className="mb-6 bg-gradient-primary text-white border-0 px-6 py-2 text-sm">
            PLATAFORMA BETA
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Estadísticas de <span className="text-gradient">Fútbol</span>
            <br />
            en Tiempo Real
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Accede a datos completos, análisis profundos y estadísticas en vivo de tus equipos y jugadores favoritos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-gradient-primary text-white hover:opacity-90 px-8 py-6 text-lg h-auto">
              Explorar Dashboard
            </Button>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg h-auto">
              Ver Estadísticas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
