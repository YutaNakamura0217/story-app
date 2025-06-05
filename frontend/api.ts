export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('authToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}) as Record<string, string>
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    ...options,
    headers
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
