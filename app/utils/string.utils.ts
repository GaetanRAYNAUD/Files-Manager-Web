// Generate a secure random string using the browser crypto functions
export function generateRandomString(length: number = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}