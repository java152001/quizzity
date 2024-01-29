const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const knexConfig = require('./quizzityDB/knexfile');

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('App is listening on http://localhost:' + port);
});

