import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../clases/usurios-lista";
import { Usuario } from "../clases/Usuario";


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);
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

        callback({
            estado: 'ok',
            mensaje: `usuario ${payload.nombre} configurado`
        });
        // io.emit('mensaje-nuevo', payload);
    });
}