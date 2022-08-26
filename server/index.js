const express = require('express');
const app = express();
const path = require('path');
const routers = require('./routes');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
for (let router of Object.values(routers)) {
  app.use(router);
}

app.listen(process.env.SV_PORT);
console.log(`Listening on port ${process.env.SV_PORT}`);
