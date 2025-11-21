import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import playerRoutes from './routes/players.js';
import teamRoutes from './routes/teams.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import matchRoutes from './routes/matches.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS para producción
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'https://proyecto-web-development.vercel.app/', // Reemplaza con tu dominio real de Vercel
  'https://*.vercel.app' // Permitir subdominios de Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware para preflight requests
app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'FutStats API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'FutStats Backend API',
    version: '1.0.0',
    endpoints: {
      players: '/api/players',
      teams: '/api/teams',
      comments: '/api/comments',
      auth: '/api/auth',
      matches: '/api/matches'
    }
  });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Iniciar servidor
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
FutStats Backend Server Running!
Port: ${PORT}
Environment: ${process.env.NODE_ENV || 'development'}
MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}
CORS Enabled for: ${allowedOrigins.join(', ')}
    `);
  });
});