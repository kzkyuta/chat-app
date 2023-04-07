import {useContext, createContext, useState, useEffect} from 'react';
import {User, onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from '../firebase';

const AuthContext = createContext<User | null>({} as User | null);

export const useAuthContext = (): User | null => {
  return useContext<User | null>(AuthContext);
};

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscrive = onAuthStateChanged(firebaseAuth, user => {
      setUser(user);
      console.log('displayname', user?.displayName);
    });
    return () => {
      unSubscrive();
    };
  }, []);

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};
