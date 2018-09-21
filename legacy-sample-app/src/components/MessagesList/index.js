import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { MessageRepository, EkoLoadingStatus } from 'eko-sdk';
import styled from 'styled-components';

import Message from './Message';

const MessageListPanel = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0;
  padding: 0 20px;
`;

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.messageCollection = undefined;
    this.messageRepo = new MessageRepository();
    this.state = {
      messages: [],
      canLoadMore: false,
    };
  }

  componentDidMount() {
    this.resetMessageCollection();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentChannelId !== state.prevChannelId) {
      return {
        messages: [],
        canLoadMore: false,
        prevChannelId: props.currentChannelId,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const { currentChannelId } = this.props;
    if (prevProps.currentChannelId !== currentChannelId) {
      this.resetMessageCollection();
    }
  }

  componentWillUnmount() {
    this.messageCollection && this.messageCollection.dispose();
  }

  // Render messages in Channel
  resetMessageCollection = () => {
    const { currentChannelId } = this.props;
    this.messageCollection && this.messageCollection.dispose();
    // Get messages in selected Channel
    this.messageCollection = this.messageRepo.messagesForChannel({
      channelId: currentChannelId,
    });

    // Once message data is received, run the following code.
    this.messageCollection.on('dataUpdated', data => {
      this.setState({ messages: data });
    });

    this.messageCollection.on('loadingStatusChanged', ({ newValue }) => {
      if (newValue === EkoLoadingStatus.Loaded) {
        this.setState({ canLoadMore: this.messageCollection.hasMore });
      } else {
        this.setState({ canLoadMore: false });
      }
    });
  };

  render() {
    const { canLoadMore, messages } = this.state;
    const { currentUserId } = this.props;

    return (
      <div id="message-infinite-scroll-wrapper">
        <InfiniteScroll
          loadMore={() => canLoadMore && this.messageCollection.nextPage()}
          hasMore={canLoadMore}
          useWindow={false}
          loader={<span key={0}>Loading</span>}
          isReverse
        >
          <MessageListPanel>
            {messages.map(message => (
              <Message key={message.messageId} currentUserId={currentUserId} {...message} />
            ))}
          </MessageListPanel>
        </InfiniteScroll>
      </div>
    );
  }
}

export default MessagesList;
