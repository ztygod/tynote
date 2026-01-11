/**
 * 日期处理工具函数
 */

/**
 * 格式化日期
 * @example
 * formatDate(new Date(), "YYYY-MM-DD") // "2026-01-11"
 */
export function formatDate(
  date: Date,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string {
  const pad = (num: number) => String(num).padStart(2, "0");
  
  const replacements: Record<string, string | number> = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };

  let result = format;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(key, String(value));
  });
  
  return result;
}

/**
 * 获取相对时间描述
 * @example
 * getRelativeTime(new Date(Date.now() - 5 * 60 * 1000)) // "5 分钟前"
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days < 7) return `${days} 天前`;
  
  return formatDate(date, "YYYY-MM-DD");
}

/**
 * 是否是今天
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * 是否是昨天
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
}

/**
 * 获取日期范围（用于搜索）
 */
export function getDateRange(
  type: "today" | "week" | "month" | "year"
): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();

  switch (type) {
    case "today":
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case "week":
      start.setDate(start.getDate() - 7);
      break;
    case "month":
      start.setMonth(start.getMonth() - 1);
      break;
    case "year":
      start.setFullYear(start.getFullYear() - 1);
      break;
  }

  return { start, end };
}
