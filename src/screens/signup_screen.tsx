import React, {useState} from 'react';
import {db, firebaseAuth, storage} from '../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {AuthContextType, useAuthContext} from '../providers/auth_context';
import {
  ChatContextType,
  FIRST_GROUP_CHAT,
  useChatContext,
} from '../providers/chat_context';

const SignUpScreen = () => {
  const authContext: AuthContextType = useAuthContext();
  const chatContext: ChatContextType = useChatContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayname] = useState('');
  const [accountImage, setAccountImage] = useState<File | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, accountImage!);
      uploadTask.on(
        'state_changed',
        error => {
          console.log('Uploading file error: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              title: displayName,
              photoURL: downloadURL,
            }).catch(error => {
              console.log('setDoc error:', error);
            });
          });
        },
      );

      chatContext.changeChat(FIRST_GROUP_CHAT);
      const chatRes = await getDoc(doc(db, 'chats', chatContext.chatId));
      if (!chatRes.exists()) {
        await setDoc(doc(db, 'chats', chatContext.chatId), {messages: []});
      }
      authContext.login(res.user);
    } catch (e) {
      alert(e);
    }
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
            required
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            required
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>画像</label>
          <input
            name="file"
            type="file"
            accept="image/*"
            required
            onChange={e => setAccountImage(e.target.files![0])}
          />
        </div>
        <div>
          <label>ユーザ名</label>
          <input
            name="text"
            type="text"
            required
            onChange={e => setDisplayname(e.currentTarget.value)}
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
