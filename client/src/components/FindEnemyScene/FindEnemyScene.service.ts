import io from 'socket.io-client';
import { WEBSOCKET_HOST_PORT, WEBSOCKET_PATH } from '@/constants/constants';
import { store } from '@/redux/store/rootStore';
import Socket = SocketIOClient.Socket;

export function connectToServer(): Socket {
  const state = store.getState();
  const token = state.authUser.accessToken;
  return io.connect(WEBSOCKET_HOST_PORT, {
    path: WEBSOCKET_PATH,
    query: { token },
  });
}
