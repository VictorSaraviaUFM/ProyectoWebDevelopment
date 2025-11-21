// Usar variable de entorno para la URL de la API
const API_URL = 'https://proyectowebdevelopment.onrender.com'

export const apiService = {
  // Jugadores
  async getPlayers() {
    const response = await fetch(`${API_URL}/players`);
    if (!response.ok) throw new Error('Error fetching players');
    return response.json();
  },

  async getPlayer(id: string) {
    const response = await fetch(`${API_URL}/players/${id}`);
    if (!response.ok) throw new Error('Error fetching player');
    return response.json();
  },

  // Equipos
  async getTeams() {
    const response = await fetch(`${API_URL}/teams`);
    if (!response.ok) throw new Error('Error fetching teams');
    return response.json();
  },

  async getTeam(id: string) {
    const response = await fetch(`${API_URL}/teams/${id}`);
    if (!response.ok) throw new Error('Error fetching team');
    return response.json();
  },

  // Comentarios
  async getComments() {
    const response = await fetch(`${API_URL}/comments`);
    if (!response.ok) throw new Error('Error fetching comments');
    return response.json();
  },

  async createComment(commentData: any) {
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });
    if (!response.ok) throw new Error('Error creating comment');
    return response.json();
  },

  async likeComment(commentId: string) {
    const response = await fetch(`${API_URL}/comments/${commentId}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error liking comment');
    return response.json();
  },

  async getCommentReplies(commentId: string) {
    const response = await fetch(`${API_URL}/comments/${commentId}/replies`);
    if (!response.ok) throw new Error('Error fetching comment replies');
    return response.json();
  },

  // Favoritos
  async addFavoritePlayer(playerId: string, token: string) {
    const response = await fetch(`${API_URL}/users/favorites/player/${playerId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error adding favorite player');
    return response.json();
  },

  async removeFavoritePlayer(playerId: string, token: string) {
    const response = await fetch(`${API_URL}/users/favorites/player/${playerId}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error removing favorite player');
    return response.json();
  },

  // Football API - Partidos y Ligas
  async getLiveMatches() {
    const response = await fetch(`${API_URL}/matches/live`);
    if (!response.ok) throw new Error('Error fetching live matches');
    return response.json();
  },

  async getUpcomingMatches(competition: string = '') {
    const url = competition 
      ? `${API_URL}/matches/upcoming?competition=${competition}`
      : `${API_URL}/matches/upcoming`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching upcoming matches');
    return response.json();
  },

  async getStandings(competitionCode: string) {
    const response = await fetch(`${API_URL}/matches/standings/${competitionCode}`);
    if (!response.ok) throw new Error('Error fetching standings');
    return response.json();
  },

  async getCompetitions() {
    const response = await fetch(`${API_URL}/matches/competitions`);
    if (!response.ok) throw new Error('Error fetching competitions');
    return response.json();
  },

  async getTopScorers(competitionCode: string, limit: number = 10) {
    const response = await fetch(`${API_URL}/matches/scorers/${competitionCode}?limit=${limit}`);
    if (!response.ok) throw new Error('Error fetching top scorers');
    return response.json();
  },

  async getFeaturedTeams() {
    const response = await fetch(`${API_URL}/matches/featured-teams`);
    if (!response.ok) throw new Error('Error fetching featured teams');
    return response.json();
  },

  async getAllTeams() {
    const response = await fetch(`${API_URL}/matches/all-teams`);
    if (!response.ok) throw new Error('Error fetching all teams');
    return response.json();
  },

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Error logging in');
    return response.json();
  },

  async register(userData: { username: string; email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Error registering user');
    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error fetching current user');
    return response.json();
  }
};