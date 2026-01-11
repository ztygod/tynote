/**
 * 浏览器和平台检测工具函数
 */

/**
 * 检测是否为 Apple 平台 (Mac, iPhone, iPad, iPod)
 */
export function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false;

  // 新版浏览器
  if ((navigator as any).userAgentData?.platform) {
    return (navigator as any).userAgentData.platform === "macOS";
  }

  // 兜底（旧浏览器）
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
}

/**
 * 检测是否为 Windows 平台
 */
export function isWindowsPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Windows|Win32/.test(navigator.userAgent);
}

/**
 * 检测是否为 Linux 平台
 */
export function isLinuxPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Linux/.test(navigator.userAgent);
}

/**
 * 获取当前操作系统
 */
export function getOS(): "Mac" | "Windows" | "Linux" | "Unknown" {
  if (isApplePlatform()) return "Mac";
  if (isWindowsPlatform()) return "Windows";
  if (isLinuxPlatform()) return "Linux";
  return "Unknown";
}

/**
 * 检测是否为移动设备
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * 检测是否在 iframe 中
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * 检测是否支持触摸事件
 */
export function supportsTouchEvent(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}
