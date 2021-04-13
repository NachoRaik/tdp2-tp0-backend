const express = require('express');

const port = process.env.PORT;

module.exports = function monitoringRouter() {
  return express.Router()
    .get('/', (req, res) => res.status(200).send('Hola! Le estas pegando al puerto ' + port + ', donde vive el servidor de operativos!'))
    .get('/ping', (req, res) => res.status(200).send('PING!'))
};
