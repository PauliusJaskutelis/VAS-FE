import { Client } from '@stomp/stompjs';

export const connectWebSocket = (
  onMessage: (modelId: string, status: string) => void
) => {
  const token = localStorage.getItem('token');

  const client = new Client({
    brokerURL: `http://localhost:8080/ws?token=${token}`,
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe('/topic/model-status', (message) => {
        const { modelId, status } = JSON.parse(message.body);
        onMessage(modelId, status);
      });
    },
  });

  client.activate();
  return client;
};
