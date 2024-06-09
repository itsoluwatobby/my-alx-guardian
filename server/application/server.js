/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
// const path = require('path');
const cors = require('cors');
const { connectDB } = require('./config/connections/mongo');
const config = require('./config');
const { appRoutes } = require('./routes/appRoutes');
const correlationIdMiddleware = require('./middleware/correlation-id-middleware');
const apiAccessAuthMiddleware = require('./middleware/api-access.auth');

connectDB();
const app = express();
const server = http.createServer(app);
// const buildPath = path.join(__dirname, '../../client/dist');
app.use(express.static('public'));

// app.get('/*', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '../../client/dist/index.html'),
//     (err) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//     },
//   );
// });

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(correlationIdMiddleware);
app.use(apiAccessAuthMiddleware);

app.get('/health-check', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'My ALX Guardian Service is Up v1.0',
  });
});

// handles all routes
appRoutes(app);

app.use('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Not found' });
});

mongoose.connection.once('open', () => {
  console.log('Mongo connected...');
  server.listen(config.PORT, () => {
    console.log(`server is running on port ${config.PORT} ....`);
  });
});

mongoose.connection.on('error', (error) => {
  console.log('Mongo connection error: ', error.message);
});
