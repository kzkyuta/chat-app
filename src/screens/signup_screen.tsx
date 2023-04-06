import React, {useState} from 'react';
import {UserType} from '../types';
import {AuthUserContextType, useAuthUserContext} from '../providers';
import {firebaseAuth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const SignUpScreen = () => {
  const authUser: AuthUserContextType = useAuthUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: {preventDefault: () => void}) => {
    console.log('登録');
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      signin();
    } catch (e) {
      alert(e);
    }
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const signin = () => {
    const user: UserType = {
      name: 'test',
      iconPath: '',
      isLogin: true,
    };
    authUser.login(user);
  };

  return (
    <div className="container">
      <h1>ユーザ登録</h1>
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
        <div>
          <label>画像</label>
          <input
            name="file"
            type="file"
            // onChange={handleChangePassword}
          />
        </div>
        <div>
          <label>ユーザ名</label>
          <input
            name="text"
            type="text"
            // onChange={handleChangePassword}
          />
        </div>
        <div style={{display: 'grid'}}>
          <button>ユーザ登録</button>
        </div>
      </form>
      <div style={{display: 'grid'}}>
        <button onClick={() => navigate('/login')}>ログイン 画面へ移動</button>
      </div>
    </div>
  );
};

export default SignUpScreen;
