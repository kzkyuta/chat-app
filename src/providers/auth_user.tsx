import {useNavigate} from 'react-router-dom';
import {useContext, useMemo, createContext, useState} from 'react';
import {UserType} from '../types';

export type AuthUserContextType = {
  user: UserType | null;
  login: (user: UserType) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType,
);

export const useAuthUserContext = (): AuthUserContextType => {
  return useContext<AuthUserContextType>(AuthContext);
};

type Props = {
  children: React.ReactNode;
};

export const AuthUserProvider: React.FC<Props> = props => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const login = async (userData: UserType) => {
    setUser(userData);
    navigate('/chat');
    console.log('called navigate');
  };

  const logout = () => {
    setUser(null);
    navigate('/', {replace: true});
  };

  const value: AuthUserContextType = useMemo(
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
