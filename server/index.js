const app = require('./app.js');

app.listen(process.env.SV_PORT);
console.log(`Listening on port ${process.env.SV_PORT}`);
