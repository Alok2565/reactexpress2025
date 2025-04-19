import { jwtDecode } from 'jwt-decode';

export function saveToken(token) {
  localStorage.setItem('authToken', token);
}

export function getRoleFromToken() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}
