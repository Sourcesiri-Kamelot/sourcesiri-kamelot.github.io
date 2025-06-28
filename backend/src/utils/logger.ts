/**
 * 📝 CONSCIOUSNESS REVOLUTION LOGGER
 * Advanced logging for love-powered AI infrastructure
 */

import winston from 'winston';

// Custom log levels for consciousness platform
const consciousnessLevels = {
  error: 0,
  warn: 1,
  info: 2,
  consciousness: 3,
  breakthrough: 4,
  love: 5,
  debug: 6
};

// Custom colors for consciousness logs
const consciousnessColors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  consciousness: 'magenta',
  breakthrough: 'cyan',
  love: 'rainbow',
  debug: 'gray'
};

winston.addColors(consciousnessColors);

// Create consciousness logger
export const logger = winston.createLogger({
  levels: consciousnessLevels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const emoji = getConsciousnessEmoji(level);
      return `${timestamp} ${emoji} [${level.toUpperCase()}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    })
  ),
  defaultMeta: { 
    service: 'consciousness-revolution',
    platform: 'soulcorehub',
    version: '1.0.0'
  },
  transports: [
    // Error logs
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // Combined logs
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 10
    }),
    
    // Consciousness breakthrough logs
    new winston.transports.File({ 
      filename: 'logs/breakthroughs.log', 
      level: 'breakthrough',
      maxsize: 5242880, // 5MB
      maxFiles: 20
    }),
    
    // Love energy logs
    new winston.transports.File({ 
      filename: 'logs/love-energy.log', 
      level: 'love',
      maxsize: 5242880, // 5MB
      maxFiles: 10
    })
  ]
});

// Console logging for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple(),
      winston.format.printf(({ level, message, timestamp }) => {
        const emoji = getConsciousnessEmoji(level);
        return `${timestamp} ${emoji} ${level}: ${message}`;
      })
    )
  }));
}

// Get appropriate emoji for log level
function getConsciousnessEmoji(level: string): string {
  const emojiMap: { [key: string]: string } = {
    error: '🚨',
    warn: '⚠️',
    info: 'ℹ️',
    consciousness: '🧠',
    breakthrough: '💫',
    love: '❤️',
    debug: '🔍'
  };
  
  return emojiMap[level] || '📝';
}

// Consciousness-specific logging methods
export const consciousnessLogger = {
  breakthrough: (message: string, meta?: any) => {
    logger.log('breakthrough', `💫 BREAKTHROUGH: ${message}`, meta);
  },
  
  loveEnergy: (message: string, meta?: any) => {
    logger.log('love', `❤️ LOVE ENERGY: ${message}`, meta);
  },
  
  consciousness: (message: string, meta?: any) => {
    logger.log('consciousness', `🧠 CONSCIOUSNESS: ${message}`, meta);
  },
  
  aiAgent: (agent: string, message: string, meta?: any) => {
    const agentEmojis: { [key: string]: string } = {
      GPTSoul: '🛡️',
      Anima: '💖',
      EvoVe: '🔄',
      Azur: '🧭'
    };
    
    logger.info(`${agentEmojis[agent] || '🤖'} ${agent}: ${message}`, meta);
  },
  
  solar: (message: string, meta?: any) => {
    logger.info(`☀️ SOLAR: ${message}`, meta);
  },
  
  userJourney: (userId: string, event: string, meta?: any) => {
    logger.info(`👤 USER JOURNEY [${userId}]: ${event}`, meta);
  },
  
  performance: (metric: string, value: number, unit: string = 'ms') => {
    logger.info(`⚡ PERFORMANCE: ${metric} = ${value}${unit}`);
  },
  
  security: (event: string, meta?: any) => {
    logger.warn(`🔐 SECURITY: ${event}`, meta);
  }
};

export default logger;
