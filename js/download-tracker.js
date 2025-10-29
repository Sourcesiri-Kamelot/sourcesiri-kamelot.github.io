class DownloadTracker {
  constructor(apiUrl = 'http://localhost:3000/api/v1/analytics') {
    this.apiUrl = apiUrl;
  }

  async track(resource) {
    try {
      await fetch(`${this.apiUrl}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource })
      });
    } catch (error) {
      console.error('Download tracking failed:', error);
    }
  }

  trackLink(selector, resourceName) {
    document.querySelectorAll(selector).forEach(link => {
      link.addEventListener('click', () => this.track(resourceName));
    });
  }
}

// Auto-track common downloads
if (typeof window !== 'undefined') {
  const tracker = new DownloadTracker();
  
  document.addEventListener('DOMContentLoaded', () => {
    tracker.trackLink('a[href*="pitch-deck"]', 'pitch-deck');
    tracker.trackLink('a[href*="floor-plan"]', 'floor-plan');
  });
}
