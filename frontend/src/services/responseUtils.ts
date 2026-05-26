export function ensureArray<T>(data: any): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && Array.isArray(data.content)) return data.content as T[];
  return [];
}

export default ensureArray;
