const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const monitoringRouter = require('./routes/monitoringRouter');

module.exports = function app() {
  const app = express();
  app.use(cors());

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(monitoringRouter());

  return app;
};