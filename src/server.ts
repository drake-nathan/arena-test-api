import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();

// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
app.get('/', (req, res) => res.send('Matto API up and running.'));
app.use('/route', router);

const port = parseInt(process.env.PORT);
const server = http.createServer(app);
server.listen(port, () => console.info('Server listening on:'));

export default server;
