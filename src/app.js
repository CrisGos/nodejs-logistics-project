import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error.handler.js';
import routerWarehouses from './routes/warehouses.js';
import routerShipments from './routes/shipments.js';
import routerDrivers from './routes/drivers.js';
// import routerVehicles from './routes/vehicles.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use('/warehouses', routerWarehouses);
app.use('/shipments', routerShipments);
app.use('/drivers', routerDrivers);
// app.use('/vehicles', routerVehicles);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running in port: ${PORT} - http://localhost:${PORT}`);
});