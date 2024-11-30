import { hc } from "hono/client";
import { useEffect, useState } from "react";

export default function useSocket() {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // ~ ======= Initialize WebSocket connection
    const client = hc("http://localhost:3001");
    const websocket = client.ws.$ws();
    setWs(websocket); // Store WebSocket instance in state

    // ~ ======= Setup event listeners
    websocket.addEventListener("send-message", () => {
      setInterval(() => {
        websocket.send(new Date().toString());
      }, 1000);
    });

    websocket.addEventListener("message", (message) => {
      console.log(message);
    });

    // ~ ======= Cleanup WebSocket connection on component unmount
    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  return ws;
}
