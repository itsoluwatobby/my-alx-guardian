
class UseLocalStorage {
  private useLocalStore: Storage;
  constructor() {
    this.useLocalStore = window.localStorage;
  }
  setStorage<T>(key: string, value: T) {
    let storedValue;
    if (typeof value === 'object' || typeof value === 'boolean') {
      storedValue = JSON.stringify(value);
    }
    else storedValue = value as string;
    this.useLocalStore.setItem(key, storedValue);
  }

  getStorage<T>(key: string): string | T {
    try {
      return JSON.parse(this.useLocalStore.getItem(key)!) as T;
    } catch(error) {
      return this.useLocalStore.getItem(key) as string;
    }
  }

  clearStorage() {
    this.useLocalStore.clear();
  }
}

export default new UseLocalStorage();