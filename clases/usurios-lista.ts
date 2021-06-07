import { Usuario } from "./Usuario";

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {

    }


    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;

    }

    public actualizarNombre(id: string, nombre: string) {

        for (let index = 0; index < this.lista.length; index++) {
            const usuario = this.lista[index];
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
            break;
        }


        // for (let usuario in this.lista) {
        //     if (usuario.id === id) {
        //         usuario.nombre = nombre;
        //         break;
        //     }
        // }

        console.log('===Actualizando usuario ====');
        console.log(this.lista);
    }

    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => {
            return usuario.id === id
        })
    }

    //obtener usuarios en una sala particular

    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    //Borrar usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id);

        return tempUsuario;
    }
}