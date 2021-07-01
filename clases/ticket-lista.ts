import { Ticket } from "./ticket";

export class TicketLista {

    private lista: Ticket[] = [];

    constructor() {

    }


    public agregar() {
        let ticket = new Ticket(this.lista.length + 1);
        this.lista.push(ticket);
        return ticket;
    }

    public getLista() {
        return this.lista;
    }

    public getListaAtendidos() {
        return this.lista.filter(lista => lista.escritorio != 0).sort((a, b) => (a.numero < b.numero) ? 1 : -1).splice(0,3);
    }


    public setEscritorio(numEscritorio: number) {

        let listaNueva = this.lista.filter(lista => lista.escritorio === 0);
        let listaOrdenada = listaNueva.sort((a, b) => (a.numero > b.numero) ? 1 : -1);
        listaOrdenada[0].escritorio = numEscritorio;
        console.log('lista original::', this.lista);

        return listaOrdenada[0];
    }

}