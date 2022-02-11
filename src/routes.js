import { Router } from 'express'
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from './app/controllers/FileController'
import auth from "./app/middleware/auth";
import multerConfig from "./config/multer";
import multer from 'multer'
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from './app/controllers/NotificationController';
import Appointment from "./app/models/Appointment";
import AvailableController from "./app/controllers/AvailableController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store)
routes.put('/users', auth, UserController.update)
routes.post('/sessions', SessionController.store)
routes.post('/appointments', auth, AppointmentController.store)
routes.get('/appointments', auth, AppointmentController.index)
routes.delete('/appointments/:id', auth, AppointmentController.delete)
routes.get('/schedule', auth, ScheduleController.index)
routes.put('/notifications/:id', auth, NotificationController.update)
routes.get('/notifications/:id', auth, NotificationController.update)
routes.get('/notifications', auth, NotificationController.index)
routes.get('/providers', auth, ProviderController.index)
routes.get('/providers/:providerId/available', AvailableController.index)
routes.post('/files', auth, upload.single('file'), FileController.store)

export default routes;

