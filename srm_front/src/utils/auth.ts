import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};


export default isTokenExpired;