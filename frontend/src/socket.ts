import { io,Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:8000';

export const socket:Socket = io(URL);