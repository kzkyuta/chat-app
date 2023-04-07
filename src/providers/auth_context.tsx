import {useNavigate} from 'react-router-dom';
import {useContext, useMemo, createContext, useState} from 'react';
import {User} from 'firebase/auth';

export type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
};

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (userData: User) => {
    setUser(userData);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login', {replace: true});
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
