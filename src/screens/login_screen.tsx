import {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {AuthUserContextType, useAuthUserContext} from '../providers/auth_user';
import {FIRST_GROUP_CHAT, useChatIdContext} from '../providers/chat_context';

const LoginScreen = () => {
  const authContext: AuthUserContextType = useAuthUserContext();
  const chatIdContext = useChatIdContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      chatIdContext.setChatId(FIRST_GROUP_CHAT);
      authContext.login(res.user);
    } catch (e) {
      alert(e);
    }
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
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            onChange={e => setPassword(e.currentTarget.value)}
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
