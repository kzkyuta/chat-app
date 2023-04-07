import {createContext, useContext, useMemo, useState} from 'react';

export type ChatContextType = {
  chatId: string;
  changeChat: (val: string) => void;
};

export const FIRST_GROUP_CHAT = 'first_group_chat';

const ChatContext = createContext({} as ChatContextType);

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const [chatId, changeChat] = useState('');

  const value: ChatContextType = useMemo(
    () => ({
      chatId,
      changeChat,
    }),
    [chatId],
  );

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};
