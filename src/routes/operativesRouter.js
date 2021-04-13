const express = require('express');

const exampleOperatives = [
  {
    id: 1,
    lugar: "CISI: Centro de investigaciones de sistemas inteligentes",
    direccion: "Padre Carlos Mugica 2474",
    calle: "",
    calle2: "",
    altura: 0,
    comuna: "Comuna 2",
    observaciones: ""
  }
];

module.exports = function operativesRouter() {
  return express.Router().use(
    '/operatives',
    express.Router()
      .get('/', async (req, res, next) => res.status(200).json(exampleOperatives))
  );
};
