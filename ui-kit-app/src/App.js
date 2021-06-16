import "./styles.css";
import { useState } from "react";

import { AmityUiKitProvider, AmityUiKitSocial } from "@amityco/ui-kit";

import Login from "./Login";

const apiKey = "b3bee90c39d9a5644831d84e5a0d1688d100ddebef3c6e78";

export default function App() {
  const [userId, setUserId] = useState();

  return (
    <div className="App">
      {!userId ? (
        <Login onSubmit={setUserId} />
      ) : (
        <AmityUiKitProvider
          key={userId}
          apiKey={apiKey}
          userId={userId}
          displayName={userId}
        >
          <AmityUiKitSocial />
        </AmityUiKitProvider>
      )}
    </div>
  );
}
