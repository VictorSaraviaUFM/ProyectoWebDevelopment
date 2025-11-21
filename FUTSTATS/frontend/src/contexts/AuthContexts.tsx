import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  favoritePlayers: any[];
  favoriteTeams: any[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  addFavoritePlayer: (player: any) => void;
  addFavoriteTeam: (team: any) => void;
  removeFavoritePlayer: (playerId: string) => void;
  removeFavoriteTeam: (teamId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5001/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Por ahora usamos datos mock, pero en producción sería la API real
        const userData: User = {
          id: '1',
          username: 'demo_user',
          email: 'demo@futstats.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
          bio: 'Usuario demo de FutStats - Apasionado del fútbol',
          favoritePlayers: [],
          favoriteTeams: [],
          createdAt: new Date().toISOString()
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Sistema de favoritos
  const addFavoritePlayer = (player: any) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      
      const isAlreadyFavorite = prev.favoritePlayers.some(
        fav => fav._id === player._id || fav.id === player.id
      );
      
      if (isAlreadyFavorite) return prev;
      
      return {
        ...prev,
        favoritePlayers: [...prev.favoritePlayers, player]
      };
    });
  };

  const addFavoriteTeam = (team: any) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      
      const isAlreadyFavorite = prev.favoriteTeams.some(
        fav => fav._id === team._id || fav.id === team.id
      );
      
      if (isAlreadyFavorite) return prev;
      
      return {
        ...prev,
        favoriteTeams: [...prev.favoriteTeams, team]
      };
    });
  };

  const removeFavoritePlayer = (playerId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        favoritePlayers: prev.favoritePlayers.filter(
          player => (player._id !== playerId && player.id?.toString() !== playerId)
        )
      };
    });
  };

  const removeFavoriteTeam = (teamId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        favoriteTeams: prev.favoriteTeams.filter(
          team => (team._id !== teamId && team.id?.toString() !== teamId)
        )
      };
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      addFavoritePlayer,
      addFavoriteTeam,
      removeFavoritePlayer,
      removeFavoriteTeam
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};