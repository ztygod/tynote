/**
 * 网络请求工具函数
 */

/**
 * 请求配置接口
 */
export interface RequestConfig extends RequestInit {
  timeout?: number;
  baseURL?: string;
}

/**
 * 响应数据接口
 */
export interface ResponseData<T = any> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

/**
 * 通用 fetch 请求
 */
export async function request<T = any>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  const {
    timeout = 30000,
    baseURL = "",
    headers = {},
    ...rest
  } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const fullURL = baseURL ? `${baseURL}${url}` : url;
    const response = await fetch(fullURL, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: ResponseData<T> = await response.json();
    return (data.data || data) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * GET 请求
 */
export function get<T = any>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  return request<T>(url, { ...config, method: "GET" });
}

/**
 * POST 请求
 */
export function post<T = any>(
  url: string,
  body: any,
  config: RequestConfig = {}
): Promise<T> {
  return request<T>(url, {
    ...config,
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * PUT 请求
 */
export function put<T = any>(
  url: string,
  body: any,
  config: RequestConfig = {}
): Promise<T> {
  return request<T>(url, {
    ...config,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

/**
 * DELETE 请求
 */
export function del<T = any>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  return request<T>(url, { ...config, method: "DELETE" });
}

/**
 * 请求去抖
 */
export function debounceRequest<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  delay: number = 300
) {
  let timeoutId: NodeJS.Timeout;
  return async (...args: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args).then(resolve).catch(reject);
      }, delay);
    });
  };
}

/**
 * 请求节流
 */
export function throttleRequest<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  delay: number = 300
) {
  let lastCall = 0;
  return async (...args: T): Promise<R> => {
    const now = Date.now();
    if (now - lastCall < delay) {
      return Promise.reject(new Error("Request throttled"));
    }
    lastCall = now;
    return fn(...args);
  };
}
