import { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authenticationService } from 'src/services/AuthenticationService';

interface User {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  usuarioId: number;
  email: string;
  nome: string;
  cargo: string;
  avatar: string;
}

interface AuthContextType {
  authenticated: boolean;
  userContent?: User | null;
  login: (email: string, password: string, onSuccess?: () => void, onError?: (error: string) => void) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userContent, setUserContent] = useState<User | null>(null);

  // Initialize authentication state from token
  useEffect(() => {
    const token = authenticationService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<User>(token); // Explicit type for decoded token
        console.log(decoded)
        if (decoded.exp * 1000 > Date.now()) {
          setUserContent(decoded);
          setAuthenticated(true);
        } else {
          authenticationService.logout(); // Token expired
        }
      } catch (err) {
        authenticationService.logout(); // Invalid token
      }
    }
  }, []);

  const login = (email: string, password: string, onSuccess?: () => void, onError?: (error: string) => void) => {
    return authenticationService
      .login(email, password)
      .then((response) => {
        const token = response.data.token;
        authenticationService.saveToken(token);
        const decoded = jwtDecode<User>(token);
        setUserContent(decoded);
        setAuthenticated(true);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed';
        if (onError) onError(message);
      });
  };

  const logout = () => {
    authenticationService.logout();
    setUserContent(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, userContent: userContent, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
