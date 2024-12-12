import { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { authenticationService } from 'src/services/AuthenticationService';

interface AuthContextType {
  authenticated: boolean;
  login: (email: string, password: string, onSuccess?: () => void, onError?: (error: string) => void) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Initialize `authenticated` state from localStorage
  useEffect(() => {
    setAuthenticated(authenticationService.isAuthenticated());
  }, []);

  const login = (email: string, password: string, onSuccess?: () => void, onError?: (error: string) => void) => {
    authenticationService
      .login(email, password)
      .then((response) => {
        const token = response.data.token;
        authenticationService.saveToken(token);
        setAuthenticated(true);
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed';
        if (onError) onError(message);
      });
  };

  const logout = () => {
    authenticationService.logout();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
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
