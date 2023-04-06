import {useEffect, useState} from 'react';
import {AuthUserContextType, useAuthUserContext} from '../providers';
import {
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import {firebaseAuth} from '../firebase';
import {UserType} from '../types';
import {useNavigate} from 'react-router-dom';

const LoginScreen = () => {
  const authUser: AuthUserContextType = useAuthUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      login();
    } catch (e) {
      alert(e);
    }
    console.log('登録');
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser: User | null) => {
      console.log(currentUser);
    });
  }, []);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const login = () => {
    const user: UserType = {
      name: 'test',
      iconPath: '',
      isLogin: true,
    };
    authUser.login(user);
  };

  return (
    <div className="container">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            onChange={handleChangePassword}
          />
        </div>
        <div style={{display: 'grid'}}>
          <button>ログイン</button>
        </div>
      </form>
      <div style={{display: 'grid'}}>
        <button onClick={() => navigate('/signup')}>
          ユーザ登録 画面へ移動
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
