const express = require('express');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

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
    delete data['WKT']
    delete data['id']
    delete data['lugar']
    delete data['direccion']
    delete data['calle']
    delete data['calle2']
    delete data['observacio']
    delete data['observaciones']
    delete data['x']
    delete data['y']
    delete data['altura']

    return results.push(data)
  })
  .on('end', () => {
    console.log(results);
  });

module.exports = function communesRouter() {
  return express.Router().use(
    '/communes',
    express.Router()
      .get('/', async (req, res, next) => {
        res_results = results.filter((v,i,a)=>a.findIndex(t=>(t.comuna === v.comuna))===i)
        return res.status(200).json(res_results);
      })
  );
};