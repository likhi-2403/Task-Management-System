import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    if (response.data.success) {
      const jwt = response.data.token;

      localStorage.setItem("token", jwt);
      localStorage.setItem("email", credentials.email);

      setToken(jwt);
      setIsAuthenticated(true);
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}