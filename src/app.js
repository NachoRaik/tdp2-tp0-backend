const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const monitoringRouter = require('./routes/monitoringRouter');
const operativesRouter = require('./routes/operativesRouter');

module.exports = function app() {
  const app = express();
  app.use(cors());

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(monitoringRouter());
  app.use(operativesRouter());

  return app;
};