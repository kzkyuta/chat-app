import React, {useEffect, useState} from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import {useAuthContext} from '../providers/auth_context';
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {db, firebaseAuth} from '../firebase';
import {ChatContextType, useChatContext} from '../providers/chat_context';
import {v4 as uuid} from 'uuid';
import {User, signOut} from 'firebase/auth';

export type messageType = {
  id: string;
  msg: string;
  senderId: string;
  senderImg: string;
  dateTime: Timestamp;
};

const ChatScreen = () => {
  const authContext: User | null = useAuthContext();
  const chatContext: ChatContextType = useChatContext();
  const [messages, setMessages] = useState<messageType[]>([]);
  const [msg, setMsg] = useState('');
  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', chatContext.chatId), {
      messages: arrayUnion({
        id: uuid(),
        msg,
        senderId: authContext?.uid,
        senderImg: authContext?.photoURL,
        dateTime: Timestamp.now(),
      }),
    });
    setMsg('');
  };

  useEffect(() => {
    const UnSub = onSnapshot(doc(db, 'chats', chatContext.chatId), doc => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      UnSub();
    };
  }, [chatContext.chatId]);

  return (
    <div style={{position: 'relative', height: '500px'}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map(m => (
              <Message
                key={m.id}
                model={{
                  message: m.msg,
                  sentTime: m.dateTime.toString(),
                  sender: m.msg,
                  direction:
                    m.senderId === authContext?.uid ? 'outgoing' : 'incoming',
                  position: 0,
                }}>
                <Avatar src={m.senderImg} />
              </Message>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={msg}
            onChange={setMsg}
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
      <div style={{display: 'grid', margin: '5% 0', textAlign: 'center'}}>
        <p>アカウント名：{authContext?.displayName}</p>
        <button onClick={() => signOut(firebaseAuth)}>ログアウト</button>
      </div>
    </div>
  );
};

export default ChatScreen;
