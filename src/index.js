const express = require('express');
const routes = require('./routes');

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.get('/', (request, response) => response.send('Welcome'));

app.listen(port, () => console.log(`Listening on port ${port}`));
