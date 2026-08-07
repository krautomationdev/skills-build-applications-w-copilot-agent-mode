const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const fallbackHost = 'http://localhost:8000';

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : fallbackHost;

export const apiBaseUrl = `${apiHost}/api`;
export const useCodespaceUrl = Boolean(codespaceName);

export function apiUrl(resource: string) {
  return `${apiBaseUrl}/${resource}/`;
}

function normalizeResponse(body: any): any {
  if (Array.isArray(body)) {
    return body;
  }
  if (Array.isArray(body?.data)) {
    return body.data;
  }
  if (Array.isArray(body?.results)) {
    return body.results;
  }
  return [body];
}

export async function fetchApi<T = any>(resource: string): Promise<T> {
  const response = await fetch(apiUrl(resource));
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error || `${response.status} ${response.statusText}`);
  }

  const body = await response.json();
  return normalizeResponse(body);
}
