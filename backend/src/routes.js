import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import RequestBudgetController from './app/controllers/RequestBudgetController';
import ResponseBudgetController from './app/controllers/ResponseBudgetController';
import NotificationController from './app/controllers/NotificationController';
import SegmentController from './app/controllers/SegmentController';
import RequestBudgetFilterController from './app/controllers/RequestBudgetFilterController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/budgetfilter', RequestBudgetFilterController.index);

routes.get('/ordersreq', RequestBudgetController.index);
routes.post('/ordersreq', RequestBudgetController.store);
routes.put('/ordersreq', RequestBudgetController.update);
routes.delete('/ordersreq/:id/:newStatus', RequestBudgetController.delete);

routes.get('/ordersres', ResponseBudgetController.index);
routes.post('/ordersres', ResponseBudgetController.store);
routes.put('/ordersres', ResponseBudgetController.update);
routes.delete('/ordersres/:id/:newStatus', ResponseBudgetController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/segments', SegmentController.index);
routes.post('/segments', SegmentController.store);
routes.put('/segments', SegmentController.update);
routes.delete('/segments/:id', SegmentController.delete);

export default routes;
