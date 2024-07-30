import express from 'express';
import warehouseRouter from '../router/warehouses.js';
import driverRouter from '../router/drivers.js';

const routes = express();

routes.use("/warehouses", warehouseRouter);
routes.use("/drivers", driverRouter);

export default routes;
