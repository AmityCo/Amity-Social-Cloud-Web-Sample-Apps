import ASCClient, { ConnectionStatus, ApiEndpoint } from "@amityco/js-sdk";

// Amity sample-app apiKey
const apiKey = "b3bee90c39d9a5644831d84e5a0d1688d100ddebef3c6e78";
export const client = ASCClient.create({ apiKey, apiEndpoint: ApiEndpoint.SG });

export const isConnected = () => {
  return client.isConnected;
};

export const connectClient = (userId, onConnect = () => {}) => {
  client.once("connectionStatusChanged", ({ newValue }) => {
    onConnect(newValue);
  });

  client.registerSession({ userId });
};
