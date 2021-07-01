export class Ticket {

    public numero: number;
    public fecha: string;
    public escritorio: number;

    constructor(num: number) {
        this.numero = num;
        this.fecha = new Date().toISOString();
        this.escritorio = 0;
    }



}