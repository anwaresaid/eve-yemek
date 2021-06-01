import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { baseUrl } from './constants';

export const useSocket = () => {
  const socket = io(baseUrl, {
    transports: ['websocket'],
  });
  return socket;
};
