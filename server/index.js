const express = require('express');
const app = express();
const port = 8080;


app.use(express.static(__dirname + './../client'));

const server = app.listen(port, () => console.log(`listening on port ${port}`));
