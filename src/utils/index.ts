/**
 * 全局工具函数导出
 */

// 字符串工具
export {
  capitalize,
  camelToSnake,
  snakeToCamel,
  truncate,
  trim,
  isEmpty,
  generateRandomString,
} from "./string";

// 日期工具
export {
  formatDate,
  getRelativeTime,
  isToday,
  isYesterday,
  getDateRange,
} from "./date";

// 数组工具
export {
  unique,
  groupBy,
  sortBy,
  findItem,
  removeItem,
  paginate,
  last,
  flatten,
} from "./array";

// 存储工具
export {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setStorageWithExpiry,
  getStorageWithExpiry,
} from "./storage";

// 请求工具
export {
  request,
  get,
  post,
  put,
  del,
  debounceRequest,
  throttleRequest,
  type RequestConfig,
  type ResponseData,
} from "./request";

// 平台和浏览器工具
export {
  isApplePlatform,
  isWindowsPlatform,
  isLinuxPlatform,
  getOS,
  isMobileDevice,
  isInIframe,
  supportsTouchEvent,
} from "./platform";
