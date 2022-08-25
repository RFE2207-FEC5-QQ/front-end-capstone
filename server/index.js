require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Only required in production
// TODO: Figure out how to prevent this from running in development mode rather than just commenting out
app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(process.env.SV_PORT);
console.log(`Listening on port ${process.env.SV_PORT}`);