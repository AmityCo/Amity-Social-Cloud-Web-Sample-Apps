function Message({ userId, data: { text } }) {
  return <div className="message">
    <strong>{userId}</strong>: {text}
  </div>
}

export default Message
