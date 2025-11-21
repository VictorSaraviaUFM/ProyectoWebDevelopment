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

// Agrega estos métodos
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
  // Para el buscador de equipos - obtener de múltiples ligas
  const competitions = ['PL', 'PD', 'SA', 'BL1', 'FL1'];
  const allTeams = [];

  for (const comp of competitions) {
    try {
      const response = await fetch(`${API_URL}/matches/standings/${comp}`);
      const standings = await response.json();
      const teams = standings.map((team: any) => ({
        _id: team.team.id,
        name: team.team.name,
        logo: team.team.crest,
        league: comp
      }));
      allTeams.push(...teams);
    } catch (error) {
      console.error(`Error fetching teams from ${comp}:`, error);
    }
  }

  return allTeams;
},

likeComment: async (commentId) => {
    const response = await fetch(`${API_URL}/comments/${commentId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  getCommentReplies: async (commentId) => {
    const response = await fetch(`${API_URL}/comments/${commentId}/replies`);
    return response.json();
  },
};