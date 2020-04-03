import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-listas';
import { Usuario } from '../classes/usuario';

export const usuarioConectados = new UsuariosLista();

export const conectarUsuario = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuarioConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    const usuarioBorrado = usuarioConectados.borrarUsuario(cliente.id);
    console.log('Usuario desconectado', usuarioBorrado);
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payloadData: { de: string; cuerpo: string }) => {
    io.emit('mensaje-nuevo', payloadData);
    console.log('Mensaje Recivido', payloadData);
  });
};

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('configurar-usuario', (data, callback: Function) => {
    usuarioConectados.actualizarNombre(cliente.id, data.nombre);
    callback({
      ok: true,
      mensaje: `Usuario ${data.nombre}, configurado`
    });
  });
};
