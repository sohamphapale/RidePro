import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  // Use Vite env var if present, otherwise default to localhost:4000
  const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });
    socketRef.current = socket;

    const handleConnect = () => {
      console.info("Socket connected:", socket.id);
      setConnected(true);
    };

    const handleDisconnect = (reason) => {
      console.info("Socket disconnected:", reason);
      setConnected(false);
    };

    const handleConnectError = (err) => {
      console.warn("Socket connect error:", err);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [SOCKET_URL]);

  // send message to server on a named event
  const sendMessage = (eventName, message = {}) => {
    socketRef.current.emit(eventName, message);
    return true;
  };

  // send message to server on a named event
  const reciveMessage = (eventName, callback) => {
    socketRef.current.on(eventName, callback);
    return true;
  };

  // subscribe to a named event
  const on = (eventName, cb) => {
    if (!socketRef.current) return () => {};
    socketRef.current.on(eventName, cb);
    return () => socketRef.current.off(eventName, cb);
  };

  // unsubscribe helper
  const off = (eventName, cb) => {
    socketRef.current?.off(eventName, cb);
  };

  const value = {
    socket: socketRef.current,
    connected,
    sendMessage,
    on,
    off,
    reciveMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return ctx;
};

export default SocketContext;
