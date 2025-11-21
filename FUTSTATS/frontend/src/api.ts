const API_URL = 'http://localhost:5001/api';

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

  // Favoritos (para implementación futura)
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
  }
};