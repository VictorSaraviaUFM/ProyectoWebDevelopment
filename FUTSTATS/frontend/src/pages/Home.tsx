import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackgroundParticles from "@/components/BackgroundParticles";
import { MessageCircle, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <BackgroundParticles />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center">
          <Badge className="mb-6 bg-gradient-primary text-white border-0 px-6 py-2 text-sm">
            PLATAFORMA BETA
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            La Comunidad <span className="text-gradient">Futbolística</span>
            <br />
            Definitiva
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Accede a estadísticas en tiempo real, participa en debates apasionados y conecta con fans de todo el mundo
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-primary text-white hover:opacity-90 px-8 py-6 text-lg h-auto flex items-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              Explorar Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/comments')}
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg h-auto flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Unirse a Debates
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-secondary/20 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Estadísticas en Vivo</h3>
              <p className="text-muted-foreground text-sm">
                Datos completos de partidos, jugadores y equipos actualizados al minuto
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-secondary/20 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Debates Apasionados</h3>
              <p className="text-muted-foreground text-sm">
                Comparte tus opiniones y discute con otros fans del fútbol
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-secondary/20 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 bg-gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Comunidad Global</h3>
              <p className="text-muted-foreground text-sm">
                Conecta con aficionados de todos los equipos y ligas del mundo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;