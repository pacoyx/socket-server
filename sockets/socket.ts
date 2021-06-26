import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../clases/usurios-lista";
import { Usuario } from "../clases/Usuario";


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

//escuchar mensjae
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

//configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            estado: true,
            mensaje: `usuario ${payload.nombre} configurado`
        });
        // io.emit('mensaje-nuevo', payload);
    });
}

//obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}