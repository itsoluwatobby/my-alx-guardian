
class UseLocalStorage {
  private useLocalStore: Storage;
  constructor() {
    this.useLocalStore = window.localStorage;
  }
  setStorage<T>(key: string, value: T, encode = true) {
    let storedValue;
    if (typeof value === 'object' || typeof value === 'boolean') {
      storedValue = JSON.stringify(value);
    }
    else storedValue = encode ? btoa(value as string) : value as string;
    this.useLocalStore.setItem(key, storedValue);
  }

  getStorage<T>(key: string, decode = true): string | T {
    try {
      return JSON.parse(this.useLocalStore.getItem(key) as string) as T;
    } catch(error) {
      const val = this.useLocalStore.getItem(key) as string;
      return decode ? atob(val) : val;
    }
  }

  removeStorage(key: string) {
    this.useLocalStore.removeItem(key);
  }

  clearStorage() {
    this.useLocalStore.clear();
  }
}

export default new UseLocalStorage();