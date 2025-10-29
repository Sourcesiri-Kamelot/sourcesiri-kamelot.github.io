import { Router, Request, Response } from 'express';
import { ollamaService } from '../services/OllamaService';
import { logger } from '../utils/logger';

const router = Router();

router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { model, prompt, stream } = req.body;

    if (!model || !prompt) {
      res.status(400).json({ error: 'Model and prompt are required.' });
      return;
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      try {
        for await (const chunk of ollamaService.generateStreamResponse(model, prompt)) {
          res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      } catch (error) {
  res.write(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`);
  res.end();
  return;
      }
    } else {
  const response = await ollamaService.generateResponse(model, prompt);
  res.json({ response });
  return;
    }
  } catch (error) {
    logger.error(`AI Twins chat error: ${error}`);
    res.status(500).json({ error: 'Failed to connect to Ollama service.' });
  }
});

export { router as aiTwinsRoutes };
