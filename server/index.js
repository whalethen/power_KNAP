const express = require('express');
const socket = require('socket.io-client')('http://localhost');
const app = express();
const port = 8080;


app.use(express.static(__dirname + './../client/dist'));

const server = app.listen(port, () => console.log(`listening on port ${port}`));

socket.on('connect', (socket) => console.log('made connnection to the socket'));

socket.on('event', (data) => console.log('data'));

socket.on('disconnect', () => console.log('socket disconneted'));
>>>>>>> Establish socket connection, without testing because no index.html found
