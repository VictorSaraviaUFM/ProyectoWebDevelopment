import { Link, useLocation } from "react-router-dom";
import { Trophy, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      setTime(`${hours}:${minutes}`);
      
      if (hours < 12) {
        setGreeting("Buenos días");
      } else if (hours < 20) {
        setGreeting("Buenas tardes");
      } else {
        setGreeting("Buenas noches");
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                FutStats
              </span>
              <Badge className="bg-gradient-primary text-white border-0 text-xs px-2 py-0.5">
                BETA
              </Badge>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                isActive("/")
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                isActive("/dashboard")
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                isActive("/profile")
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Perfil
            </Link>
            <Link
              to="/comments"
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                isActive("/comments")
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Comentarios
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
              <Moon className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{greeting}</span>
              <span className="text-sm text-muted-foreground">• {time}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors"
            >
              {darkMode ? (
                <Moon className="h-5 w-5 text-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
