import express from 'express'
import routes from './routes'
import './database'
import path from "path";

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        //configurando o express para salvar arquivos estaticos
        //basta apontar a rota files para a pasta de uploads
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server
