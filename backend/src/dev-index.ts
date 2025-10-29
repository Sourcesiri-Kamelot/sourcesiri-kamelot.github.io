import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { aiTwinsRoutes } from './routes/aiTwinsRoutes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/v1/ai-twins', aiTwinsRoutes);

app.listen(PORT, () => {
  logger.info(`AI Twins demo server listening on port ${PORT}`);
});

export { app };
