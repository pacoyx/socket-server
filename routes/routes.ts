
import { Router, Request, Response } from "express";
import { EncuestaData } from "../clases/encuesta";
import { GraficaData } from "../clases/grafica";
import Server from "../clases/server";
import { usuariosConectados, mapa} from "../sockets/socket";


const router = Router();

const grafica = new GraficaData();
const clsEncuesta = new EncuestaData();



router.get('/mapa', (req: Request, res: Response) => {
    res.json(mapa.getMarcadores());
});

router.get('/grafica', (req: Request, res: Response) => {
    res.json(grafica.getDataGrafica());
});

router.get('/encuesta', (req: Request, res: Response) => {
    res.json(clsEncuesta.getDataGrafica());
});


router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true, mensaje: 'todo esta bien'
    });
});


router.post('/grafica', (req: Request, res: Response) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);


    grafica.incrementarValor(mes, unidades);

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(grafica.getDataGrafica());
});


router.post('/grafica-encuesta', (req: Request, res: Response) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);


    clsEncuesta.incrementarValor(mes, unidades);

    const server = Server.instance;
    server.io.emit('cambio-grafica-encuesta', clsEncuesta.getDataGrafica());

    res.json(clsEncuesta.getDataGrafica());
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de, cuerpo
    }
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de, cuerpo
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload)
    console.log('llego aqui');

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// servicio para obtener los ID'S

router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;
    server.io.allSockets().then((clientes) => {
        res.json({
            ok: true,
            clientes: Array.from(clientes)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        })
    });
})

router.get('/usuarios/detalle', (req: Request, res: Response) => {




    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
})



export default router;
