import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payloadData: { de: string; cuerpo: string }) => {
    io.emit('mensaje-nuevo', payloadData);
    console.log('Mensaje Recivido', payloadData);
  });
};
