import {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {FIRST_GROUP_CHAT, useChatContext} from '../providers/chat_context';

const LoginScreen = () => {
  const chatContext = useChatContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate('/');
      chatContext.changeChat(FIRST_GROUP_CHAT);
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
