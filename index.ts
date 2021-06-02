import bodyParser from "body-parser";
import Server from "./clases/server";
import router from "./routes/routes";
import cors from "cors";



const server = new Server();

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use(cors({ origin: true, credentials: true }))


server.app.use('/', router);


server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
