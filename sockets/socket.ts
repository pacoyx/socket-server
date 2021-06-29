import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../clases/usurios-lista";
import { Usuario } from "../clases/Usuario";
import { Mapa } from "../clases/mapa";
import { Marcador } from "../clases/marcador";


export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();

//Eventos de mapa
export const mapaSockets = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('marcador-nuevo', (marcador: Marcador) => {

        mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);

    });

    cliente.on('marcador-borrar', (id: string) => {

        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);

    });

    cliente.on('marcador-mover', (marcador: Marcador) => {

        mapa.moverMarcadores(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);

    });


}









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
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: any) => {

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