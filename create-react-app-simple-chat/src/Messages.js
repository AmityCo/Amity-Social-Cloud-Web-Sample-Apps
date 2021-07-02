import { useRef, useState, useEffect } from 'react'

import {
  MessageRepository
} from '@amityco/js-sdk'

import Message from './Message'

function Messages({ channelId }) {
  const [messages, setMessages] = useState([])

  const collection = useRef()

  useEffect(() => {
    collection.current = new MessageRepository()
      .messagesForChannel({ channelId })

    collection.current.on('dataUpdated', setMessages)

    return () => collection.current.dispose()
  }, [channelId])

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.messageId} {...message} />
      ))}
    </div>
  );
}

export default Messages
