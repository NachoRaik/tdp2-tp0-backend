const express = require('express');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const communes = []

const POINT_REGEX = /POINT ()(?::(.+))?>/;

const pointToXAndY = point => {
  let point_vals = point.split(' ');
  let x = point_vals[1].replace('(', '');
  let y = point_vals[2].replace(')', '');
  return [x, y];
}

fs.createReadStream('resources/operativo-detectar.csv')
  .pipe(csv({
    mapHeaders: ({ header, index }) => {
      if (header === 'observacio') { header = 'observaciones'; }
      return header;
    }
  }))
  .on('data', (data) => {
    let [x, y] = pointToXAndY(data.WKT);
    data['x'] = x;
    data['y'] = y;
    delete data['WKT'];
    return results.push(data);
  })
  .on('end', () => {
    console.log(results);
  });

// const exampleOperatives = [
//   {
//     id: 1,
//     lugar: "CISI: Centro de investigaciones de sistemas inteligentes",
//     direccion: "Padre Carlos Mugica 2474",
//     calle: "",
//     calle2: "",
//     altura: 0,
//     comuna: "Comuna 2",
//     observaciones: ""
//   }
// ];

module.exports = function operativesRouter() {
  return express.Router().use(
    '/operatives',
    express.Router()
      .get('/', async (req, res, next) => {
        let resp_results = results;
        if (req.query.comuna) {
          resp_results = results.filter(x => x.comuna === req.query.comuna);
        }
        return res.status(200).json(resp_results);
      })
  );
};