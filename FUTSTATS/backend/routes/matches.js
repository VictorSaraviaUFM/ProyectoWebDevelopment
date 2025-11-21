import express from 'express';
import { footballService, COMPETITION_CODES } from '../services/footballApi.js';

const router = express.Router();

// GET /api/matches/live - Partidos en vivo (mock por ahora)
router.get('/live', async (req, res) => {
  try {
    const matches = await footballService.getLiveMatches();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/upcoming - Partidos próximos
router.get('/upcoming', async (req, res) => {
  try {
    const { competition } = req.query;
    const competitionCode = competition ? COMPETITION_CODES[competition.toUpperCase()] : null;
    const matches = await footballService.getUpcomingMatches(competitionCode);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/standings/:competitionCode - Tabla de posiciones
router.get('/standings/:competitionCode', async (req, res) => {
  try {
    const { competitionCode } = req.params;
    const standings = await footballService.getLeagueStandings(competitionCode);
    res.json(standings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/competitions - Competencias disponibles
router.get('/competitions', async (req, res) => {
  try {
    const competitions = await footballService.getCompetitions();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/scorers/:competitionCode - Top goleadores
router.get('/scorers/:competitionCode', async (req, res) => {
  try {
    const { competitionCode } = req.params;
    const { limit } = req.query;
    const scorers = await footballService.getTopScorers(competitionCode, limit);
    res.json(scorers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/featured-teams - Equipos destacados
router.get('/featured-teams', async (req, res) => {
  try {
    // Obtener equipos de las principales ligas
    const featuredTeams = await footballService.getFeaturedTeams();
    res.json(featuredTeams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/matches/all-teams - Todos los equipos de múltiples ligas
router.get('/all-teams', async (req, res) => {
  try {
    const competitions = ['PL', 'PD', 'SA', 'BL1', 'FL1', 'DED', 'PPL'];
    const allTeams = [];

    for (const comp of competitions) {
      try {
        const standings = await footballService.getLeagueStandings(comp);
        const teams = standings.map(team => ({
          _id: team.team.id,
          name: team.team.name,
          logo: team.team.crest,
          league: comp
        }));
        allTeams.push(...teams);
      } catch (error) {
        console.log(`⚠️ No se pudieron obtener equipos de ${comp}`);
      }
    }

    res.json(allTeams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;