/**
 * 数组处理工具函数
 */

/**
 * 数组去重
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * 数组分组
 * @example
 * groupBy([{id: 1, type: 'a'}, {id: 2, type: 'b'}], 'type')
 * // { a: [{...}], b: [{...}] }
 */
export function groupBy<T>(
  arr: T[],
  key: keyof T
): Record<string | number, T[]> {
  return arr.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      (result[groupKey] = result[groupKey] || []).push(item);
      return result;
    },
    {} as Record<string | number, T[]>
  );
}

/**
 * 数组排序
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * 查找数组中的项（支持深层属性）
 * @example
 * findItem(array, 'user.id', 1)
 */
export function findItem<T>(
  arr: T[],
  path: string,
  value: any
): T | undefined {
  return arr.find((item) => {
    const keys = path.split(".");
    let current: any = item;
    for (const key of keys) {
      current = current?.[key];
    }
    return current === value;
  });
}

/**
 * 从数组中移除项
 */
export function removeItem<T>(arr: T[], item: T): T[] {
  return arr.filter((i) => i !== item);
}

/**
 * 数组分页
 */
export function paginate<T>(
  arr: T[],
  page: number = 1,
  pageSize: number = 10
): T[] {
  const start = (page - 1) * pageSize;
  return arr.slice(start, start + pageSize);
}

/**
 * 获取数组的最后一项
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * 数组flat的简单实现
 */
export function flatten<T>(arr: any[]): T[] {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}
