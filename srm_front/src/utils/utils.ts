export function getChangedFields<T>(original: T, updated: T): Partial<T> {
    const changed: Partial<T> = {};

    for (const key in original) {
        if (updated[key] !== original[key])
            changed[key] = updated[key];
    }
    return changed;
}


export function camelToSnake(text: string): string {
    return text.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function snakeToCamel(text: string): string {
    return text.replace(/(_\w)/g, letter => letter[1].toUpperCase());
}

export function transformKeysToCamelCase<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const camelKey = snakeToCamel(key);
    result[camelKey] = obj[key];
  }

  return result;
}

export function transformKeysToSnakeCase<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const snakeKey = camelToSnake(key);
    result[snakeKey] = obj[key];
  }

  return result;
}

export function cleanedFilters(
  filters?: Record<string, any>
): Record<string, string> {
  if (!filters) return {};
  
  return Object.fromEntries(
    Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, String(value)])
  );
}