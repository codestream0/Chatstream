'use client';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export function useSocket(userId?: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io('http://localhost:3300', {
      transports: ['websocket'],
    });

    // Register the user on connect
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
      socketInstance.emit('register', userId);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  return socket;
}
