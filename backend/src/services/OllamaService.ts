import { Ollama } from 'ollama';
import { logger } from '../utils/logger';

export class OllamaService {
  private ollama: Ollama;

  constructor() {
    const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
    this.ollama = new Ollama({ host: ollamaHost });
  }

  async generateResponse(model: string, prompt: string): Promise<string> {
    try {
      const response = await this.ollama.generate({
        model,
        prompt,
        stream: false
      });
      
      return response.response;
    } catch (error) {
      logger.error(`Ollama generation error: ${error}`);
      throw new Error('Failed to connect to Ollama service.');
    }
  }

  async *generateStreamResponse(model: string, prompt: string): AsyncGenerator<string> {
    try {
      const stream = await this.ollama.generate({
        model,
        prompt,
        stream: true
      });

      for await (const chunk of stream) {
        yield chunk.response;
      }
    } catch (error) {
      logger.error(`Ollama streaming error: ${error}`);
      throw new Error('Failed to connect to Ollama service.');
    }
  }
}

export const ollamaService = new OllamaService();
