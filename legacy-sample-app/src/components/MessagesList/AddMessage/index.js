import React, { Component } from 'react';

class AddMessage extends Component {
  render() {
    let input;
    const { currentChannelId, sendMessage } = this.props;
    return (
      <section id="new-message">
        <input
          placeholder="Type your message..."
          onKeyPress={e => {
            if (e.key === 'Enter' && input.value !== '') {
              sendMessage(input.value, currentChannelId);
              input.value = '';
            }
          }}
          type="text"
          ref={node => {
            input = node;
          }}
        />
        <button
          type="submit"
          onClick={() => {
            if (input.value !== '') {
              sendMessage(input.value, currentChannelId);
              input.value = '';
            }
          }}
          className="send-button"
        >
          Send
        </button>
      </section>
    );
  }
}

export default AddMessage;
