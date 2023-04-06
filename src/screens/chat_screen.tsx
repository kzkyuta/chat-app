import React from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import {AuthUserContextType, useAuthUserContext} from '../providers';

const ChatScreen = () => {
  const authUser: AuthUserContextType = useAuthUserContext();
  const logout = () => {
    authUser.logout();
  };

  return (
    <div style={{position: 'relative', height: '500px'}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: 'just now',
                sender: 'Joe',
                direction: 'incoming',
                position: 0,
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
      <div style={{display: 'grid', margin: '5% 0'}}>
        <button onClick={logout}>ログアウト</button>
      </div>
    </div>
  );
};

export default ChatScreen;
