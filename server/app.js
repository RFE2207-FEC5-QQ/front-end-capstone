const express = require('express');
const app = express();
const path = require('path');
const routers = require('./routes');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
for (let router of Object.values(routers)) {
  app.use(router);
}

module.exports = app;
