import express from 'express';
import routes from './routes/routes.js';

const server = express();
server.use(express.json());
server.use("/", routes);

server.listen(3000, () => {
    console.log(`Server connected at http://localhost:3000`);
})