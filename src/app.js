import express from 'express';
import dotenv from 'dotenv';
import { routes } from './routes/router.js'
import errorHandler from './middlewares/error.handler.js';

const app = express();

// middleware to handle json format
app.use(express.json())
// dotenv.config();
const PORT = process.env.PORT || 3010;

app.use('/', routes)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running in port: ${PORT} - http://localhost:${PORT}`);
});