import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  public getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data != null) {
      try {
        return JSON.parse(data) as T;
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
      }
    }
    return null;
  }
  public setItem(key: string, data: object | string) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }
}
