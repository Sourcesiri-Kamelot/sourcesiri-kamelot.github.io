import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';

const router = Router();

interface DownloadMetric {
  resource: string;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}

const downloadMetrics: DownloadMetric[] = [];

router.post('/download', (req: Request, res: Response) => {
  const { resource } = req.body;

  if (!resource) {
    return res.status(400).json({ error: 'Resource name is required.' });
  }

  const metric: DownloadMetric = {
    resource,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    ip: req.ip
  };

  downloadMetrics.push(metric);
  logger.info(`Download tracked: ${resource}`);

  res.json({ success: true, message: 'Download tracked' });
});

router.get('/downloads', (req: Request, res: Response) => {
  const stats = downloadMetrics.reduce((acc, metric) => {
    acc[metric.resource] = (acc[metric.resource] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  res.json({
    total: downloadMetrics.length,
    byResource: stats,
    recent: downloadMetrics.slice(-10)
  });
});

export { router as analyticsRoutes };
