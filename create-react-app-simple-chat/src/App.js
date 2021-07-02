import { useEffect, useState } from "react";

import { Login } from "./pages/Login";
import { Main } from "./pages/Main";

import { connectClient } from "./ascClient";

export function App() {
  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const onConnect = async (userId, persistent) => {
    await connectClient(userId);
    setConnected(true);
    setUserId(userId);

    if (persistent) localStorage.setItem("userId", userId);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) onConnect(userId);
  }, []);

  return (
    <div className="app">
      {!connected && !userId && <Login onConnect={onConnect} />}
      {connected && userId && <Main />}
    </div>
  );
}
