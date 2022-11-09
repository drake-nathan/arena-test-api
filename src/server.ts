import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();
const port = parseInt(process.env.PORT);

if (!port) throw new Error('Port not defined, please define a port in .env file.');

const app = express();

// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
app.get('/', (req, res) => res.send('Matto API up and running.'));
app.use('/route', router);

const server = http.createServer(app);

server.listen(port, () => console.info('Server listening on port:', port));

export default server;
