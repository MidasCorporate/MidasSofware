import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import StockController from './app/controllers/StockController';
import NotificationController from './app/controllers/NotificationController';
import ProductFilterController from './app/controllers/ProductFilterController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/products', ProductController.index);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders', OrderController.update);
routes.delete('/orders/:id/:newStatus', OrderController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.get('/product', ProductFilterController.index);

routes.get('/stock', StockController.index);
routes.post('/stock', StockController.store);
routes.put('/stock', StockController.update);
routes.delete('/stock/:id', StockController.delete);

export default routes;
