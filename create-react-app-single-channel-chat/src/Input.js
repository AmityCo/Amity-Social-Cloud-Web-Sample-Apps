function Input({ placeholder, onInput }) {
  const onKeyPress = (e) => {
    if (e.key !== "Enter") return;
    onInput(e.target.value);
    e.target.value = "";
  };

  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      onKeyPress={onKeyPress}
    />
  );
}

export default Input;
