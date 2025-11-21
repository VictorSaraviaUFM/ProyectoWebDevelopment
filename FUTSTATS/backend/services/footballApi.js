import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.FOOTBALL_API_KEY || '537b54b6eacb4a63bf622bc48aa17c3a';
const BASE_URL = 'https://api.football-data.org/v4';

console.log('🔑 API Key:', API_KEY ? '✅ Configurada' : '❌ No encontrada');

const footballApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_KEY
  },
  timeout: 15000
});

// Interceptor para debug
footballApi.interceptors.request.use(config => {
  console.log(`📡 Haciendo request a: ${config.url}`);
  return config;
});

footballApi.interceptors.response.use(
  response => {
    console.log(`✅ Response recibido - Status: ${response.status}`);
    return response;
  },
  error => {
    console.error('❌ Error en API:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const footballService = {
  // Obtener partidos en vivo (no disponible en plan gratis)
  async getLiveMatches() {
    console.log('🔄 Football-Data.org no tiene partidos en vivo en plan gratis');
    return this.getMockLiveMatches();
  },

  // Obtener partidos próximos
  async getUpcomingMatches(competitionCode = null) {
    try {
      console.log('📡 Obteniendo partidos próximos...');
      
      let url = '/matches';
      const params = {
        status: 'SCHEDULED',
        limit: 6
      };

      // Si se especifica una competencia, usar ese endpoint
      if (competitionCode) {
        url = `/competitions/${competitionCode}/matches`;
        params.status = 'SCHEDULED';
      }

      console.log(`🌐 URL: ${url}`, params);
      
      const response = await footballApi.get(url, { params });
      console.log(`✅ ${response.data.matches?.length || 0} partidos próximos encontrados`);
      return response.data.matches || [];
    } catch (error) {
      console.error('❌ Error fetching upcoming matches:', error.message);
      return this.getMockUpcomingMatches();
    }
  },

  // Obtener tabla de posiciones
  async getLeagueStandings(competitionCode) {
    try {
      console.log(`📡 Obteniendo tabla para competencia ${competitionCode}...`);
      
      const response = await footballApi.get(`/competitions/${competitionCode}/standings`);
      const standings = response.data.standings?.[0]?.table || [];
      
      console.log(`✅ Tabla con ${standings.length} equipos obtenida`);
      return standings;
    } catch (error) {
      console.error('❌ Error fetching standings:', error.message);
      return this.getMockStandings();
    }
  },

  // Obtener competencias disponibles
  async getCompetitions() {
    try {
      console.log('📡 Obteniendo competencias...');
      
      const response = await footballApi.get('/competitions');
      const competitions = response.data.competitions || [];
      
      console.log(`✅ ${competitions.length} competencias encontradas`);
      return competitions;
    } catch (error) {
      console.error('❌ Error fetching competitions:', error.message);
      return this.getMockCompetitions();
    }
  },

  // Obtener equipos de una competencia
  async getTeams(competitionCode) {
    try {
      console.log(`📡 Obteniendo equipos para ${competitionCode}...`);
      
      const response = await footballApi.get(`/competitions/${competitionCode}/teams`);
      const teams = response.data.teams || [];
      
      console.log(`✅ ${teams.length} equipos encontrados`);
      return teams;
    } catch (error) {
      console.error('❌ Error fetching teams:', error.message);
      return [];
    }
  },

  // Datos mock para desarrollo cuando la API falle
  getMockLiveMatches() {
    return [
      {
        id: 1,
        status: 'LIVE',
        minute: 67,
        competition: {
          name: "La Liga",
          code: "PD"
        },
        homeTeam: {
          id: 86,
          name: "Real Madrid",
          crest: "https://crests.football-data.org/86.png"
        },
        awayTeam: {
          id: 81,
          name: "Barcelona", 
          crest: "https://crests.football-data.org/81.png"
        },
        score: {
          fullTime: { home: 2, away: 1 },
          halfTime: { home: 1, away: 0 }
        }
      }
    ];
  },

  getMockUpcomingMatches() {
    return [
      {
        id: 2,
        status: 'SCHEDULED',
        utcDate: "2024-04-28T15:30:00Z",
        competition: {
          name: "Premier League",
          code: "PL"
        },
        homeTeam: {
          id: 65,
          name: "Manchester City",
          crest: "https://crests.football-data.org/65.png"
        },
        awayTeam: {
          id: 57,
          name: "Arsenal",
          crest: "https://crests.football-data.org/57.png"
        },
        score: {
          fullTime: { home: null, away: null }
        }
      },
      {
        id: 3,
        status: 'SCHEDULED', 
        utcDate: "2024-04-27T12:30:00Z",
        competition: {
          name: "Bundesliga",
          code: "BL1"
        },
        homeTeam: {
          id: 5,
          name: "Bayern Munich",
          crest: "https://crests.football-data.org/5.png"
        },
        awayTeam: {
          id: 4,
          name: "Borussia Dortmund",
          crest: "https://crests.football-data.org/4.png"
        },
        score: {
          fullTime: { home: null, away: null }
        }
      }
    ];
  },

  getMockStandings() {
    return [
      {
        position: 1,
        team: {
          id: 65,
          name: "Manchester City",
          crest: "https://crests.football-data.org/65.png",
          shortName: "Man City"
        },
        points: 89,
        goalDifference: 62,
        playedGames: 38,
        won: 28,
        draw: 5,
        lost: 5
      },
      {
        position: 2,
        team: {
          id: 57,
          name: "Arsenal",
          crest: "https://crests.football-data.org/57.png",
          shortName: "Arsenal"
        },
        points: 84,
        goalDifference: 59,
        playedGames: 38,
        won: 26,
        draw: 6,
        lost: 6
      }
    ];
  },

  getMockCompetitions() {
    return [
      {
        id: 2021,
        code: 'PL',
        name: 'Premier League',
        area: { name: 'England' },
        emblem: 'https://crests.football-data.org/PL.png'
      },
      {
        id: 2014,
        code: 'PD',
        name: 'La Liga',
        area: { name: 'Spain' },
        emblem: 'https://crests.football-data.org/PD.png'
      },
      {
        id: 2019,
        code: 'SA',
        name: 'Serie A',
        area: { name: 'Italy' },
        emblem: 'https://crests.football-data.org/SA.png'
      },
      {
        id: 2002,
        code: 'BL1',
        name: 'Bundesliga',
        area: { name: 'Germany' },
        emblem: 'https://crests.football-data.org/BL1.png'
      },
      {
        id: 2015,
        code: 'FL1',
        name: 'Ligue 1',
        area: { name: 'France' },
        emblem: 'https://crests.football-data.org/FL1.png'
      },
      {
        id: 2001,
        code: 'CL',
        name: 'Champions League',
        area: { name: 'Europe' },
        emblem: 'https://crests.football-data.org/CL.png'
      }
    ];
  },

// Agrega este método en footballService
async getTopScorers(competitionCode, limit = 10) {
  try {
    console.log(`Obteniendo goleadores para ${competitionCode}...`);
    
    const response = await footballApi.get(`/competitions/${competitionCode}/scorers`, {
      params: { limit }
    });
    
    const scorers = response.data.scorers || [];
    console.log(`✅ ${scorers.length} goleadores encontrados`);
    return scorers;
  } catch (error) {
    console.error('❌ Error fetching top scorers:', error.message);
    return this.getMockTopScorers();
  }
},

// Y este método mock
getMockTopScorers() {
  return [
    {
      player: {
        id: 1,
        name: "Erling Haaland",
        nationality: "Norway"
      },
      team: {
        id: 65,
        name: "Manchester City",
        crest: "https://crests.football-data.org/65.png"
      },
      goals: 36,
      assists: 8
    },
    {
      player: {
        id: 2, 
        name: "Harry Kane",
        nationality: "England"
      },
      team: {
        id: 5,
        name: "Bayern Munich", 
        crest: "https://crests.football-data.org/5.png"
      },
      goals: 32,
      assists: 8
    }
    ];
},

async getFeaturedTeams() {
  try {
    console.log(' Obteniendo equipos destacados...');
    
    // Obtener equipos líderes de las principales ligas
    const topLeagues = ['PL', 'PD', 'SA', 'BL1', 'FL1', 'CL'];
    const featuredTeams = [];

    for (const league of topLeagues) {
      try {
        const standings = await this.getLeagueStandings(league);
        if (standings.length > 0) {
          // Agregar los primeros 2 equipos de cada liga
          featuredTeams.push(...standings.slice(0, 2));
        }
      } catch (error) {
        console.log(`⚠️ No se pudieron obtener equipos de ${league}`);
      }
    }

    console.log(`✅ ${featuredTeams.length} equipos destacados encontrados`);
    return featuredTeams;
  } catch (error) {
    console.error('❌ Error fetching featured teams:', error.message);
    return this.getMockFeaturedTeams();
  }
},

getMockFeaturedTeams() {
  return [
    {
      position: 1,
      team: {
        id: 65,
        name: "Manchester City",
        crest: "https://crests.football-data.org/65.png",
        shortName: "Man City"
      },
      points: 89,
      goalDifference: 62
    },
    {
      position: 1,
      team: {
        id: 86,
        name: "Real Madrid", 
        crest: "https://crests.football-data.org/86.png"
      },
      points: 87,
      goalDifference: 48
    }
  ];
}};

// Códigos de competencias para Football-Data.org
// En COMPETITION_CODES, agrega:
export const COMPETITION_CODES = {
  PREMIER_LEAGUE: 'PL',
  LA_LIGA: 'PD',
  SERIE_A: 'SA',
  BUNDESLIGA: 'BL1',
  LIGUE_1: 'FL1',
  CHAMPIONS_LEAGUE: 'CL',
};