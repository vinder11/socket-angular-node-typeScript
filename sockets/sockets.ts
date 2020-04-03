import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-listas';
import { Usuario } from '../classes/usuario';
import Server from '../classes/server';

export const usuarioConectados = new UsuariosLista();

export const conectarUsuario = (cliente: Socket, io: socketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuarioConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('disconnect', () => {
    const usuarioBorrado = usuarioConectados.borrarUsuario(cliente.id);
    console.log('Usuario desconectado', usuarioBorrado);

    io.emit('usuarios-activos', usuarioConectados.getLista());
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

    io.emit('usuarios-activos', usuarioConectados.getLista());

    callback({
      ok: true,
      mensaje: `Usuario ${data.nombre}, configurado`
    });
  });
};

//emitir usuarios

export const obtenerUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('obtener-usuarios', () => {
    //
    io.to(cliente.id).emit('usuarios-activos', usuarioConectados.getLista());
  });
};
