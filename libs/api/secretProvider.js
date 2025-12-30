
let cachedSecret = null;
let loadingPromise = null;

export async function getClientSecret() {
  if (cachedSecret) return cachedSecret;
  if (loadingPromise) return loadingPromise;
  loadingPromise = fetch('/api/users/login', {
    method: 'GET',
  })
    .then(async res => {
      if (!res.ok) throw new Error("Can't fetch secret");
      const secret = await res.json();
      if (!secret) throw new Error('No secret returned');
      cachedSecret = secret;
      return cachedSecret;
    })
    .finally(() => {
      loadingPromise = null;
    });
  return loadingPromise;
}

export function clearCachedSecret() {
  cachedSecret = null;
}