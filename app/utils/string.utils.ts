// Generate a secure random string using the browser crypto functions
export const generateRandomString = (length: number = 16): string => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const camelToSnakeUpperCase = (s: string): string => {
  if (!s) {
    return '';
  }

  return s.replace(/[A-Z]/g, (lettre, offset) => {
    return offset > 0 ? `_${ lettre }` : lettre;
  }).toUpperCase();
}