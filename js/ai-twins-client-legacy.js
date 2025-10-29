(function () {
  class AITwinsClient {
    constructor(baseUrl = null) {
      this.baseUrl = baseUrl || (window.CONFIG ? window.CONFIG.getApiUrl() : 'http://localhost:3000');
    }
    
    async chat(model, prompt) {
      const url = `${this.baseUrl}/api/v1/ai-twins/chat`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }
      
      return await response.json();
    }
  }

  window.AITwinsClient = window.AITwinsClient || AITwinsClient;
})();
