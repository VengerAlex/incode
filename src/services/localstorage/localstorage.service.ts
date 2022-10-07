class localStorageService {
  get(key: string): number | object | string | null {
    const item = localStorage.getItem(key);
    const numPattern = new RegExp(/^\d+$/);
    const jsonPattern = new RegExp(/[\[\{].*[\}\]]/);

    if (item) {
      if (jsonPattern.test(item)) {
        return JSON.parse(item);
      }
      if (numPattern.test(item)) {
        return parseFloat(item);
      }
      return item;
    }

    return null;
  }

  set(key: string, data: object | string): void {
    typeof data === "object"
      ? localStorage.setItem(key, JSON.stringify(data))
      : localStorage.setItem(key, data);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default new localStorageService();
