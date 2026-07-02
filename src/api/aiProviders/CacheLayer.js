// Simple localStorage based caching to prevent redundant AI API calls
export class CacheLayer {
  static PREFIX = 'ai_cache_';
  static TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

  static get(key) {
    try {
      const itemStr = localStorage.getItem(this.PREFIX + key);
      if (!itemStr) return null;
      
      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(this.PREFIX + key);
        return null;
      }
      return item.value;
    } catch (e) {
      console.warn("Cache parsing error", e);
      return null;
    }
  }

  static set(key, value) {
    try {
      const item = {
        value: value,
        expiry: Date.now() + this.TTL_MS,
      };
      localStorage.setItem(this.PREFIX + key, JSON.stringify(item));
    } catch (e) {
      console.warn("Cache storage error", e);
      // If quota exceeded, clear old cache
      if (e.name === 'QuotaExceededError') {
        this.clear();
      }
    }
  }

  static clear() {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(this.PREFIX)) {
        localStorage.removeItem(k);
      }
    });
  }

  // Create a unique deterministic key from function arguments
  static generateKey(functionName, ...args) {
    return `${functionName}_${JSON.stringify(args).replace(/[^a-zA-Z0-9]/g, '')}`;
  }
}
