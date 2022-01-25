import { Router } from 'express'
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from './app/controllers/FileController'
import auth from "./app/middleware/auth";
import multerConfig from "./config/multer";
import multer from 'multer'
import ProviderController from "./app/controllers/ProviderController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store)
routes.put('/users', auth, UserController.update)
routes.post('/sessions', SessionController.store)
routes.get('/providers', ProviderController.index)
routes.post('/files', auth, upload.single('file'), FileController.store)

export default routes;

