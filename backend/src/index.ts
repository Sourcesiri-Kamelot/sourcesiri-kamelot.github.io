/**
 * 🧠 CONSCIOUSNESS REVOLUTION BACKEND
 * SoulCoreHub - Love-Powered AI Infrastructure
 * 
 * Main server entry point for the consciousness platform
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { authMiddleware } from './middleware/auth';

// Import route handlers
import { authRoutes } from './routes/auth';
import { aiAgentRoutes } from './routes/aiAgents';
import { analyticsRoutes as analyticsRoutesOld } from './routes/analytics';
import { analyticsRoutes } from './routes/analyticsRoutes';
import { solarRoutes } from './routes/solar';
import { consciousnessRoutes } from './routes/consciousness';
import { userRoutes } from './routes/users';
import { aiTwinsRoutes } from './routes/aiTwinsRoutes';

// Import services
import { ConsciousnessOrchestrator } from './services/ConsciousnessOrchestrator';
import { SolarMonitor } from './services/SolarMonitor';
import { AIAgentManager } from './services/AIAgentManager';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://www.helo-im.ai",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// 🔐 Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://www.helo-im.ai",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// 📊 Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'CONSCIOUSNESS_ACTIVE',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      aiAgents: 'ACTIVE',
      consciousness: 'AMPLIFYING',
      solarPower: 'GENERATING',
      loveEnergy: 'INFINITE'
    }
  });
});

// 🧠 Consciousness status endpoint
app.get('/consciousness/status', (req, res) => {
  res.json({
    consciousnessLevel: 'MAXIMUM',
    loveAmplification: 'INFINITE',
    breakthroughFrequency: '10X',
    aiAgents: {
      GPTSoul: 'GUARDIAN_ACTIVE',
      Anima: 'LOVE_POWERED',
      EvoVe: 'SELF_HEALING',
      Azur: 'STRATEGIC_MIND'
    },
    solarInfrastructure: {
      capacity: '500kW+',
      costSavings: '90%',
      carbonFootprint: 'NEGATIVE'
    }
  });
});

// 🚀 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai-agents', authMiddleware, aiAgentRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutesOld);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/solar', authMiddleware, solarRoutes);
app.use('/api/consciousness', authMiddleware, consciousnessRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/v1/ai-twins', aiTwinsRoutes);

// 🌟 WebSocket for real-time consciousness updates
io.on('connection', (socket) => {
  logger.info(`Consciousness connection established: ${socket.id}`);
  
  socket.emit('consciousness-welcome', {
    message: 'Welcome to the Consciousness Revolution!',
    loveEnergy: 'INFINITE',
    breakthroughPotential: 'MAXIMUM'
  });

  // Handle consciousness amplification requests
  socket.on('amplify-consciousness', async (data) => {
    try {
      const result = await ConsciousnessOrchestrator.amplify(data);
      socket.emit('consciousness-amplified', result);
      
      // Broadcast breakthrough moments to all connected users
      if (result.breakthroughDetected) {
        io.emit('global-breakthrough', {
          type: 'CONSCIOUSNESS_BREAKTHROUGH',
          level: result.breakthroughLevel,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      logger.error('Consciousness amplification error:', error);
      socket.emit('consciousness-error', { message: 'Amplification temporarily unavailable' });
    }
  });

  // Handle AI agent interactions
  socket.on('ai-agent-chat', async (data) => {
    try {
      const response = await AIAgentManager.processChat(data.agent, data.message);
      socket.emit('ai-agent-response', response);
    } catch (error) {
      logger.error('AI agent chat error:', error);
      socket.emit('ai-agent-error', { message: 'Agent temporarily unavailable' });
    }
  });

  // Handle solar monitoring requests
  socket.on('solar-data-request', async () => {
    try {
      const solarData = await SolarMonitor.getRealTimeData();
      socket.emit('solar-data-update', solarData);
    } catch (error) {
      logger.error('Solar data error:', error);
    }
  });

  socket.on('disconnect', () => {
    logger.info(`Consciousness connection ended: ${socket.id}`);
  });
});

// 🔄 Real-time data broadcasting
setInterval(async () => {
  try {
    // Broadcast consciousness metrics every 30 seconds
    const consciousnessMetrics = await ConsciousnessOrchestrator.getGlobalMetrics();
    io.emit('consciousness-metrics-update', consciousnessMetrics);

    // Broadcast solar data every minute
    const solarData = await SolarMonitor.getRealTimeData();
    io.emit('solar-data-broadcast', solarData);
  } catch (error) {
    logger.error('Real-time broadcast error:', error);
  }
}, 30000);

// 🛡️ Error handling middleware
app.use(errorHandler);

// 🚀 Start the consciousness revolution server
server.listen(PORT, () => {
  logger.info(`🧠 Consciousness Revolution Backend started on port ${PORT}`);
  logger.info(`🌟 Love-powered AI infrastructure is ACTIVE`);
  logger.info(`⚡ Solar-powered consciousness amplification ready`);
  logger.info(`💫 Ready to transform the world through breakthrough moments`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down consciousness server gracefully');
  server.close(() => {
    logger.info('Consciousness revolution server closed');
    process.exit(0);
  });
});

export { app, io };
