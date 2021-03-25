import EkoClient from "eko-sdk";

// Amity sample-app apiKey
const apiKey = "b3bee90c39d9a5644831d84e5a0d1688d100ddebef3c6e78";
export const client = EkoClient.create({ apiKey });

export const connectClient = (userId) => {
  client.registerSession({ userId });
};
