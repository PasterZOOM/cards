import React, { useRef } from 'react';

import { Options } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import styles from './ChatMessages.module.scss';

import { differenceScrollPosition } from 'common/constants/projectConstants';
import { useAppSelector } from 'common/hooks/hooks';
import { getScroll } from 'common/utils/getScroll';
import { ChatMessage } from 'features/Chat/ChatModal/ChatMessages/ChatMessage/ChatMessage';
import { getMessages } from 'features/Chat/chatSelectors';

type PropsType = {
  clearUnreadMessages: (value: number) => void;
  scrollDown: boolean;
  setScrollDown: (value: boolean) => void;
};
export const ChatMessages: React.FC<PropsType> = ({
  clearUnreadMessages,
  scrollDown,
  setScrollDown,
}) => {
  const messages = useAppSelector(getMessages);
  const chatMessagesRef = useRef<OverlayScrollbarsComponent>(null);

  const onHostSizeChanged = (): void => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
    }
  };

  const onContentSizeChanged = (): void => {
    if (chatMessagesRef.current) {
      const { overflowAmount, scrollPosition } = getScroll(chatMessagesRef.current);

      if (overflowAmount - scrollPosition > differenceScrollPosition) {
        if (scrollDown && chatMessagesRef.current) {
          chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
          setScrollDown(false);
        } else chatMessagesRef.current.osInstance()?.scroll({ y: scrollPosition });
      } else {
        chatMessagesRef.current.osInstance()?.scroll({ y: '100%' });
      }
    }
  };

  const onScrollStop = (): void => {
    if (chatMessagesRef.current) {
      const { overflowAmount, scrollPosition } = getScroll(chatMessagesRef.current);

      if (overflowAmount - scrollPosition < differenceScrollPosition) {
        clearUnreadMessages(0);
      }
    }
  };

  const options: Options = {
    scrollbars: {
      clickScrolling: true,
      autoHide: 'leave',
      autoHideDelay: 0,
    },
    callbacks: {
      onContentSizeChanged,
      onScrollStop,
      onHostSizeChanged,
    },
  };

  return (
    <OverlayScrollbarsComponent
      ref={chatMessagesRef}
      className={styles.messages}
      options={options}
    >
      {messages.map(message => (
        <ChatMessage message={message} key={message._id} />
      ))}
    </OverlayScrollbarsComponent>
  );
};
