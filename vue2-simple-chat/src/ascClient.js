import ASCClient, { ConnectionStatus, ApiEndpoint } from "@amityco/js-sdk";

// Amity sample-app apiKey
const apiKey = "b3bee90c39d9a5644831d84e5a0d1688d100ddebef3c6e78";
export const client = ASCClient.create({ apiKey, apiEndpoint: ApiEndpoint.SG });

export let currentUserId = null;

// promisified client connection
export const connectClient = async (userId) => {
  return new Promise((resolve) => {
    client.on("connectionStatusChanged", ({ newValue }) => {
      if (newValue === ConnectionStatus.Connected) {
        currentUserId = userId;
        resolve();
      }
    });

    client.registerSession({ userId });
  });
};

client.on('dataError', err => {
  console.log(err)
})
