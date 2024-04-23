import { io,Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const dataUrl = process.env.REACT_APP_BASE_URL

export const socket:Socket = io(dataUrl?dataUrl:'http://10.100.10.105:8000');
const dataURL = process.env.REACT_APP_BASE_URL;

// export const socket:Socket = io(`${dataURL}`);
