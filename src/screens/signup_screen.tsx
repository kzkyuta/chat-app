import React, {useState} from 'react';
import {UserType} from '../types';
import {AuthUserContextType, useAuthUserContext} from '../providers';
import {db, firebaseAuth, storage} from '../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';

const SignUpScreen = () => {
  const authUser: AuthUserContextType = useAuthUserContext();
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
      uploadTask.on('state_changed', () => {
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
            console.log('setDoc:' + error);
          });
        });
      });
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
  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountImage(event.target.files![0]);
  };
  const handleChangeDisplayName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDisplayname(event.currentTarget.value);
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
            required
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            required
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <label>画像</label>
          <input
            name="file"
            type="file"
            accept="image/*"
            required
            onChange={handleChangeImage}
          />
        </div>
        <div>
          <label>ユーザ名</label>
          <input
            name="text"
            type="text"
            required
            onChange={handleChangeDisplayName}
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
