/**
 * 本地存储工具函数
 */

/**
 * 设置本地存储
 */
export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to set storage:", error);
  }
}

/**
 * 获取本地存储
 */
export function getStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error("Failed to get storage:", error);
    return defaultValue ?? null;
  }
}

/**
 * 删除本地存储
 */
export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove storage:", error);
  }
}

/**
 * 清空所有本地存储
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear storage:", error);
  }
}

/**
 * 设置会话存储
 */
export function setSessionStorage<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to set session storage:", error);
  }
}

/**
 * 获取会话存储
 */
export function getSessionStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error("Failed to get session storage:", error);
    return defaultValue ?? null;
  }
}

/**
 * 删除会话存储
 */
export function removeSessionStorage(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove session storage:", error);
  }
}

/**
 * 带过期时间的本地存储
 */
export function setStorageWithExpiry<T>(
  key: string,
  value: T,
  expiryMs: number
): void {
  const data = {
    value,
    expiry: Date.now() + expiryMs,
  };
  setStorage(key, data);
}

/**
 * 获取带过期时间的本地存储
 */
export function getStorageWithExpiry<T>(key: string): T | null {
  const data = getStorage<{ value: T; expiry: number }>(key);
  
  if (!data) return null;
  
  if (Date.now() > data.expiry) {
    removeStorage(key);
    return null;
  }
  
  return data.value;
}
