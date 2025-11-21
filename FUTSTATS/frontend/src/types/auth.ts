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

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}