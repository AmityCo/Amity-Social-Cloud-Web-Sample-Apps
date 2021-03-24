import EkoClient from "eko-sdk";

// Amity sample-app apiKey
const apiKey = "b3bee858328ef4344a308e4a5a091688d05fdee2be353a2b";
export const client = EkoClient.create({ apiKey });

export const connectClient = (userId) => {
  client.registerSession({ userId });
};
