import {useState} from 'react';
import {AuthUserContextType, useAuthUserContext} from '../providers';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth} from '../firebase';
import {UserType} from '../types';

const LoginScreen = () => {
  const authUser: AuthUserContextType = useAuthUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      login();
    } catch (e) {
      alert(e);
    }
    console.log('登録');
  };
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
        <div style={{display: 'grid'}}>
          <button>ユーザ登録 画面へ移動</button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
