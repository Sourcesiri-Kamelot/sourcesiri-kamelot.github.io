// Legacy browser-friendly client for AI Twins demo.
// Exposes window.AITwinsClient with a chat(model, prompt, onChunk?) method.
(function () {
  class AITwinsClient {
    constructor(baseUrl = '') {
      this.baseUrl = baseUrl || '';
    }

    async chat(model, prompt, onChunk) {
      if (!model || !prompt) throw new Error('model and prompt required');

      if (typeof onChunk === 'function') {
        // streaming mode
        const res = await fetch(this.baseUrl + '/api/v1/ai-twins/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, prompt, stream: true })
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE-style: split on \n\n
          let parts = buffer.split('\n\n');
          buffer = parts.pop();

          for (const part of parts) {
            const line = part.trim();
            if (!line) continue;
            if (line.startsWith('data:')) {
              const json = line.replace(/^data:\s*/, '');
              try {
                const obj = JSON.parse(json);
                if (obj.chunk) {
                  // chunk may be an object, extract inner string
                  const chunkData = obj.chunk?.response || obj.chunk;
                  onChunk(chunkData);
                } else if (obj.error) {
                  throw new Error(obj.error);
                }
              } catch (e) {
                // If it's not JSON, just forward raw
                onChunk(json);
              }
            }
          }
        }

        return { ok: true };
      } else {
        // non-streaming
        const res = await fetch(this.baseUrl + '/api/v1/ai-twins/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, prompt })
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        return await res.json();
      }
    }
  }

  // Expose globally
  window.AITwinsClient = window.AITwinsClient || AITwinsClient;
})();
