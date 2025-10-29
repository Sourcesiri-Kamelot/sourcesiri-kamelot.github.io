import request from 'supertest';
import { app } from '../src/index';
import { ollamaService } from '../src/services/OllamaService';

jest.mock('../src/services/OllamaService');

describe('AI Twins API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/ai-twins/chat', () => {
    it('should return response for non-streaming request', async () => {
      const mockResponse = 'Consciousness is a complex phenomenon...';
      (ollamaService.generateResponse as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/api/v1/ai-twins/chat')
        .send({ model: 'gemma:2b', prompt: 'What is consciousness?' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ response: mockResponse });
      expect(ollamaService.generateResponse).toHaveBeenCalledWith('gemma:2b', 'What is consciousness?');
    });

    it('should return 400 if model is missing', async () => {
      const response = await request(app)
        .post('/api/v1/ai-twins/chat')
        .send({ prompt: 'Test prompt' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Model and prompt are required.');
    });

    it('should return 400 if prompt is missing', async () => {
      const response = await request(app)
        .post('/api/v1/ai-twins/chat')
        .send({ model: 'gemma:2b' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Model and prompt are required.');
    });

    it('should return 500 if Ollama service fails', async () => {
      (ollamaService.generateResponse as jest.Mock).mockRejectedValue(
        new Error('Failed to connect to Ollama service.')
      );

      const response = await request(app)
        .post('/api/v1/ai-twins/chat')
        .send({ model: 'gemma:2b', prompt: 'Test' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to connect to Ollama service.');
    });

    it('should handle streaming request', async () => {
      const mockStream = (async function* () {
        yield 'Chunk 1 ';
        yield 'Chunk 2 ';
        yield 'Chunk 3';
      })();

      (ollamaService.generateStreamResponse as jest.Mock).mockReturnValue(mockStream);

      const response = await request(app)
        .post('/api/v1/ai-twins/chat')
        .send({ model: 'gemma:2b', prompt: 'Test', stream: true });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('text/event-stream');
    });
  });
});
