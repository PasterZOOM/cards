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
  const chatMessages = useRef<OverlayScrollbarsComponent>(null);

  const onHostSizeChanged = (): void => {
    if (chatMessages.current) {
      chatMessages.current.osInstance()?.scroll({ y: '100%' });
    }
  };

  const onContentSizeChanged = (): void => {
    if (chatMessages.current) {
      const { overflowAmount, scrollPosition } = getScroll(chatMessages.current);

      if (overflowAmount - scrollPosition > differenceScrollPosition) {
        if (scrollDown && chatMessages.current) {
          chatMessages.current.osInstance()?.scroll({ y: '100%' });
          setScrollDown(false);
        } else chatMessages.current.osInstance()?.scroll({ y: scrollPosition });
      } else {
        chatMessages.current.osInstance()?.scroll({ y: '100%' });
      }
    }
  };

  const onScrollStop = (): void => {
    if (chatMessages.current) {
      const { overflowAmount, scrollPosition } = getScroll(chatMessages.current);

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
      ref={chatMessages}
      className={styles.messages}
      options={options}
    >
      {messages.map(message => (
        <ChatMessage message={message} key={message._id} />
      ))}
    </OverlayScrollbarsComponent>
  );
};
