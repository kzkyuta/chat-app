import React from 'react';
import {ChatContextProvider} from '../providers/chat_context';
import {AuthContextProvider} from '../providers/auth_context';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = props => {
  return (
    <ChatContextProvider>
      <AuthContextProvider>{props.children}</AuthContextProvider>
    </ChatContextProvider>
  );
};
