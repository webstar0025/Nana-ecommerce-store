const express = require('express');
const http = require('http');

const app = express();

require('dotenv').config();

require('app-module-path').addPath(__dirname);
global.__basedir = __dirname;
 
const router = require('api/routers/router.js');

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

const middleware = require('./api/middleware');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('resources'));
app.use(middleware.common);

app.use('/api', router);

const server = http.createServer(app);

server.listen(process.env.PORT, () =>
  console.log('App listening at http://localhost:%s', process.env.PORT));
