import express from 'express';
import warehouseRouter from '../router/warehouses.js';
import driverRouter from '../router/drivers.js';
import vehicleRouter from '../router/vehicles.js';
import shipmentRouter from '../router/shipments.js';

const routes = express();

routes.use("/warehouses", warehouseRouter);
routes.use("/drivers", driverRouter);
routes.use("/vehicles", vehicleRouter);
routes.use("/shipments", shipmentRouter);
export default routes;
