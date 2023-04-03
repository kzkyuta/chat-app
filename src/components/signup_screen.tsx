import React from 'react';
import {UserType} from '../types';
import {AuthUserContextType, useAuthUserContext} from '../providers';

const SignUpScreen = () => {
  const authUser: AuthUserContextType = useAuthUserContext();
  const signin = () => {
    const user: UserType = {
      name: 'test',
      iconPath: '',
      isLogin: true,
    };
    authUser.login(user);
  };

  const handleSubmit = (event: {preventDefault: () => void}) => {
    event.preventDefault();
    signin();
    console.log('登録');
  };
  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
