import { jwtDecode } from "jwt-decode";

const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};
export { isLoggedIn };
