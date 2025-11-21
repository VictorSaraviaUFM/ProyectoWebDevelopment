import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";

const Comments = () => {
  const comments = [
    {
      id: 1,
      user: {
        name: "María García",
        username: "@mariafut",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
      },
      content: "¡Increíble partido el de anoche! El Real Madrid demostró por qué es el rey de Europa. Esa jugada de Modrić fue MAGISTRAL 🔥",
      likes: 234,
      replies: 18,
      time: "hace 2h"
    },
    {
      id: 2,
      user: {
        name: "Juan Pérez",
        username: "@juandeportes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan"
      },
      content: "No puedo creer que el árbitro no pitara ese penalti. Las estadísticas claramente muestran que fue falta dentro del área. VAR dónde estás? 🤦‍♂️",
      likes: 89,
      replies: 45,
      time: "hace 4h"
    },
    {
      id: 3,
      user: {
        name: "Ana López",
        username: "@analopezfut",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
      },
      content: "Haaland va camino de romper todos los récords esta temporada. 23 goles en 15 partidos es una locura. Mejor fichaje de la Premier League sin duda 👑",
      likes: 412,
      replies: 67,
      time: "hace 6h"
    },
    {
      id: 4,
      user: {
        name: "Carlos Ruiz",
        username: "@carlosanalytics",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos2"
      },
      content: "Análisis táctico: El Barcelona está dominando la posesión con un 68% de media, pero la efectividad en el último tercio es solo del 42%. Necesitan mejorar la finalización.",
      likes: 156,
      replies: 23,
      time: "hace 8h"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="container mx-auto px-6 py-12 relative z-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Debate <span className="text-gradient">Futbolístico</span>
          </h1>
          <p className="text-muted-foreground">Comparte tus opiniones y únete a la conversación</p>
        </div>

        {/* New Comment */}
        <Card className="glass-card border-white/10 shadow-glass mb-8">
          <div className="p-6">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/30">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" />
                <AvatarFallback className="bg-gradient-primary text-white">TU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder="¿Qué opinas sobre el partido de hoy?"
                  className="mb-4 bg-secondary/30 border-border/50 focus:border-primary/50 resize-none"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button className="bg-gradient-primary text-white hover:opacity-90">
                    Publicar Comentario
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Feed */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <Card key={comment.id} className="glass-card border-white/10 shadow-glass hover:border-primary/20 transition-all">
              <div className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/30">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {comment.user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{comment.user.name}</span>
                      <span className="text-muted-foreground text-sm">{comment.user.username}</span>
                      <span className="text-muted-foreground text-sm">• {comment.time}</span>
                    </div>
                    
                    <p className="text-foreground/90 mb-4">{comment.content}</p>
                    
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
                        <Heart className="h-4 w-4 group-hover:fill-accent" />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{comment.replies}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      
                      <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
