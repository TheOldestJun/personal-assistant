function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base64ToBuf(b64) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr.buffer;
}

async function getAesKeyFromSecretKey(secret) {
  const secretBuf = new TextEncoder().encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', secretBuf);
  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ]);
}

export async function encryptJwtWithSecret(secret, jwt) {
  if (!secret) throw new Error('No secret provided');
  const key = await getAesKeyFromSecretKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(jwt);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded,
  );
  return `${bufToBase64(iv.buffer)}.${bufToBase64(cipherBuf)}`;
}

export async function decryptJwtWithSecret(secret, payload) {
  if (!secret) throw new Error('No secret provided');
  if (!payload) return null;
  const [ivB64, ctB64] = payload.split('.');
  if (!ivB64 || !ctB64) throw new Error('Invalid payload format');
  const key = await getAesKeyFromSecretKey(secret);
  const iv = new Uint8Array(base64ToBuf(ivB64));
  const cipherBuf = base64ToBuf(ctB64);
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    cipherBuf,
  );
  return new TextDecoder().decode(plainBuf);
}
