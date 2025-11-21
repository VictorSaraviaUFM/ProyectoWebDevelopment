import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Player from './models/Player.js';
import Team from './models/Team.js';
import Comment from './models/Comment.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB para insertar datos...');

    // Limpiar datos existentes
    await Player.deleteMany({});
    await Team.deleteMany({});
    await Comment.deleteMany({});
    console.log('Datos anteriores eliminados');

    // Insertar jugadores
    const players = await Player.insertMany([
      {
        name: "Lionel Messi",
        team: "Inter Miami",
        position: "Forward",
        goals: 28,
        assists: 16,
        matches: 34,
        rating: 9.2,
        nationality: "Argentina",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Messi"
      },
      {
        name: "Erling Haaland",
        team: "Manchester City",
        position: "Forward",
        goals: 36,
        assists: 8,
        matches: 35,
        rating: 9.0,
        nationality: "Norway", 
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haaland"
      },
      {
        name: "Kylian Mbappé",
        team: "PSG",
        position: "Forward",
        goals: 29,
        assists: 12,
        matches: 36,
        rating: 8.8,
        nationality: "France",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mbappe"
      },
      {
        name: "Kevin De Bruyne",
        team: "Manchester City", 
        position: "Midfielder",
        goals: 7,
        assists: 24,
        matches: 32,
        rating: 8.6,
        nationality: "Belgium",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DeBruyne"
      },
      {
        name: "Vinicius Jr",
        team: "Real Madrid",
        position: "Forward", 
        goals: 23,
        assists: 15,
        matches: 36,
        rating: 8.5,
        nationality: "Brazil",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinicius"
      },
      {
        name: "Jude Bellingham",
        team: "Real Madrid",
        position: "Midfielder",
        goals: 19,
        assists: 11,
        matches: 35,
        rating: 8.7,
        nationality: "England",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bellingham"
      }
    ]);
    console.log(`✅ ${players.length} jugadores insertados`);

    // Insertar equipos
    const teams = await Team.insertMany([
      {
        name: "Manchester City",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ManCity",
        wins: 28,
        draws: 5,
        losses: 5,
        points: 89,
        goalsFor: 96,
        goalsAgainst: 34,
        position: 1
      },
      {
        name: "Arsenal",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Arsenal",
        wins: 26,
        draws: 6,
        losses: 6,
        points: 84,
        goalsFor: 88,
        goalsAgainst: 29,
        position: 2
      },
      {
        name: "Liverpool", 
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Liverpool",
        wins: 24,
        draws: 10,
        losses: 4,
        points: 82,
        goalsFor: 86,
        goalsAgainst: 41,
        position: 3
      },
      {
        name: "Real Madrid",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=RealMadrid",
        wins: 27,
        draws: 6,
        losses: 5,
        points: 87,
        goalsFor: 79,
        goalsAgainst: 31,
        position: 1
      },
      {
        name: "Barcelona",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Barcelona", 
        wins: 25,
        draws: 7,
        losses: 6,
        points: 82,
        goalsFor: 76,
        goalsAgainst: 35,
        position: 2
      },
      {
        name: "Bayern Munich",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Bayern",
        wins: 26,
        draws: 5,
        losses: 3,
        points: 83,
        goalsFor: 92,
        goalsAgainst: 28,
        position: 1
      }
    ]);
    console.log(`✅ ${teams.length} equipos insertados`);

    // Insertar comentarios
    const comments = await Comment.insertMany([
      {
        user: "María García",
        content: "¡Increíble partido el de anoche! El Real Madrid demostró por qué es el rey de Europa. Esa jugada de Modrić fue MAGISTRAL 🔥",
        likes: 234
      },
      {
        user: "Juan Pérez", 
        content: "No puedo creer que el árbitro no pitara ese penalti. Las estadísticas claramente muestran que fue falta dentro del área. VAR dónde estás? 🤦‍♂️",
        likes: 89
      },
      {
        user: "Ana López",
        content: "Haaland va camino de romper todos los récords esta temporada. 23 goles en 15 partidos es una locura. Mejor fichaje de la Premier League sin duda 👑",
        likes: 412
      }
    ]);
    console.log(` ${comments.length} comentarios insertados`);

    console.log(' Todos los datos de prueba insertados exitosamente!');
    process.exit(0);

  } catch (error) {
    console.error(' Error insertando datos:', error);
    process.exit(1);
  }
};

seedData();