import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react";
import BackgroundParticles from "@/components/BackgroundParticles";
import { apiService } from "@/api";
import { useAuth } from "@/contexts/AuthContexts";
import { useEffect, useState } from "react";

const Comments = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const commentsData = await apiService.getComments();
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      const commentData = {
        user: user.username,
        content: newComment,
        likes: 0
      };

      await apiService.createComment(commentData);
      setNewComment("");
      fetchComments(); // Recargar comentarios
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    // En una implementación real, haríamos un PATCH para actualizar los likes
    setComments(prev => prev.map(comment => 
      comment._id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gradient text-xl">Cargando comentarios...</div>
      </div>
    );
  }

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
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {user ? user.username.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder={user ? "¿Qué opinas sobre el partido de hoy?" : "Inicia sesión para comentar"}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!user || submitting}
                  className="mb-4 bg-secondary/30 border-border/50 focus:border-primary/50 resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {user ? `${comments.length} comentarios en la comunidad` : "Debes iniciar sesión para comentar"}
                  </div>
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={!user || !newComment.trim() || submitting}
                    className="bg-gradient-primary text-white hover:opacity-90"
                  >
                    {submitting ? (
                      "Publicando..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Publicar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Feed */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <Card className="glass-card border-white/10 shadow-glass">
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No hay comentarios aún</h3>
                <p className="text-muted-foreground">Sé el primero en compartir tu opinión sobre fútbol</p>
              </div>
            </Card>
          ) : (
            comments.map((comment) => (
              <Card key={comment._id} className="glass-card border-white/10 shadow-glass hover:border-primary/20 transition-all">
                <div className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/30">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {comment.user?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{comment.user}</span>
                        <Badge variant="outline" className="text-xs">
                          {new Date(comment.createdAt).toLocaleDateString('es-ES')}
                        </Badge>
                      </div>
                      
                      <p className="text-foreground/90 mb-4">{comment.content}</p>
                      
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(comment._id)}
                          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                        >
                          <Heart className="h-4 w-4 group-hover:fill-accent" />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                        
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">Responder</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;