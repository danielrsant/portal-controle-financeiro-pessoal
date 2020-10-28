const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static('dist/agenda10'));

app.listen(port, () => console.log('Painel ON'));
