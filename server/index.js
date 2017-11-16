const http = require('http');
const express = require('express');

const app = express();
const port = 8080;

const server = http.createServer(app);

const io = require('socket.io').listen(server);

server.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}./../client`));

io.on('connection', (socket) => {
  console.log('connected to socket');
  // socket.on('chat', (data) => {
  //   console.log('incoming msg', data);
  // });
});

