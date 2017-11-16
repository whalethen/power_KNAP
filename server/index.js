const http = require('http');
const express = require('express');
const fetch = require('./fetchYouTubeVideo');

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}./../client`));

io.on('connection', (socket) => {
  console.log(`connected to client`);

  // listen for incoming youtube searches
  socket.on('youtubeSearch', (query) => {
    fetch.youtubeVideos(query)
      .then(videos => io.emit('searchResults', videos))
      .catch(err => io.emit('error', err));

  });
});
