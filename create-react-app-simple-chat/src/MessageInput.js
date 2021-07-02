import { MessageRepository } from '@amityco/js-sdk'

import Input from './Input'

function MessageInput({ channelId }) {
  const sendMessage = text => {
    new MessageRepository().createTextMessage({
      channelId,
      text,
    })
  }

  return <Input placeholder="Type something..." onInput={sendMessage} />
}

export default MessageInput
