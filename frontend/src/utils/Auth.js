import jwtDecode from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getCurrentUser = () => {
  try {
    const token = getToken();
    if (!token) return null;
    return jwtDecode(token);
  } catch {
    return null;
  }
};
